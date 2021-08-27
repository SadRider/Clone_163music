<template>
  <div class="comment-wrapper">
      <div class="comment-top">
          <textarea class="text-area" v-model="content"></textarea>
          <div @click="pushCommend"><Button :text="'提交'"/></div>
      </div>
      <template v-if="isEmpty">
          <div>
              <p>暂无评论~~~</p>
          </div>
      </template>
      <template v-else>
          <div class="comment-mid-wrapper">
                <div class="title">精彩评论({{hotTotal}})</div>
                <div class="comment-container" v-for="item in hotcommends" :key="item.commentId">
                    <div class="icon-img">
                        <img v-lazy="item.user_avatar" class="avatar">
                    </div>
                    <div class="comment-content">
                        <div class="nameandlike">
                            <span class="user-name">{{item.user_name}}</span>
                            <span class="like-count">点赞数：{{item.likecount}}</span>
                        </div>
                        {{item.content}}
                        <br><span class="time">{{item.time | formatTime}}</span>
                    </div>
                </div>

                <div class="title">更多评论({{total}})</div>
                <div class="comment-container" v-for="item in allcommends" :key="item.commentId">
                    <div class="icon-img">
                        <img v-lazy="item.user_avatar" class="avatar">
                    </div>
                    <div class="comment-content">
                        <div class="nameandlike">
                            <span class="user-name">{{item.user_name}}</span>
                            <span class="like-count">点赞数：{{item.likecount}}</span>
                        </div>
                        {{item.content}}
                        <br><span class="time">{{item.time | formatTime}}</span>
                    </div>
                </div>
                <div class="block">
                    <el-pagination
                        layout="prev, pager, next"
                        :current-page.sync="offset"
                        :page-count="getPageCount"
                        @current-change="onPageChange">
                    </el-pagination>
                </div>
          </div>
      </template>
  </div>
</template>

<script>
import {getHotCommends,getSongCommends} from '../../api/getSongs'
import {pushCommends} from '../../api/getSongs'
import {mapGetters} from 'vuex'
import Button from './button.vue'
export default {
    name:'Comment',
    components:{
        Button
    },
    data() {
        return {
            isEmpty:false,
            content:'',
            hotcommends:[],
            allcommends:[],
            limit:20,//评论请求条数
            offset:1,//偏移量，用于分页
            total:0,
            hotTotal:0,
            commentType:[{
                type:0,
                name:'music'
            },
            {
                type:1,
                name:'mv'
            }]
        }
    },
    //过滤器
    filters:{
        formatTime(value){
            var time = new Date(value)
            var y = time.getFullYear()
            var m = time.getMonth()+1
            var d = time.getDate()
            var h = time.getHours()
            var mm = time.getMinutes()
            return y+'年'+m+'月'+d+'日'+''+h+'时'+mm+'分'
        }
    },
    props:{
        id:Number,
        type:Number
    },
    methods: {
        pushCommend(){
            let cookie = this.getCookie
            if(cookie!==''&&cookie!==null){
                pushCommends(cookie,0,this.id,this.content).then((res)=>{
                    if(res.code ==200){
                         alert("评论成功")
                        this.getHotCommends(this.id)
                        this.getSongCommends(this.id)
                    }else{
                        alert("评论失败")
                    }
                })
            }else{
                alert("请先登录")
            }
            this.content=''
        },
        //请求热门评论
        getHotCommends(id){
            getHotCommends(id,this.type).then(res=>{
                console.log(res)
                const newData = res.hotComments.map(item=>({
                    content:item.content,
                    time:item.time,
                    likecount:item.likedCount,
                    user_avatar:item.user.avatarUrl,
                    user_name:item.user.nickname,
                    commentId:item.commentId
                }))
                this.hotTotal= res.total
                this.hotcommends = newData
            })
        },
        //请求评论
        async getSongCommends(id){
            await getSongCommends(this.commentType[this.type].name,id,this.limit,this.getOffset).then(res=>{
                console.log(res)
                const newData_2 = res.comments.map(item=>({
                    content:item.content,
                    time:item.time,
                    likecount:item.likedCount,
                    user_avatar:item.user.avatarUrl,
                    user_name:item.user.nickname,
                    commentId:item.commentId,
                }))
                this.total = res.total
                this.allcommends = newData_2
            })
        },
        //分页
        onPageChange(){
          this.getSongCommends(this.id)
        }
    },
    computed:{
      getOffset(){
        return (this.offset - 1)*this.limit
      },
      getPageCount(){
        return Math.ceil(this.total/this.limit)
      },
    ...mapGetters({
        getCookie:'login/getCookie'
    })
    },
    watch:{
        id(newValue){
            if(newValue){
                this.getHotCommends(this.id)
                this.getSongCommends(this.id)
            }
        }
    },
    mounted() {
        if(this.hotcommends===null&&this.allcommends===null){
            console.log('无评论')
        }
    },
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/preset/varibles.styl';
@import '~@/assets/preset/mixins.styl';

.comment-wrapper
    width 100%
    padding 1rem
    box-sizing border-box
    .comment-top
        width 100%
        .text-area
            width 100%
            height 10rem
.comment-mid-wrapper
    width 100%
    padding 1rem
    box-sizing border-box
    .title
        font-size 1.1rem
        font-weight bold
        margin 0.2rem 0
    .comment-container
        width 100%
        display flex
        border-bottom 0.2rem solid $mainColor
        .icon-img
            width 5rem
            height 5rem
            position relative
            .avatar
                width 4rem
                border-radius 50%
                position absolute
                top 50%
                left 50%
                transform translate(-50%,-50%)
        .comment-content
            width 85%
            padding 0.1rem
            white-space:normal;
            word-break:break-all;
            word-wrap:break-word; 
            .nameandlike
                position relative
                height 1.2rem
                .user-name
                    position absolute
                    left 0
                    font-size 1rem
                    color $bgColor
                    font-weight bold
                .like-count
                    position absolute
                    right 0
    .block
        margin 1rem 0
</style>
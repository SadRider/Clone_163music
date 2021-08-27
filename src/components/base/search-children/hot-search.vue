<template>
  <div class="hotsearch-wrapper">
      <div class="triangle-up"/>
      <div class="hotsearch-container" ref="container">
          <div class="content-wra">
            <div class="hotsearch-content" v-for="(item,index) in hotList" :key='index' @click="toResult(item.searchWord)">
                <div class="hotlistIndex"><span class="index" :class="{hot:index<3}">{{index+1}}</span></div>
                <div class="desc">
                    <span class="name">{{item.searchWord}}</span>
                    <span class="avatar-wra" v-if="item.iconUrl"><img class="avatar" v-lazy="item.iconUrl"></span>
                    <span class="playcount">{{item.score}}</span>
                </div>
                <div class="other">{{item.content}}</div>
            </div>
          </div>
      </div>
  </div>
</template>

<script>
import {hotSearch} from '../../../api/search'
import BScroll from '@better-scroll/core'
import MouseWheel from '@better-scroll/mouse-wheel'
import ScrollBar from '@better-scroll/scroll-bar'
export default {
    name:'HotSearch',
    data() {
        return {
            hotList:[]
        }
    },
    methods: {
        hotSearch(){
            hotSearch().then(res=>{
                this.hotList=res.data
            })
        },
        toResult(keyword){
            const re = new RegExp("^[ ]+$")//判断是否输入空格
            if(keyword!==undefined && keyword.length!==0 && keyword!==null&&!re.test(keyword)){
                this.$router.push({
                    name:'search',
                    params:{keyword}
                })
            }
        this.$emit('hidden')
        }
    },
    created() {
        this.hotSearch()
        this.$nextTick(()=>{
            BScroll.use(MouseWheel)
            BScroll.use(ScrollBar)
            this.scroll = new BScroll(this.$refs.container,{
                click:false,
                mouseWheel: true,
                disableMouse:true,
                scrollY: true,
                scrollbar: true
            })
        })
    },
    mounted() {
        setTimeout(() => {
            this.scroll.refresh()
        }, 1000);
    },
}
</script>
<style lang="stylus" scoped>
@import '~@/assets/preset/varibles.styl';
@import '~@/assets/preset/mixins.styl';

.hotsearch-wrapper
    position absolute
    width 20rem
    height 25rem
    z-index 99999
    .triangle-up//三角形
        position absolute
        width 0
        height 0
        border-left 0.5rem solid transparent
        border-right 0.5rem solid transparent
        border-bottom 1rem solid #fff
        top 0
        left 1rem
    .hotsearch-container
        position absolute
        top 1rem
        left 0
        width 100%
        height 24rem
        padding 0.5rem
        box-sizing border-box
        background-color #fff
        box-shadow 0.5rem 0.5rem 0.5rem black
        overflow hidden
        .content-wra
            width 100%
            .hotsearch-content
                width 100%
                height 2.5rem
                margin-bottom 0.1rem
                cursor pointer
                .hotlistIndex
                    width 2.5rem
                    height 2.5rem
                    position relative
                    float left
                    .index
                        position absolute
                        top 50%
                        left 50%
                        transform translate(-50%,-50%)
                    .hot
                        font-size 1.2rem
                        color red
                        font-weight bold
                .desc
                    margin-left 2.5rem
                    width 16.5rem
                    height 1.25rem
                    .name
                        font-weight bold
                        ellipsis()
                    .avatar-wra
                        height 90%
                        .avatar
                            height 90%
                    .playcount
                        margin-left 0.5rem
                        font-size 0.8rem
                        color $mainColor
                .other
                    margin-left 2.5rem
                    width 16.5rem
                    height 1.25rem
                    font-size 0.8rem
                    color $mainColor
                    ellipsis()
        .hotsearch-content:hover
            background-color $activeColor
</style>
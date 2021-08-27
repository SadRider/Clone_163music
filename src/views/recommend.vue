<template>
  <div class="recommend-wrapper">
    <div class="recommend-container">
      <div class="recommend-top-wrapper">
        <div class="recommend-bg bg-blur" :style="{'background':'url('+ highQualityList.coverImgUrl+')'}"></div>
        <div class="recommend-img-wra">
          <img v-lazy="highQualityList.coverImgUrl" class="img-coverImgUrl">
        </div>
        <div class="recommend-top-desc">
          <div class="desc-title">精品歌单</div>
          <div class="desc-name">{{highQualityList.name}}</div>
          <div class="desc-other">{{highQualityList.copywriter}}</div>
        </div>
      </div>
      <div class="recommend-tabs-wrapper">
        <div class="tabs-container">
          <p class="tabs-name"  v-for="item in tabs" :key="item.id" :class="{tabs_active:active===item.id}" @click="isCheck(item.id,item.name)">{{item.name}}</p>
        </div>
      </div>
      <div class="cardlist"><ListCard v-for="(item,index) in playList" :key="item.id+index" :item="item"/></div>
      <div class="block">
        <el-pagination
          layout="prev, pager, next"
          :current-page.sync="offset"
          :page-count="getPageCount"
          @current-change="onPageChange">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import {getHighQuality,getPlayList} from '../api/recommend'
import ListCard from '../components/base/list-card.vue'
export default {
  name:'Recommend',
  components:{
    ListCard
  },
  data() {
    return {
      tabs:[
        {
          id:0,
          name:'全部'
        },
        {
          id:1,
          name:'华语'
        },
        {
          id:2,
          name:'欧美'
        },
        {
          id:3,
          name:'流行'
        },
        {
          id:4,
          name:'ACG'
        },
      ],
      active:0,
      highQualityList:[],
      playList:[],
      limit:50,
      offset:1,
      tagName:'全部',//存标签名字
      total:0
    }
  },
  methods: {
    //获取精品歌单
    async getHighQuality(tag){
      await getHighQuality(tag,1).then(res=>{
        // console.log(res)
        let newData = {
          id:res.playlists[0].id,
          name:res.playlists[0].name,
          tag:res.playlists[0].tag,
          coverImgUrl:res.playlists[0].coverImgUrl,
          copywriter:res.playlists[0].copywriter
        }
        this.highQualityList = newData
      })
    },

    getPlayList(tag,limit,offset){
      getPlayList(tag,limit,offset).then(res=>{
        console.log("res",res)
        this.playList=res.playlists
        console.log(res.total)
        this.total = res.total
      })
    },
    isCheck(id,name){
      this.active = id
      this.tagName = name
      this.offset = 1
      this.getHighQuality(name)
      this.getPlayList(name,this.limit,this.getOffset)
    },
    onPageChange(){
      this.getPlayList(this.tagName,this.limit,this.getOffset)
    },
  },
  computed:{
    getOffset(){
      return (this.offset-1)*this.limit
    },
    getPageCount(){
      return Math.ceil(this.total/this.limit)
    }
  },
  created() {
    this.getHighQuality(this.tagName)
    this.getPlayList(this.tagName,this.limit,this.getOffset)
  },
  mounted() {

  },
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/preset/varibles.styl';
@import '~@/assets/preset/mixins.styl';

.recommend-wrapper
  width 100%
  padding 1rem
  box-sizing border-box
  .recommend-container
    width 100%
    .recommend-top-wrapper
      width 100%
      height 15rem
      padding 0.5rem
      box-sizing border-box
      display flex
      position relative
      .recommend-img-wra
        width 13.6rem
        height 13.6rem
        border-radius 2.5rem
        border 0.2rem solid $mainColor
        z-index 2
        .img-coverImgUrl
          width 13.6rem
          height 13.6rem
          border-radius 2.5rem
      .recommend-top-desc
        z-index 2
        flex-grow 1
        margin-left 1rem
        .desc-title
          margin 1rem
          width 6rem
          height 2rem
          line-height 2rem
          text-align center
          font-size 1rem
          color orange
          border 0.15rem solid orange
          border-radius 2rem
        .desc-name
          font-size 1.2rem
          margin 1rem
          color #fff
        .desc-other
          font-size 1rem
          margin 1rem
          color $mainColor
      .recommend-bg
        width 72rem
        height 14rem
        z-index 1
        position absolute
      .bg-blur
        float left
        background-repeat no-repeat
        background-position center
        background-size cover
        -webkit-filter blur(1.5rem)
        -moz-filter blur(1.5rem)
        -o-filter blur(1.5rem)
        -ms-filter blur(1.5rem)
        filter blur(1.5rem)
    .recommend-tabs-wrapper
      width 100%
      height 2rem
      .tabs-container
        width 100%
        height 100%
        line-height 2rem
        display flex
        .tabs-name
          margin 0 1rem
          cursor pointer
        .tabs_active
          color $bgColor
    .recommend-list-wrapper
      width 100%
      height 100%
      .recommend-list-content
        width 20%
        height 0
        padding-bottom 20%
        position relative
        .img-wrapper
          position absolute
          top 0
          left 0
          right 0
          bottom 2rem
          .img-avatarImgUrl
            display block
            height 100%
            margin 0 auto
        .img-desc
          position absolute
          left 0
          right 0
          bottom 0
          height 2rem
    .cardlist
      height auto
      width 100%
      overflow hidden
</style>
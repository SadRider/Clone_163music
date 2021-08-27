<template>
  <!-- 歌曲详情页 -->
  <div class="song-detail">
    <div class="detail-container">
      <div class="close" @click="close"><span class="iconfont icon-open open"></span></div>
      <div class="title"><h2>{{currentSong.name}}</h2></div>
      <div class="detail-top">
        <div class="bg"></div>
        <div class="songImg-wrapper">
          <div class="play-bar-support-wrapper">
            <img src="../../../assets/player/play-bar-support.png" class="play-bar-support">
            </div>
          <div class="play-bar-wrapper" :class="{bar_pause:!playing}">
            <img src="../../../assets/player/play-bar.png" class="play-bar">
            </div>
          <div class="songImg-container">
            <img v-lazy="currentSong.picUrl" class="songImg-img" :class="{pause:!playing}" />
          </div>
        </div>
        <div class="lyric-wrapper" ref="content">
          <div v-if="lyric==null" class="nolyric">暂无歌词</div>
          <div v-else>
            <div class="lyric-li" v-for="(item,index) in lyricArr" :key="index" :class="[index===lyricIndex?'sign':'']">{{item[1]}}</div>
          </div>
        </div>
      </div>
      <div class="detail-mid">
        <Comment :id="currentSong.id" :type="0"/>
      </div>
    </div>
  </div>
</template>

<script>
import Bscroll from "@better-scroll/core"
import Comment from "../../base/comment.vue"
import { parseLyric } from '../../../untils/getlyric'
export default {
    name:'SongDetail',
    components:{
      Comment
    },
    props:{
      currentSong:Object,
      playing:Boolean,
      lyric:String,
      currentTime:Number,
      detail:Boolean
    },
    data() {
      return {
        lyricArr:[],
        lyricIndex:-1,
        scrollNum:9,
        hotcommends:[],
        allcommends:[],
      }
    },
    methods: {
      close(){
        this.$emit("close")
      }
    },
    created() {

    },
    watch:{
      currentSong:{
        immidiate:true,
        handler(currentSong){
          if(currentSong.id){
            console.log(currentSong.id)
          }
        }

      },
      detail(detail){
        if(detail===true){
          this.scroll = new Bscroll(this.$refs.content)
        }
      },
      lyric(){
        this.lyricArr=parseLyric(this.lyric)
        if(this.detail){
        this.scroll.scrollTo(0,0,true)
        }
      this.$nextTick(()=>{
        if(this.detail){
        this.scroll.refresh()
        this.scroll.scrollTo(0,0)
        }
      })
      },
      //监听音频时间，突出正在演唱的歌词
      //对歌词数组遍历
      currentTime(currentTime){
        for(let i=0;i<this.lyricArr.length;i++){
          //记录当前一行和下一行歌词
          const line = this.lyricArr[i]
          const nextLine= this.lyricArr[i+1]
          // 如果当前时间大于等于当前歌词的时间且下一行歌词不存在或当前时间小于下一行时间
          if(currentTime>=line[0] && (!nextLine || currentTime<nextLine[0])){
            this.lyricIndex = i
            if(this.lyricIndex<this.scrollNum || this.lyricIndex > this.lyricArr.length-this.scrollNum){
              return
            }else{
              this.scroll.scrollTo(0,-24*(this.lyricIndex-this.scrollNum),2,false)
            }
          }
        }
      }
    }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/preset/varibles.styl';
@import '~@/assets/preset/mixins.styl';

@keyframes rotate
    0%{
        transform :rotate(0)
    }
    100%{
        transform :rotate(360deg)
    }
.song-detail
  width 100%
  height 58.4rem
  background-color #fff
  position absolute
  bottom 5rem
  padding 5% 20% 0 20%
  box-sizing border-box
  z-index 11
  overflow-y auto
  .detail-container
    width 100%
    height 100%
    .close
      width 3rem
      height 3rem
      background-color $mainColor
      float right 
      border-radius 0.35rem
      opacity 0.8
      position relative
      .open
        font-size 2rem
        color #fff
        position absolute
        top 50%
        left 50%
        transform translate(-50%,-50%)
    .detail-top
      width 100%
      height 60%
      display flex
      position relative
      .bg
        position absolute
        width 100%
        height 100%
        background-color $mainColor
        border-radius 50%
        opacity 0.7
        filter blur(1rem)
        z-index 0
      .songImg-wrapper
        width 50%
        height 100%
        flex 1
        position relative
        z-index 1
        .play-bar-support-wrapper
          position absolute
          top 10%
          left 50%
          transform translate(-50%,-50%)
          width 2rem
          height 2rem
          z-index 3
          .play-bar-support
            width 100%
        .play-bar-wrapper
          position absolute
          top 10%
          left 48%
          transform-origin 0 0
          transition all 0.3s
          transform rotate(-3deg)
          width 6rem
          height 9rem
          z-index 2
          .play-bar
            width 100%
        .bar_pause
          transform rotate(-40deg)
        .songImg-container
          width 15rem
          height 15rem
          border 1rem solid $activeColor
          border-radius 50%
          position absolute
          top 50%
          left 50%
          transform translate(-50%,-50%)
          z-index 1
          .songImg-img
            width 100%
            border-radius 50%
            border 2rem solid black
            box-sizing border-box
            animation rotate 10s linear infinite
          .pause
              animation rotate 10s linear infinite
              animation-play-state paused
      .lyric-wrapper
        width 50%
        height 31.5rem
        flex 1
        overflow hidden
        position relative
        z-index 1
        .nolyric
          position absolute
          top 50%
          left 50%
        .lyric-li
          margin 0.1rem 0
          font-size 1rem
          text-align center
        .sign
          color $bgColor
          font-size 1.1rem
          transition all 0.3s
    .title
      width 100%
      height 3rem
      line-height 3rem
      text-align center
      font-size 1.8rem
</style>
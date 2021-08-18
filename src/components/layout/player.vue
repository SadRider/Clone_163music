<template>
  <div class="palyer-container">
      <div class="player-music-info-wrapper" :class="{turnOn:playing,turnDown:!playing}">
          <!-- 专辑图片 -->
          <div class="img-wrapper">
              <img v-lazy="currentSong.picUrl" class="img-content" :class="{pause:!playing}">
              <span class="iconfont open">&#xe618;</span>
          </div>
      </div>
      <!-- 控制按钮 -->
      <div class="player-wrapper">
        <div class="block">
            <el-slider v-model="currentTime" :max="duration" :show-tooltip="false" @change="changeSongTime($event)" @mousedown.native="isChange = true" @mouseup.native="isChange = false"></el-slider>
        </div>
        <!-- 歌曲信息 -->
          <div class="text">
              <div class="nameandtime">
                <p class="name">{{currentSong.name}}</p>
                <p class="time" v-show="currentSongIndex!==-1">{{currentTime|formatTime}}/{{duration|formatTime}}</p>
              </div>
              <p class="desc">{{currentSong.artist}}</p>
          </div>
          <div class="control">
              <div class="playMode">
              <span class="iconfont control-btn" :class="playModeIcon" @click="changePlayModeAction"></span>
              </div>
              <span class="iconfont control-btn icon-previous" @click="prevAction"></span>
              <div @click="changePlayingAction">
                <span class="iconfont control-btn icon-play" v-show="!playing"></span>
                <span class="iconfont control-btn icon-stop" v-show="playing"></span>
              </div>
              <span class="iconfont control-btn icon-next" @click="nextAction"></span>
              <div>
                <!-- <span class="iconfont control-btn icon-geciweidianji"></span> -->
              </div>

          </div>
          <div class="other-control">
              <span class="iconfont other-btn icon-songlist" @click="isShowList"></span>
              <span class="iconfont other-btn icon-shengyin"></span>
              <div class="voice">
                  <el-slider v-model="volume" :show-tooltip="true" class="voice_slider" @input="changeVolume($event)"></el-slider>
                </div>
          </div>
      </div>
      <audio v-lazy="` https://music.163.com/song/media/outer/url?id=${id}.mp3`" ref="audio" @timeupdate="timeUpdate" @ended="ended"></audio>
  </div>
</template>

<script>
import {mapGetters,mapState} from 'vuex'
export default {
    name:'Player',
    components:{

    },
    data() {
        return {
            //audio当前的时间
            currentTime:0,
            //audio的总时长
            duration:0,
            //是否拖动进度条
            isChange:false,
            //音量初始为50%
            volume:50,
            drawer:false
        }
    },
    //过滤器
    filters:{
        formatTime(value){
            //计算分钟
            let mins = Math.floor(value/60)
            let secend = Math.floor(value%60)
            if(mins<9){
                mins=("0"+mins)
            }
            if(secend<9){
                secend=("0"+secend)
            }
            return mins + ":" + secend
        }
    },
    computed:{
        //从仓库中获取仓库的计算属性转为组件的计算属性
        ...mapGetters({
            currentSong:'player/currentSong'
        }),
        ...mapState({
            playing:state=>state.player.playing,
            currentSongIndex:state=>state.player.currentIndex,
            mode:state=>state.player.mode,
            musicList:state=>state.player.musicList
        }),
        //获取歌曲id
        id(){
            return this.currentSong.id
        },
        //设置播放模式图标
        playModeIcon(){
            switch(this.mode){
                case 0:
                    return 'icon-shunxubofang'
                case 1:
                    return 'icon-xunhuanbofang'
                case 2:
                    return 'icon-suijibofang'
            }
            return ''
        }
    },
    methods: {
        changePlayingAction(){
            //改变播放状态
            const isplay = this.playing
            if(this.id!==undefined){
                this.$store.commit({
                    type:'player/setPlaying',
                    value:!isplay
                })            
            }
        },
        // //修改进度条
        changeSongTime(value){
            this.audio.currentTime = value
            this.isChange = false
        },
        //播放过程中时间的更新事件
        timeUpdate(){
            //当进度条没有拖动时，持续更新时间
            if(!this.isChange){
                this.currentTime = this.audio.currentTime
            }
        },
        //修改音量
        changeVolume(value){
            this.audio.volume = value/100
        },
        //监听音频结束
        ended(){
            this.changePlayingAction()
            //顺序播放下一首歌
            //单曲循环重放这首歌
            //随机播放下一首歌
            //如果是顺序播放：播放列表是原始的歌曲列表
            console.log(this.mode)
            if(this.mode === 0){
            this.$store.commit({
                type:'player/PlayNext'
            })
            }
            //如果是单曲循环：播放列表是原始的歌曲列表
            else if(this.mode === 1){
                this.changePlayingAction()
                this.audio.load()
                setTimeout(() => {
                    this.audio.play()
                }, 200);
            }
            //如果是随机播放：播放列表是打乱的歌曲列表
            else if(this.mode === 2){
            this.$store.commit({
                type:'player/PlayNext'
            })
            }
        },
        prevAction(){
            //顺序播放：播放顺序列表上一首歌
            //单曲循环：播放顺序列表上一首歌
            //随机播放：播放随机列表上一首歌
            this.$store.commit({
                type:'player/PrevNext'
            })
        },
        nextAction(){
            //顺序播放：播放顺序列表下一首歌
            //单曲循环：播放顺序列表下一首歌
            //随机播放：播放随机列表下一首歌
            this.$store.commit({
                type:'player/PlayNext'
            })
        },
        //切换播放模式的事件
        changePlayModeAction(){
            this.$store.commit({
                type:'player/changePlayMode',
                value:this.id
            })
        },
        isShowList(){
            this.drawer = !this.drawer
            this.$emit("isShowList",this.drawer)
        }

    },
    created() {
    },
    mounted() {
        this.audio = this.$refs.audio
        this.audio.addEventListener('canplay',()=>{
            //audio可以播放时获得总时长
            this.duration = this.audio.duration
        })
    },
    watch:{
        //监听播放状态，操作audio标签
        playing(newVal){
            //等待dom渲染好后再操作
            this.$nextTick(()=>{
                if(newVal){
                    this.audio.play()
                }else{
                    this.audio.pause()
                }
            })
        },
        id(newValue,oldValue){
            //切换歌曲
            //有上一首歌才重新加载
            if(!oldValue){
                return
            }
            if(newValue){
                this.$nextTick(()=>{
                    this.audio.load()
                    this.audio.play()
                })
            }
        },
        //判断播放转为随机播放时，需要找到当前播放歌曲的新下标
        mode(newValue){
            if(newValue === 2){
                //2即为随机播放
                //根据当前歌曲的id找到下标
            }
        }

    }
}
</script>

<style lang="stylus" scoped>
@keyframes rotate
    0%{
        transform :rotate(0)
    }
    100%{
        transform :rotate(360deg)
    }
/deep/.el-slider__runway
    margin 0

/deep/.el-slider__runway
    background #ccc
.palyer-container
    position relative
    width 100%
    height 5rem
    .player-music-info-wrapper
        width 5rem
        height 5rem
        background-color #fff
        border-top 0.2rem solid rgba(0,163,216,1)
        border-left 0.2rem solid rgba(0,163,216,1)
        border-right 0.2rem solid rgba(0,163,216,1)
        border-top-left-radius 2em
        border-top-right-radius 2em
        transition all 0.3s
        position absolute
        bottom 0
        display flex
        padding 0.3rem
        margin 0 0 0 0.1rem
        box-sizing border-box
    .turnOn
        transform translateY(-100%)
    .turnDown
        transform translateY(0)
    .img-wrapper
        display block
        width 4rem
        height 4rem
        border-radius 2rem
        position relative
        .img-content
            width 100%
            border-radius 2rem
            animation rotate 10s linear infinite
        .pause
            animation rotate 10s linear infinite
            animation-play-state paused
        .open
            position absolute
            top 50%
            left 50%
            transform translate(-50%,-50%)
            font-size 2rem
            color #fff
            transition all 0.3s
            opacity 0
        &:hover
            .open
                opacity 1
    .player-wrapper
        width 100%
        height 5rem
        background-color #ededed
        // border-top 0.5rem solid rgba(0,163,216,1)
        position absolute
        bottom 0
        display flex
        .block
            position absolute
            top 0
            left 0
            width 100%
        .text
            flex 1
            display flex
            flex-direction column
            justify-content center
            margin-left 1rem
            .name
                font-size 1.2rem
            .desc
                font-size 0.8rem
        .control
            flex 1
            display flex
            height 5rem
            padding 1rem
            box-sizing border-box
            margin 0 auto
            .control-btn
                flex 1
                font-size 2rem
                text-align center
                color rgba(0,163,216,1)
        .other-control
            flex 1
            display flex
            height 5rem
            padding 1rem
            box-sizing border-box
            margin 0 auto
            .other-btn
                flex 1
                font-size 2rem
                text-align center
                color rgba(0,163,216,1)
            .voice
                flex 2
                position relative
                .voice_slider
                    width 80%
                    position absolute
                    top 50%
                    transform translateY(-50%)

</style>
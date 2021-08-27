<template>
<div>
    <div class="player-music-info-wrapper" :class="{turnOn:playing,turnDown:!playing}">
        <!-- 专辑图片 -->
        <div class="img-wrapper" @click="isShowDetail">
            <img v-lazy="currentSong.picUrl" class="img-content" :class="{pause:!playing}">
            <span class="iconfont icon-open open"></span>
        </div>
    </div>
  <div class="palyer-container">
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
              <span class="iconfont" :class="playModeIcon" @click="changePlayModeAction"></span>
              </div>
              <div class="prev"><span class="iconfont icon-previous" @click="prevAction"></span></div>
              <div @click="changePlayingAction" class="play">
                <span class="iconfont icon-play" v-show="!playing"></span>
                <span class="iconfont icon-stop" v-show="playing"></span>
              </div>
              <div class="next"><span class="iconfont icon-next" @click="nextAction"></span></div>
              
              <div>
                <!-- <span class="iconfont control-btn icon-geciweidianji"></span> -->
              </div>

          </div>
          <div class="other-control">
              <div class="songlist"><span class="iconfont other-btn icon-songlist" @click="isShowList"></span></div>
              <div class="voice-icon"><span class="iconfont other-btn icon-shengyin"></span></div>
              <div class="voice">
                  <el-slider v-model="volume" :show-tooltip="true" class="voice_slider" @input="changeVolume($event)"></el-slider>
                </div>
          </div>
      </div>
      <audio :src="` https://music.163.com/song/media/outer/url?id=${id}.mp3`" ref="audio" @timeupdate="timeUpdate" @ended="ended" @play="play"></audio>
  </div>
    <transition name="detail-list">
        <SongDetail 
        :detail="detail" 
        :currentSong="currentSong" 
        :playing="playing" 
        :lyric="lyric" 
        :currentTime="currentTime" 
        v-show="detail"
        @close="close"/>
    </transition>
    <transition name="m-list">
        <MusicList  v-show="drawer" />
    </transition>
</div>
</template>

<script>
import {mapGetters,mapState} from 'vuex'
import MusicList from './player-children/musicList.vue'
import SongDetail from './player-children/songdetail.vue'
import {getSongLyric} from '../../api/getSongs'
export default {
    name:'Player',
    components:{
        MusicList,
        SongDetail
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
            drawer:false,
            detail:false,
            //存放歌词
            lyric:'',
            //存放热评
            hotcommends:[],
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
        //请求歌词
        getSongLyric(id){
            getSongLyric(id).then(res=>{
                console.log("lyric",res)
                if(!res.nolyric){
                    this.lyric=res.lrc.lyric
                }else{
                    this.lyric=null
                }
            })
         },
        //音频开始
        play(){
            //请求当前歌曲的歌词
            this.getSongLyric(this.id)
            // this.getSongCommends(this.id)
        },
        //监听音频结束
        ended(){
            this.changePlayingAction()
            //顺序播放下一首歌
            //单曲循环重放这首歌
            //随机播放下一首歌
            //如果是顺序播放：播放列表是原始的歌曲列表
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
            if(this.id!==undefined){
                this.$store.commit({
                    type:'player/PrevNext'
                })              
            }

        },
        nextAction(){
            //顺序播放：播放顺序列表下一首歌
            //单曲循环：播放顺序列表下一首歌
            //随机播放：播放随机列表下一首歌
            if(this.id!==undefined){
                this.$store.commit({
                    type:'player/PlayNext'
                })
            }

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
        },
        isShowDetail(){
            this.detail = !this.detail
        },
        close(){
            this.detail = false
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
@import '~@/assets/preset/varibles.styl';
@import '~@/assets/preset/mixins.styl';

@keyframes rotate
    0%{
        transform :rotate(0)
    }
    100%{
        transform :rotate(360deg)
    }
/deep/.el-slider__runway
    margin 0
    background $mainColor
/deep/.el-slider__bar
    background $bgColor
/deep/.el-slider__button
    border 0.2rem solid $bgColor
.player-music-info-wrapper
    width 5rem
    height 5rem
    background-color #fff
    border-top 0.2rem solid $bgColor
    border-left 0.2rem solid $bgColor
    border-right 0.2rem solid $bgColor
    border-top-left-radius 2em
    border-top-right-radius 2em
    transition all 0.3s
    position absolute
    bottom 0
    display flex
    padding 0.3rem
    margin 0 0 0 0.1rem
    box-sizing border-box
    z-index 12
.turnOn
    transform translateY(-100%)
    opacity 1
.turnDown
    transform translateY(0)
    opacity 0
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
.palyer-container
    position relative
    width 100%
    height 5rem
    z-index 999
    .player-wrapper
        width 100%
        height 5rem
        background-color $activeColor
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
            // display flex
            height 5rem
            padding 1rem
            box-sizing border-box
            margin 0 auto
            position relative
            .playMode
                position absolute
                top 50%
                left 10%
                transform translateY(-50%)
            .prev
                position absolute
                top 50%
                left 35%
                transform translateY(-50%)
            .play
                position absolute
                top 50%
                left 50%
                transform translate(-50%,-50%)
                span
                    font-size 3rem
            .next
                position absolute
                top 50%
                right 35%
                transform translateY(-50%)
            span
                font-size 2rem
        .other-control
            flex 1
            display flex
            height 5rem
            padding 1rem
            box-sizing border-box
            margin 0 auto
            .songlist
                flex 1
                width 5rem
                text-align center
            .voice-icon
                flex 1
                width 5rem
                text-align center
            span
                font-size 2rem
            .voice
                flex 2
                position relative
                .voice_slider
                    width 80%
                    position absolute
                    top 50%
                    transform translateY(-50%)
.detail-list-enter-active
    transition all 0.3s ease
.detail-list-leave-active
    transition all 0.8s
.detail-list-enter, .detail-list-leave-to
    transform translateY(100%)
    opacity 0
.m-list-enter-active
    transition all 0.3s ease
.m-list-leave-active
    transition all 0.8s
.m-list-enter, .m-list-leave-to
    transform translateX(100%)
    opacity 0
.iconfont:active
    color $bgColor
</style>
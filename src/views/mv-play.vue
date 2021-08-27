<template>
  <!-- MV播放界面 -->
  <div class="video-wrapper">
      <div class="video-container">
          <div class="video-left">
              <div class="title"><p>MV详情</p></div>
              <div class="video-content"><video :src="url" controls autoplay class="video-play"></video></div>
              <div class="video-artists">
                  <img :src="video.cover" class="coverImg">
                  <p class="artists-name">{{video.artists}}</p>
                  </div>
              <div class="video-name">{{video.name}}</div>
              <div class="video-other-desc">
                  <p>发布：{{video.time}}</p>
                  <p>播放：{{video.playCount}}次</p>
              </div>
              <div class="video-comment">
                  <Comment :id="video.id" :type="1"/>
              </div>
          </div>
          <div class="video-right">
              <div class="mv-list-wrapper">
                  <MVCard  v-for="mv in simiMV" :key="mv.id" :mv="mv" class="MVCard"/>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import {getMV,getMVUrl,getSimiMv} from '../api/newMV'
import Comment from '../components/base/comment.vue'
import MVCard from '../components/base/mv-card.vue'
export default {
    name:'VideoPlay',
    components:{
        Comment,
        MVCard
    },
    data() {
        return {
            id:0,
            video:[],
            url:'',
            simiMV:[]
        }
    },
    methods: {
        getMVInfo(id){
            getMV(id).then(res_1=>{
                // console.log(res_1)
                const newData ={
                    id:res_1.data.id,
                    name:res_1.data.name,
                    cover:res_1.data.cover,
                    artists:res_1.data.artists.map(item=>item.name).join('/'),
                    time:res_1.data.publishTime,
                    playCount:res_1.data.playCount
                }
                this.video = newData
            })
            getMVUrl(id).then(res_2=>{
                // console.log(res_2)
                this.url = res_2.data.url
            })
            getSimiMv(id).then(res_3=>{
                // console.log("getSimiMv",res_3)
                this.simiMV = res_3.mvs
            })
        }
    },
    created() {
        this.id = parseInt(this.$route.params.id)
        this.getMVInfo(this.id)
    },
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/preset/varibles.styl';
@import '~@/assets/preset/mixins.styl';

.video-wrapper
    width 100%
    padding 1rem
    box-sizing border-box
    .video-container
        width 100%
        display flex
        .video-left
            flex 2
            padding 0.5rem
            display flex
            flex-direction column
            .title
                font-size 1rem
            .video-content
                width 100%
                .video-play
                    width 100%
            .video-artists
                font-size 1rem
                width 100%
                height 4rem
                padding 0.5rem
                box-sizing border-box
                .coverImg
                    width 3rem
                    height 3rem
                    border-radius 50%
                    float left 
  
                .artists-name
                    float left
                    margin 0.75rem 0.1rem
            .video-name
                font-size 2rem
        .video-right
            flex 1
            background-color $activeColor
            padding 0.5rem
            .mv-list-wrapper
                display flex
                flex-direction column
                .MVCard
                    margin 0 auto
</style>
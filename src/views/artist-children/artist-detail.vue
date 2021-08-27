<template>
  <div class="a-desc-wrapper">
      <div class="a-desc-container">
          <div class="a-desc-top" v-if="detail.artist!=undefined">
              <div class="coverImg">
                  <img v-lazy="detail.artist.cover" class="coverImg-content">
              </div>
              <div class="list-info-wrapper">
                  <div class="list-name"><p>{{detail.artist.name}}</p></div>
                  <div class="creator">
                      单曲数：<p>{{detail.artist.musicSize}}</p>
                      专辑数：<p>{{detail.artist.albumSize}}</p>
                      mv数：<p>{{detail.artist.mvSize}}</p>
                  </div>
                    <div class="briefDesc-wra" ref="briefDesc">
                        <div class="briefDesc">
                            <p>{{detail.artist.briefDesc}}</p>
                        </div>
                    </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import {artistDetail} from '../../api/artist'
import BScroll from '@better-scroll/core'
import MouseWheel from '@better-scroll/mouse-wheel'
import ScrollBar from '@better-scroll/scroll-bar'
export default {
    name:'ArtistDetail',
    props:{
        id:Number
    },
    data() {
        return {
            detail:[]
        }
    },
    methods: {
        artistDetail(){
            artistDetail(this.id).then(res=>{
                this.detail=res.data
            })
        }
    },
    watch:{
      detail:{
        immidiate:true,
        handler(detail){
          if(detail.artist.briefDesc){
            this.$nextTick(()=>{
                BScroll.use(MouseWheel)
                BScroll.use(ScrollBar)
                    this.scroll = new BScroll(this.$refs.briefDesc,{
                        click:false,
                        mouseWheel: true,
                        disableMouse:true,
                        scrollY: true,
                        scrollbar: true
                })
            })
            setTimeout(() => {
                this.scroll.refresh()
            }, 1000);
            }
        }
      },
    },
    created() {
        this.artistDetail()

    },
    mounted(){

    },
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/preset/varibles.styl';
@import '~@/assets/preset/mixins.styl';

.a-desc-wrapper
    width 100%
    // background-color pink
    padding 1rem
    box-sizing border-box
    .a-desc-container
        width 100%
        background-color #fff
        .a-desc-top
            width 100%
            height 20rem
            padding 1rem
            box-sizing border-box
            border-bottom 0.2rem solid $mainColor
            position relative
            .coverImg
                width 18rem
                height 18rem
                position absolute
                left 0
                .coverImg-content
                    width 100%
                    height 100%
                    border-radius 2.5rem
                    border 0.1rem solid $mainColor
            .list-info-wrapper
                position absolute
                left 18rem
                margin-left 1rem
                font-size 1rem
                p
                    margin 0.5rem 0.5rem
                .list-name
                    font-size 1.5rem
                .creator
                    width 100%
                    height 2rem
                    line-height 2rem
                    display flex
                    .creator-avartar
                        width 2rem
                        height 2rem
                        border-radius 50%
                    p
                        margin 0 0.5rem 0 0
                .controller
                    margin 0.5rem 0
                .list-play-count
                    display flex
                .other-info
                    display flex
                    flex-direction column
        .briefDesc-wra
            width 52rem
            height 12rem
            overflow hidden
            position relative
            .briefDesc
                width 100%
</style>
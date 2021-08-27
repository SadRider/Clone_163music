<template>
  <div class="suggest-wrapper">
      <div class="triangle-up"/>
      <div class="suggest-container" ref="container">
          <div class="container-wra">
            <div class="title">关于<span class="keyword">{{keyword}}</span>的搜索结果为：</div>
            <div class="suggest-song" v-if="songs&&songs.length">
                <div class="suggest-title"><i class="iconfont icon-yinyue"/>单曲</div>
                <div class="suggest-res" v-for="item_song in songs" :key="item_song.id" @click="toPlay(item_song.id)">{{item_song.name}} - {{item_song.artists}}</div>
            </div>
            <div class="suggest-song" v-if="artists&&artists.length">
                <div class="suggest-title"><i class="iconfont icon-geshou"/>歌手</div>
                <div class="suggest-res" v-for="item_artists in artists" :key="item_artists.id" @click="toArtist(item_artists.id)">{{item_artists.name}}</div>
            </div>
            <div class="suggest-song" v-if="albums&&albums.length">
                <div class="suggest-title"><i class="iconfont icon-zhuanjiguangpan"/>专辑</div>
                <div class="suggest-res" v-for="item_albums in albums" :key="item_albums.id" @click="toAlbums(item_albums.id)">{{item_albums.name}} - {{item_albums.artist.name}}</div>
            </div>
            <div class="suggest-song" v-if="playlists&&playlists.length">
                <div class="suggest-title"><i class="iconfont icon-songlist"/>歌单</div>
                <div class="suggest-res" v-for="item_playlists in playlists" :key="item_playlists.id" @click="toPlayList(item_playlists.id)">{{item_playlists.name}}</div>
            </div>
          </div>
      </div>
  </div>
</template>

<script>
import {getSongsDetail} from '../../../api/getSongs'
import {Suggest} from '../../../api/search'
import BScroll from '@better-scroll/core'
import MouseWheel from '@better-scroll/mouse-wheel'
import ScrollBar from '@better-scroll/scroll-bar'
export default {
    name:'Suggest',
    data() {
        return {
            albums:[],//专辑
            artists:[],//歌手
            playlists:[],//歌单
            songs:[],//歌手
            order:[],
            songdetail:[]
        }
    },
    props:{
        keyword:String
    },
    methods: {
        async Suggest(){
            await Suggest(this.keyword).then(res=>{
                const {
                    albums,
                    artists,
                    playlists,
                    songs,
                    order
                } = res.result
                this.albums = albums
                this.artists=artists
                this.playlists=playlists
                this.songs=songs.map(item=>({
                    id:item.id,
                    name:item.name,
                    artists:item.artists.map(aItem=>aItem.name).join('/'),
                }))
               this.order=order

            })
        },
        toPlay(id){
            getSongsDetail(id).then(res=>{
                this.songdetail = {
                    id:res.songs[0].id,
                    name:res.songs[0].name,
                    artist:res.songs[0].ar.map((item) => item.name).join("/"),
                    picUrl:res.songs[0].al.picUrl,
                }
                this.$store.commit({
                    type:'player/selectSongOnSuggest',
                    id,
                    song:this.songdetail
                })
            })
            this.$emit('hidden')
        },
        toArtist(id){
            console.log(id)
            this.$router.push({
                name:'artist',
                params:{id}
            })
            this.$emit('hidden')

        },
        toAlbums(id){
            this.$router.push({
                name:'albums',
                params:{id}
            })
            this.$emit('hidden')
        },
        toPlayList(id){
            this.$router.push({
                name:'playlist',
                params:{id}
            })
            this.$emit('hidden')
        },
    },
    watch:{
        keyword(newValue){
            const re = new RegExp("^[ ]+$")//判断是否输入空格
            if(newValue!==undefined && newValue.length!==0 && newValue!==null&&!re.test(newValue)){
                this.Suggest()
            }
        }
    },
    created() {
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

.suggest-wrapper
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
    .suggest-container
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
        .container-wra
            width 100%
            .title
                width 100%
                height 1.5rem
                .keyword
                    color $bgColor
            .suggest-song
                width 100%
                .suggest-title
                    width 100%
                    height 1.5rem
                    line-height 1.5rem
                    background-color $mainColor
                    padding 0 0.5rem
                    box-sizing border-box
            .suggest-res
                width 100%
                height 1.5rem
                line-height 1.5rem
                padding 0 0.5rem
                box-sizing border-box
                ellipsis()
                cursor pointer
</style>
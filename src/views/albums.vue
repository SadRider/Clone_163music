<template>
  <!-- 歌单详情页 -->
  <div class="playlist-warpper">
      <div class="playlist-container">
          <div class="playlist-top">
              <div class="coverImg">
                  <img v-lazy="playlist.coverImg" class="coverImg-content">
              </div>
              <div class="list-info-wrapper">
                  <div class="list-name"><p>{{playlist.name}}</p></div>
                  <div class="creator">
                      <img v-lazy="playlist.creator_avartar" class="creator-avartar">
                      歌手：<p>{{playlist.creator}}</p>
                      发行于：<p>{{playlist.createTime | formatDate}}</p>
                  </div>
                  <div class="controller">
                      <el-button @click="playAll">播放全部</el-button>
                  </div>
                    <div class="list-play-count">
                        <p>歌曲：{{playlist.songCount}}首</p>
                    </div>
              </div>
          </div>
          <SongListTable :songslist="songsList"/>
      </div>
  </div>
</template>

<script>
import {getAlbumsInfo,getSongsDetail} from '../api/getSongs'
import SongListTable from '../components/base/SongListTable.vue'
export default {
    name:'PlayList',
    components:{
        SongListTable
    },
    data() {
        return {
            id:-1,//歌单ID
            playlist:[],
            songsList:[],//保存歌单中所有歌曲信息
            // songsListTest:''
        }
    },
        //过滤器
    filters:{
        formatDate(value){
            var time = new Date(value)
            var y = time.getFullYear()
            var m = time.getMonth()+1
            var d = time.getDate()
            var h = time.getHours()
            var mm = time.getMinutes()
            return y+'年'+m+'月'+d+'日'+''+h+'时'+mm+'分'
        },
    },
    methods: {
        getSongList(id){
            getAlbumsInfo(id).then(res=>{
                // this.playlist=res
                console.log(res)
                const newData = {
                    id:res.album.id,
                    albumID:res.album.id,
                    name:res.album.name,
                    coverImg:res.album.picUrl,
                    creator:res.album.artists.map(artItem=>artItem.name).join('/'),
                    creator_avartar:res.album.blurPicUrl,
                    createTime:res.album.publishTime,
                    songCount:res.songs.length,
                }
                const songIDListTest = res.songs.map(item=>item.id).join(',')
                this.playlist = newData
                    getSongsDetail(songIDListTest).then(res=>{
                        const songs = res.songs.map(item=>({
                            id:item.id,
                            name:item.name,
                            artist:item.ar.map(item=>item.name).join('/'),
                            albumName:item.al.name,
                            picUrl:item.al.picUrl,
                            time:this.formatTime(item.dt)
                        }))
                        this.songsList = songs
                    })
            })
        },
        formatTime(value){
            //计算分钟
            value = value/1000
            let mins = Math.floor(value/60)
            let secend = Math.floor(value%60)
            if(mins<9){
                mins=("0"+mins)
            }
            if(secend<9){
                secend=("0"+secend)
            }
            return mins + ":" + secend
        },
        playAll(){
            this.play(this.songsList[0].id)
        },
        play(id){
            this.$store.commit({
                type:'player/selectSongByIndex',
                id,
                list:this.songsList
            })
        }
    },
    computed:{
        playCount(){
            if(this.playlist.playCount<=10000){
                return this.playlist.playCount+'次'
            }else{
                return Math.floor(this.playlist.playCount/10000)+'万次'
            }
        }
    },
    created() {
        this.id = parseInt(this.$route.params.id)
        this.getSongList(this.id)
    },
    mounted() {

    },
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/preset/varibles.styl';
@import '~@/assets/preset/mixins.styl';

/deep/.cell
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
.playlist-warpper
    width 100%
    // background-color pink
    padding 1rem
    box-sizing border-box
    .playlist-container
        width 100%
        background-color #fff
        .playlist-top
            width 100%
            height 20rem
            padding 1rem
            box-sizing border-box
            display flex
            border-bottom 0.2rem solid $mainColor
            .coverImg
                width 18rem
                height 18rem
                .coverImg-content
                    width 100%
                    border-radius 2.5rem
                    border 0.1rem solid $mainColor
            .list-info-wrapper
                flex-grow 1
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
                        margin 0 0.5rem
                .controller
                    margin 0.5rem 0
                .list-play-count
                    display flex
                .other-info
                    display flex
                    flex-direction column
        .playlist-content
            width 100%
</style>
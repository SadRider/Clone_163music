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
                      <p>{{playlist.creator}}</p>
                      <p>{{playlist.createTime | formatDate}}创建</p>
                  </div>
                  <div class="controller">
                      <el-button @click="playAll">播放全部</el-button>
                  </div>
                    <div class="list-play-count">
                        <p>歌曲：{{playlist.songCount}}首</p>
                        <p>播放数：{{playCount}}</p>
                    </div>
                    <div class="other-info">
                        <p>标签：{{playlist.tags}}</p>
                        <p>简介：{{playlist.desc}}</p>
                    </div>
              </div>
          </div>
          <SongListTable :songslist="songsList"/>
      </div>
  </div>
</template>

<script>
import {getSongListInfo,getSongsDetail} from '../api/getSongs'
import {mapGetters} from 'vuex'
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
            console.log(this.getCookie)
            getSongListInfo(id,this.getCookie).then(res=>{
                const newData = {
                    id:res.playlist.id,
                    name:res.playlist.name,
                    coverImg:res.playlist.coverImgUrl,
                    desc:res.playlist.description,
                    creator:res.playlist.creator.nickname,
                    creator_avartar:res.playlist.creator.avatarUrl,
                    createTime:res.playlist.createTime,
                    songCount:res.playlist.trackCount,
                    playCount:res.playlist.playCount,
                    tags:res.playlist.tags.map(item=>item).join('/')
                }
                const songIDListTest = res.playlist.trackIds.map(item=>item.id).join(',')
                this.playlist = newData
                    getSongsDetail(songIDListTest).then(res=>{
                        const songs = res.songs.map(item=>({
                            id:item.id,
                            name:item.name,
                            artist:item.ar.map(item=>item.name).join('/'),
                            albumID:item.al.id,
                            albumName:item.al.name,
                            picUrl:item.al.picUrl,
                            time:this.formatTime(item.dt)
                        }))
                        // console.log(songs)
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
        OnclickSong(row){
            // console.log("row",row.id)
            this.play(row.id)

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
        },
    },
    computed:{
        ...mapGetters({
            getCookie:'login/getCookie'
        }),
        playCount(){
            if(this.playlist.playCount<=10000){
                return this.playlist.playCount+'次'
            }else{
                return Math.floor(this.playlist.playCount/10000)+'万次'
            }
        },

    },
    created() {
        this.id = parseInt(this.$route.params.id)
        this.getSongList(this.id)
    },
    mounted() {

    },
    watch:{

    }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/preset/varibles.styl';
@import '~@/assets/preset/mixins.styl';

/deep/.cell
    ellipsis()
.playlist-warpper
    width 100%
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
</style>
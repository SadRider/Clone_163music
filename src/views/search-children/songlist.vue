<template>
  <div class="list-wrapper">
    <SongListTable :songslist="songslist"/>   
  </div>
</template>

<script>
import SongListTable from '../../components/base/SongListTable.vue'
import {Search} from '../../api/search'
export default {
    name:'SearchSongList',
    components:{
        SongListTable
    },
    props:{
        keyword:String
    },
    data() {
        return {
            songslist:[],
            type:1//取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合
        }
    },
    methods: {
        Search_(){
            Search(this.keyword,this.type).then(res=>{
                // console.log(res)
                const songs = res.result.songs.map(item=>({
                    id:item.id,
                    name:item.name,
                    artist:item.ar.map(item=>item.name).join('/'),
                    albumID:item.al.id,
                    albumName:item.al.name,
                    picUrl:item.al.picUrl,
                    time:this.formatTime(item.dt)
                }))
                this.songslist=songs
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
    },
    computed:{

    },
    created() {
        this.Search_()
    },
}
</script>

<style lang="stylus" scoped>

</style>
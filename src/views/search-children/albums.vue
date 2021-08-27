<template>
  <div class="artist-wrapper">
      <div class="artist-container">
        <ResultList :list="albums" :list_type=" list_type"/>
      </div>
  </div>
</template>

<script>
import ResultList from '../../components/base/result-list.vue'
import {Search} from '../../api/search'
export default {
    name:'SearchAlbums',
    components:{
        ResultList
    },
    props:{
        keyword:String
    },
    data() {
        return {
            albums:[],
            list_type:'albums',
            type:10//取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合
        }
    },
    methods: {
        Search_(){
            Search(this.keyword,this.type).then(res=>{
                this.albums = res.result.albums.map(item=>({
                    id:item.id,
                    picUrl:item.picUrl,
                    name:item.name,
                    artists:item.artists.map(aItem=>aItem.name).join('/')
                }))
            })
        },
    },
    created() {
        this.Search_()
    },
}
</script>

<style lang="stylus" scoped>
.artist-wrapper
    width 100%
    .artist-container
        width 100%
        padding 1rem
        box-sizing border-box
</style>
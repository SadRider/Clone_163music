<template>
  <div class="artist-wrapper">
      <div class="artist-container">
        <ArtistCard v-for="item in artists" :key="item.id" :artist="item"/>
      </div>
  </div>
</template>

<script>
import ArtistCard from '../../components/base/artist-card.vue'
import {Search} from '../../api/search'
export default {
    name:'SearchArtistList',
    components:{
        ArtistCard
    },
    props:{
        keyword:String
    },
    data() {
        return {
            artists:[],
            type:100//取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合
        }
    },
    methods: {
        Search_(){
            Search(this.keyword,this.type).then(res=>{
                this.artists=res.result.artists
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
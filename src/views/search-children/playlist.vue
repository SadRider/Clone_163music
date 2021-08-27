<template>
  <div class="list-wrapper">
      <div class="list-container">
        <ResultList :list="list" :list_type="list_type"/>
      </div>
  </div>
</template>

<script>
import ResultList from '../../components/base/result-list.vue'
import {Search} from '../../api/search'
export default {
    name:'SearchPlayList',
    components:{
        ResultList
    },
    props:{
        keyword:String
    },
    data() {
        return {
            list:[],
            list_type:'playlist',
            type:1000//取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合
        }
    },
    methods: {
        Search_(){
            Search(this.keyword,this.type).then(res=>{
                this.list = res.result.playlists.map(item=>({
                    id:item.id,
                    picUrl:item.coverImgUrl,
                    name:item.name,
                    artists:item.creator.nickname
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
.list-wrapper
    width 100%
    .list-container
        width 100%
        padding 1rem
        box-sizing border-box
</style>
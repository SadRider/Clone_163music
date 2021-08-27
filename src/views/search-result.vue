<template>
  <div class="search-wrapper">
      <div class="search-container">
          <div class="title">关于“<span>{{keyword}}</span>”的搜索结果</div>
      </div>
      <Menu :list="menu" @isShow="isShow"/>
      <SearchSongList 
      :keyword="keyword"
      v-show="show==='歌曲'"/>
      <SearchArtistList
      :keyword="keyword" 
      v-show="show==='歌手'" />
      <SearchAlbums
      :keyword="keyword" 
      v-show="show==='专辑'" />
      <SearchPlayList
      :keyword="keyword" 
      v-show="show==='歌单'" />
  </div>
</template>

<script>
import Menu from '../components/base/menu.vue'
import SearchSongList from './search-children/songlist.vue'
import SearchArtistList from './search-children/artistlist.vue'
import SearchAlbums from './search-children/albums.vue'
import SearchPlayList from './search-children/playlist.vue'
export default {
    name:'SearchResult',
    components:{
      Menu,
      SearchSongList,
      SearchArtistList,
      SearchAlbums,
      SearchPlayList
    },
    data() {
        return {
            keyword:'',
            menu:['歌曲','歌手','专辑','歌单'],
            show:'歌曲'
        }
    },
    methods: {
        isShow(data){
            this.show=data
        }
    },
    created() {
        this.keyword=this.$route.params.keyword
    },
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/preset/varibles.styl';
@import '~@/assets/preset/mixins.styl';

.search-wrapper
    width 100%
    .search-container
        width 100%
        padding 1rem
        box-sizing border-box
        .title
            width 100%
            height 4rem
            line-height 4rem
            font-size 2rem
            margin-bottom 1rem
            span
                color $bgColor
</style>
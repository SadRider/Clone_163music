<template>
  <div>
      <HotSong :id="id"/>
      <ArtistAlbums v-for="(item,index) in albumsList" :key="index" :album="item"/>
  </div>
</template>

<script>
import HotSong from './albums/hot-songs.vue'
import ArtistAlbums from './albums/artist-albums.vue'
export default {
    name:'AlbumsList.vue',
    props:{
        albumsList:Array,
        id:Number
    },
    components:{
        HotSong,
        ArtistAlbums
    }
}
</script>

<style lang="stylus" scoped>

</style>
<template>
  <div>
      <ArtistDetail :id="id"/>
      <Menu :list="list" @isShow="isShow"/>
      <AlbumsList 
      :albumsList="albumsList" 
      :id="id"
      v-show="show==='专辑'"
      />
      <ArtistMV
      :id="id"
      v-show="show==='MV'"/>
      <ArtistDesc 
      v-show="show==='歌手详情'"
      :id="id"/>
      <SimiArtist 
      v-show="show==='相似歌手'"
      :id="id"/>

  </div>
</template>

<script>
import ArtistDetail from './artist-children/artist-detail.vue'
import Menu from '../components/base/menu.vue'
import AlbumsList from './artist-children/albumsList.vue'
import ArtistMV from './artist-children/artist-mv.vue'
import ArtistDesc from './artist-children/artist-desc.vue'
import SimiArtist from './artist-children/simiartist.vue'
import {getArtistAlbums} from '../api/artist'
export default {
    name:'Artist',
    components:{
        ArtistDetail,
        Menu,
        AlbumsList,
        ArtistMV,
        ArtistDesc,
        SimiArtist
    },
    data() {
        return {
            id:'',
            limit:50,
            offset:1,
            albumsList:[],
            show:'',
            list:['专辑','MV','歌手详情','相似歌手']
        }
    },
    methods: {
        getArtistAlbums(){
            getArtistAlbums(this.id,this.limit,this.getOffset).then(res=>{
                this.albumsList=res.hotAlbums
            })
        },
        isShow(data){
            // console.log("data",data)
            this.show = data
        }
    },
    computed:{
        getOffset(){
            return (this.offset-1)*this.limit
        }
    },
    created() {
        this.id = parseInt(this.$route.params.id)
        this.getArtistAlbums()
    },
}
</script>

<style lang="stylus" scoped>

</style>
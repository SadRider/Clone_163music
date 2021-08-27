<template>
  <div class="simiartist-wrapper">
      <div class="simiartist-container">
          <ArtistCard v-for="item in artists" :key="item.id" :artist="item"/>
      </div>
  </div>
</template>

<script>
import ArtistCard from '../../components/base/artist-card.vue'
import {getSimiArtist} from '../../api/artist'
export default {
    name:'SimiArtist',
    components:{
        ArtistCard
    },
    props:{
        id:Number
    },
    data() {
        return {
            artists:[]
        }
    },
    methods: {
        getSimiArtist(){
            getSimiArtist(this.id).then(res=>{
                console.log(res)
                this.artists=res.artists
            })
        }
    },
    created() {
        this.getSimiArtist()
    },
}
</script>

<style lang="stylus" scoped>

</style>
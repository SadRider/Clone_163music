<template>
  <div class="card-wrapper" @click="toArtistDesc(artist.id)">
      <div class="artist-img">
          <img v-lazy="artist.img1v1Url">
      </div>
      <div class="artist-name"><span>{{artist.name}}</span></div>
  </div>
</template>

<script>
export default {
    name:'ArtistCard',
    props:{
        artist:Object
    },
    methods: {
        toArtistDesc(id){
            this.$router.push({
                name:'artist',
                params:{id}
            })
        }
    },
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/preset/varibles.styl';
@import '~@/assets/preset/mixins.styl';

.card-wrapper
    position relative
    overflow hidden
    float left
    width 20%
    height 0
    padding-bottom 20%
    cursor pointer
    .artist-img
        position absolute
        top 0
        left 0
        right 0
        bottom 2rem
        background-color #fff
        img
            display block
            margin 0 auto
            height 100%
            // border-radius 2.5rem
    .artist-name
        position absolute
        left 0
        right 0
        bottom 0
        height 2rem
        line-height 2rem
        font-size 1rem
        text-align center
        ellipsis()
</style>
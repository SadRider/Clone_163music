<template>
  <div class="list-wrapper">
      <table class="container">
          <tr v-for="item in list" :key="item.id" @click="toDesc(item.id)">
              <td>
                  <div class="cover"><img v-lazy="item.picUrl"></div>
                </td>
              <td><span>{{item.name}}</span></td>
              <td>{{item.artists}}</td>
          </tr>
      </table>
  </div>
</template>

<script>
export default {
    name:'ResultList',
    props:{
        list:Array,
        list_type:String
    },
    methods: {
        toAlbums(id){
            this.$router.push({
                name:'albums',
                params:{id}
            })
            this.$emit('hidden')
        },
        toPlayList(id){
            this.$router.push({
                name:'playlist',
                params:{id}
            })
            this.$emit('hidden')
        },
        toDesc(id){
            if(this.list_type=='playlist'){
                this.toPlayList(id)
            }
            if(this.list_type=='albums'){
                this.toAlbums(id)
            }
        }
    },
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/preset/varibles.styl';

.list-wrapper
    width 100%
    .container
        width 100%
        border-collapse collapse
        td
            vertical-align middle
            border-top 0.1rem solid #ddd
            border-bottom 0.1rem solid #ddd
            padding 0.1rem
    .container tr:nth-child(even)
        background-color #f2f2f2
    .container tr:hover
        background-color $activeColor
    .cover
        width 4rem
        height 4rem
        img
            width 100%
</style>
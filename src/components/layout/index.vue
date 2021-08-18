<template>
  <div class="layout">
    <IndexHeader />
    <div class="layout-body">
      <div class="layout-menu">
        <IndexMenu />
      </div>
      <div class="content" id="page-content">
        <router-view class="router-view-center"></router-view>
      </div>
    </div>
    <div class="player-container">
      <Player @isShowList="isShowList"/>
    </div>
    <MusicList :isShow="drawer"/>
  </div>
</template>

<script>
import IndexHeader from './header.vue'
import IndexMenu from './menuList.vue'
import Player from './player.vue'
import MusicList from './musicList.vue'
export default {
    name:'Index',
    components:{
        IndexHeader,
        IndexMenu,
        Player,
        MusicList
    },
    data() {
      return {
        drawer:false
      }
    },
    methods: {
      isShowList(data){
        this.drawer = data
      }
    },
}
</script>

<style lang="stylus" scoped>
.layout
  position relative
  height 100%
  .layout-body
    display flex
    height calc(100% - 3.125rem)
    // background pink
    .layout-menu
      height calc(100% - 3.125rem)
    .content
      flex 1
      overflow-y auto
      min-width 43.75rem
      margin-bottom 5rem
      .router-view-center
        max-width 75rem
        margin auto
  .player-container
    position absolute
    bottom 0
    width 100%
    // background-color red
</style>
<template>
  <div class="layout">
    <IndexHeader />
    <div class="layout-body">
      <div class="layout-menu">
        <IndexMenu />
      </div>
      <div class="content" id="page-content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import IndexHeader from '../components/layout/header.vue'
import IndexMenu from '../components/layout/menuList.vue'
export default {
    name:'Index',
    components:{
        IndexHeader,
        IndexMenu
    }
}
</script>

<style lang="stylus" scoped>
.layout
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
      margin-bottom 3.75rem
</style>
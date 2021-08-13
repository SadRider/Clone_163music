<template>
  <div class="menu">
      <div class="menu-wrap">
        <div class="menu-block" v-for="(menu,index) in menus" :key="index">
          <p class="menu-block-title" v-show="menu.title">{{menu.title}}</p>
          <ul class="menu-list">
              <router-link 
              v-for="(item,index) in menu.children" 
              :key="index" 
              :to="item.path" 
              tag="li" 
              class="menu-item"
              active-class="menu-item-active"
              >
                <span class="iconfont" v-html="item.meta.icon"></span>
                <span class="menu-title">{{item.meta.title}}</span>
              </router-link>
          </ul>
      </div>
      </div>
  </div>
</template>

<script>
import { menuRoutes } from '../../router'
export default {
    name:'Menu',
    data() {
        return {
            menus:[{
                type: 'root',
                children: menuRoutes,
            }]
        }
    },
}
</script>

<style lang='stylus' scoped>
.menu
    width 15.625rem
    height 100%
    display flex
    flex-direction column
    background #ededed
    .menu-wrap
        flex 1
        overflow hidden
        overflow-y auto
        .menu-block
            margin-bottom 1rem
            .menu-block-title
                font-size 12px
                color #909090
                padding-left 1rem
                margin-bottom 0.5rem
            .menu-list
                .menu-item
                    padding 12px 18px
                    cursor pointer
                    &:hover
                        background #e7e7e7
                .menu-item-active
                    color #d33a31
                    background #e2e2e2
                .menu-title
                    font-size 1rem
                    margin-left 0.5rem

</style>
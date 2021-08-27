<template>
  <div class="menu">
      <div class="menu-wrap">
          <Login />
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
      <LoginSongList v-if="cookie"/>
      </div>
  </div>
</template>

<script>
import { menuRoutes } from '../../router'
import {mapGetters} from 'vuex'
import Login from '../base/login.vue'
import LoginSongList from '../base/loginsonglist.vue'
export default {
    name:'Menu',
    components:{
        Login,
        LoginSongList
    },
    data() {
        return {
            menus:[{
                type: 'root',
                children: menuRoutes,
            }]
        }
    },
    computed:{
        ...mapGetters({
            cookie:'login/getCookie'
        })
    }
}
</script>

<style lang='stylus' scoped>
@import '~@/assets/preset/varibles.styl';
@import '~@/assets/preset/mixins.styl';

.menu
    width 18.75rem
    height 100%
    display flex
    flex-direction column
    background $activeColor
    .menu-wrap
        flex 1
        overflow hidden
        .menu-block
            margin-bottom 1rem
            .menu-block-title
                font-size 12px
                color black
                padding-left 1rem
                margin-bottom 0.5rem
            .menu-list
                .menu-item
                    padding 12px 18px
                    cursor pointer
                    transition all 0.3s
                    &:hover
                        background $activeColor
                .menu-item-active
                    font-size 1rem
                    color $bgColor
                    background $activeColor
                .menu-title
                    font-size 1rem
                    margin-left 0.5rem

</style>
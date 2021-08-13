import Vue from "vue";
import Router from "vue-router"
const discovery = () => import('../views/discovery.vue')
const recommend = () => import('../views/recommend.vue')
const newsongs = () => import('../views/newsongs.vue')
const newMV = () => import('../views/newMV.vue')

export const layoutCenterNames = ['discovery', 'playlists', 'songs', 'mvs']

export const menuRoutes = [
  {
    path: '/discovery',
    name: 'discovery',
    component: discovery,
    meta: {
      title: '发现音乐',
      icon:'&#xe61b;'
    },
  },
  {
    path: '/recommend',
    name: 'recommend',
    component: recommend,
    meta: {
      title: '推荐歌单',
      icon:'&#xe660;'
    },
  },
  {
    path: '/newsongs',
    name: 'newsongs',
    component: newsongs,
    meta: {
      title: '最新音乐',
      icon:'&#xe680;'
    },
  },
  {
    path: '/newMV',
    name: 'newMV',
    component: newMV,
    meta: {
      title: '最新MV',
      icon:'&#xe605;'
    },
  },
]

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      redirect: 'discovery'
    },
    ...menuRoutes,
  ]
})
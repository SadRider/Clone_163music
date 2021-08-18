import Vue from 'vue'
import App from './App.vue'
import './assets/CSS/reset.css'
import './assets/CSS/base.css'
import './assets/CSS/iconfont.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import store from './store'
import VueLazyLoad from 'vue-lazyload'
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueLazyLoad,{
  error:require('../src/assets/error.jpg'),
  loading:require('../src/assets/loading.gif')
})
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

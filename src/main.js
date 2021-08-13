import Vue from 'vue'
import App from './App.vue'
import './assets/CSS/reset.css'
import './assets/CSS/base.css'
import './assets/CSS/iconfont.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
Vue.config.productionTip = false
Vue.use(ElementUI)
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

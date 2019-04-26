// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import store from './store'
import httpindex from './http/index'
import c_title from './components/title.vue'
import bg_url from './components/bg.vue'
import storage from './common/cookie.js'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

//将常用工具方法扩展成Vue实例
Vue.use(mavonEditor)
Vue.prototype.$storage=storage;
Vue.use(httpindex)
Vue.use(Vuex)
Vue.config.productionTip = false

//全局组件
Vue.component('c_title', c_title)
Vue.component('bg_url', bg_url)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

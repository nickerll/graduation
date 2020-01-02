// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import "../static/css/common.css"
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Axios from 'axios'
Axios.defaults.baseURL = "http://localhost:3000"
Vue.prototype.$http = Axios
import store from './vuex'
import commonUtil from './common.js'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(commonUtil)


router.beforeEach((to, from, next) => {
  console.log(to)
  console.log(from)
  // to and from are both route objects. must call `next`.
  if (to.meta.loginRequest) { //判断即将要进入的路由对象中meta中的loginrequest为true，进行拦截
    if (sessionStorage.getItem('token')) { //判断本地存储中是否有user数据
      next() //表示已经登录
    } else {
      console.log(to.fullPath)
      next({ //next可以传递一个路由对象作为参数，表示需要跳转到的页面
        path: '/admin', //跳转的路由
        query: {
          redirect: to.fullPath //把要跳转的页面路作为参数传到登录页面
        }
        // name:'list'
      })
    }
  } else {
    next() //直接进入页面
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>',
  mounted() {
    // console.log(window.location.origin)
    // console.log(router.beforeEach)
    //登录拦截请求
  },

})
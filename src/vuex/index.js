import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  //全局变量
  state: {
    user: ''
    // user:JSON.parse(sessionStorage.getItem('$user')) || {} //保存用户登录后基本信息
  },
  //获取登录信息
  getters: {
    getUser: state => {
      return state.user
    }
  },
  actions: {
    // setUser({ commit },item){
    //   commit('setUser',item)
    // }
    login(context, payload) {
      context.commit('login', payload)
    },
    logout(context) {
      context.commit('logout')
    }
  },
  mutations: {
    login(state, item) {
      state.user = item
      sessionStorage.setItem('$user', JSON.stringify(state.user))
    },
    logout(state) {
      state.user = {}
      sessionStorage.setItem('$user', JSON.stringify(state.user))
    }
  }
  //修改全局变量必须通过mutations中的方法
  //mutations只能采用同步方法
  // mutations:{
  //     login(state,payload){
  //         state.user = payload
  //     },
  //     logout(state){
  //         state.user = undefined
  //     }
  // },
  //异步方法用action
  //action不能直接修改全局变量，需要调用commit方法来触发mutation中的方法
  // actions:{
  //     login(context,payload){
  //         context.commit('login',payload)
  //     },
  //     logout(context){
  //         context.commit('logout')
  //     }
  // }
})

export default store

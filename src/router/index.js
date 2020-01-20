import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import Login from '@/components/login'
import admin from '@/components/admin/admin'
import register from '@/components/register'

Vue.use(Router)

export default new Router({
  mode:"history",
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path:'/login',
      name:'Login',
      component:Login
    },{
      path:'/admin',
      name:'Admin',
      component:admin,
      // children:[{
      //   path:'/admin/list',
      //   name:'list',
      //   component:reslove => {
      //     require(['@/components/admin/list'],reslove)
      //   }
      // }]
    },{
      path:'/register',
      name:'Register',
      component:register
    },{
      path:'/scienc',
      name:'scienc',
      component:reslove => {
        require(['@/components/scienc'],reslove)
      }
    },
    {
      path:'/admin/list',
      name:'list',
      component:reslove => {
        require(['@/components/admin/list'],reslove)
      },
      meta:{
        loginRequest:true //校验判断的路由
      }
    },
    {
      path:'/messagelist',
      name:'messagelist',
      component:resolve => {require(['@/components/messageList'],resolve)}
    },
    {
      path:'/mesdetail',
      name:'mesdetail',
      component:resolve => {require(['@/components/mesdetail'],resolve)}
    }
  ]
})

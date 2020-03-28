import Vue from 'vue'
import Router from 'vue-router'
import layout from '@/components/layout/layout'
import book from '@/components/layout/book'
import datashow from '@/components/layout/datashow'
import banner from '@/components/layout/banner'
import category from '@/components/layout/category'
import collection from '@/components/layout/collection'
import comment from '@/components/layout/comment'
import local from '@/components/layout/local'
import order from '@/components/layout/order'
import reverse from '@/components/layout/reverse'
import user from '@/components/layout/user'
import wash from '@/components/layout/wash'
import login from '@/components/layout/login'
Vue.use(Router)


export default new Router({
  routes: [
    {
      path:'/',
      name:'login',
      component:login
    },
    {
      path: '/admin',
      name: 'layout',
      component: layout,
      redirect: '/datashow',
      children:[
        {
          path:'/book',
          name:'book',
          component:book
        },
        {
          path:'/datashow',
          name:'datashow',
          component:datashow
        },
        {
          path:'/banner',
          name:'banner',
          component:banner
        },
        {
          path:'/category',
          name:'category',
          component:category
        },
        {
          path:'/collection',
          name:'collection',
          component:collection
        },
        {
          path:'/local',
          name:'local',
          component:local
        },
        {
          path:'/order',
          name:'order',
          component:order
        },
        {
          path:'/reverse',
          name:'reverse',
          component:reverse
        },
        {
          path:'/user',
          name:'user',
          component:user
        },
        {
          path:'/wash',
          name:'wash',
          component:wash
        },
        {
          path:'/comment',
          name:'wash',
          component:comment
        }
      ]
    }
  ]
})

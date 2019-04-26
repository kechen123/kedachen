import Vue from 'vue'
import Router from 'vue-router'
import title from '@/components/title'
import index from '@/pages/index'
import blog from '@/pages/blog'
import music from '@/pages/163'
import contact from '@/pages/contact'
import markedown from '@/pages/markedown'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/blog',
      name: 'blog',
      component: blog
    },
    {
      path: '/163',
      name: '163',
      component: music
    },
    {
      path: '/contact',
      name: 'contact',
      component: contact
    },
    {
      path:'/markedown',
      name:'markedown',
      component:markedown
    }
  ]
})

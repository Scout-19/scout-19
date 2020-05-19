import Vue from 'vue'
import VueRouter from 'vue-router'

import About from '@/views/About.vue'

import Profile from '@/views/Profile.vue'
import Message from '@/views/Message.vue'
import Search from '@/views/Search.vue'
import Setting from '@/views/Setting.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/message',
    name: 'Message',
    component: Message
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  },
  {
    path: '/setting',
    name: 'Setting',
    component: Setting
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

import Vue from 'vue'
import VueRouter from 'vue-router'

import About from '@/components/routes/About.vue'
import Login from '@/components/routes/Login.vue'
import Signup from '@/components/routes/Signup.vue'

import Profile from '@/components/routes/Profile.vue'
import Message from '@/components/routes/Message.vue'
import Search from '@/components/routes/Search.vue'
import Setting from '@/components/routes/Setting.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
  },
  {
    path: '/message',
    name: 'Message',
    component: Message,
  },
  {
    path: '/search',
    name: 'Search',
    component: Search,
  },
  {
    path: '/setting',
    name: 'Setting',
    component: Setting,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

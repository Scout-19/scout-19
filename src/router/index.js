import Vue from 'vue'
import VueRouter from 'vue-router'

import About from '@/router/routes/About'
import Login from '@/router/routes/Login'
import Signup from '@/router/routes/Signup'

import Profile from '@/router/routes/Profile'
import Message from '@/router/routes/Message'
import Search from '@/router/routes/Search'
import Setting from '@/router/routes/Setting'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Root',
    redirect: {name: 'About'}
  },
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

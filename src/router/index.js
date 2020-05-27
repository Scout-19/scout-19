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
    redirect: {name: 'About'},
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
    meta: {title: 'ログイン'}
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
    meta: {title: '新規登録'}
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {title: 'プロフィール'}
  },
  {
    path: '/message',
    name: 'Message',
    component: Message,
    meta: {title: 'メッセージ'}
  },
  {
    path: '/message/:user',
    name: 'MessageUser',
    component: Message,
    meta: {title: 'メッセージ'}
  },
  {
    path: '/search',
    name: 'Search',
    component: Search,
    meta: {title: '検索'}
  },
  {
    path: '/setting',
    name: 'Setting',
    component: Setting,
    meta: {title: '設定'}
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

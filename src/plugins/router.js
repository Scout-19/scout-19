import Vue from 'vue'
import VueRouter from 'vue-router'

import firebase from 'firebase/app'
import 'firebase/auth'

import About from '@/views/About'
import Login from '@/views/Login'
import Signup from '@/views/Signup'

import Profile from '@/views/Profile'
import Message from '@/views/Message'
import Search from '@/views/Search'
import Setting from '@/views/Setting'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Root',
    redirect: {name: 'About'},
    meta: {sidebar: false}
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: {sidebar: false}
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {title: 'ログイン', sidebar: false}
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
    meta: {title: '新規登録', sidebar: false}
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {title: 'プロフィール', sidebar: true, requiresAuth: true}
  },
  {
    path: '/message',
    name: 'Message',
    component: Message,
    meta: {title: 'メッセージ', sidebar: true, requiresAuth: true}
  },
  {
    path: '/message/:user',
    name: 'MessageUser',
    component: Message,
    meta: {title: 'メッセージ', sidebar: true, requiresAuth: true}
  },
  {
    path: '/search',
    name: 'Search',
    component: Search,
    meta: {title: '検索', sidebar: true, requiresAuth: true}
  },
  {
    path: '/setting',
    name: 'Setting',
    component: Setting,
    meta: {title: '設定', sidebar: true, requiresAuth: true}
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) =>
{
  // request auth
  var requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if( requiresAuth ) {
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        next()
      }
      else {
        next({ name: 'Login', query: { redirect: to.name } })
      }
    })
  }
  else {
    next()
  }

  // document title
  var title = to.meta.title

  if( title ) {
    document.title = title + ' | SCOUTME'
  }
  else {
    document.title = 'SCOUTME'
  }
})

export default router

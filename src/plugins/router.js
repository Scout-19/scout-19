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
import Video from '@/views/Video'


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
    meta: {title: 'プロフィール', requiresAuth: true}
  },
  {
    path: '/message',
    name: 'Message',
    component: Message,
    meta: {title: 'メッセージ', requiresAuth: true}
  },
  {
    path: '/message/:id',
    name: 'MessageRoom',
    component: Message,
    meta: {title: 'メッセージ', requiresAuth: true}
  },
  {
    path: '/search',
    name: 'Search',
    component: Search,
    meta: {title: '検索', requiresAuth: true}
  },
  {
    path: '/video',
    name: 'Video',
    component: Video,
    meta: {title: '動画', sidebar:true, requiresAuth: true}
  },
  {
    path: '/setting',
    name: 'Setting',
    component: Setting,
    meta: {title: '設定', requiresAuth: true}
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

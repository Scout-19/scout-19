import Vue from 'vue'
import VueRouter from 'vue-router'

import firebase from 'firebase/app'
import 'firebase/auth'

import About from '@/views/About'
import Login from '@/views/Login'
import Signup from '@/views/Signup'
import PasswordReset from '@/views/PasswordReset'
import EmailVerify from '@/views/EmailVerify'
import Registration from '@/views/Registration'

import PrivacyPolicy from '@/views/PrivacyPolicy'
import Terms from '@/views/Terms'

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
    path: '/resetpw',
    name: 'PasswordReset',
    component: PasswordReset,
    meta: {title: 'パスワードを忘れた方'}
  },
  {
    path: '/emailverify',
    name: 'EmailVerify',
    component: EmailVerify,
    meta: {title: 'メール確認', requiresAuth: true}
  },
  {
    path: '/registration',
    name: 'Registration',
    component: Registration,
    meta: {title: '個人情報入力', requiresAuth: true}
  },
  {
    path: '/privacypolicy',
    name: 'PrivacyPolicy',
    component: PrivacyPolicy,
    meta: {title: 'プライバシーポリシー'}
  },
  {
    path: '/terms',
    name: 'Terms',
    component: Terms,
    meta: {title: '利用規約'}
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {title: 'プロフィール', requiresAuth: true, navigation: true}
  },
  {
    path: '/message',
    name: 'Message',
    component: Message,
    meta: {title: 'メッセージ', requiresAuth: true, navigation: true}
  },
  {
    path: '/message/:id',
    name: 'MessageRoom',
    component: Message,
    meta: {title: 'メッセージ', requiresAuth: true, navigation: true}
  },
  {
    path: '/search',
    name: 'Search',
    component: Search,
    meta: {title: '検索', requiresAuth: true, navigation: true}
  },
  {
    path: '/video',
    name: 'Video',
    component: Video,
    meta: {title: '動画', requiresAuth: true, navigation: true}
  },
  {
    path: '/setting',
    name: 'Setting',
    component: Setting,
    meta: {title: '設定', requiresAuth: true, navigation: true}
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
        // check email verified
        if(!user.emailVerified) {
          (to.name == 'EmailVerify') ? next() : next({ name: 'EmailVerify' })
        }
        else {
          // check registerd in firestore
          firebase.firestore().collection('users').doc(user.uid).get().then(doc => {
            if(doc.exists) {
              next()
            }
            else {
              (to.name == 'Registration') ? next() : next({ name: 'Registration' })
            }
          })
        }
      }
      else {
        next({ name: 'Login', query: { redirect: to.name } })
      }
    })
  }
  else {
    next()
  }

  // scroll to top
  window.scrollTo({top: 0, behavior: 'instant'})

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

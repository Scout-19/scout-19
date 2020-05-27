import Vue from 'vue'
import firebase from 'firebase/app'

import App from '@/App.vue'

import router from '@/router/index'
import store from '@/store/index'
import vuetify from '@/vuetify/index'

import utility from '@/mixins/utility'

Vue.config.productionTip = false
Vue.config.devtools = true

// mixin
Vue.mixin(utility)

// firebase
const config = {
  apiKey: "AIzaSyDbgoNUKKEElBuOfA9gy6KDW9DoiUj9RNY",
  authDomain: "scout-19.firebaseapp.com",
  databaseURL: "https://scout-19.firebaseio.com",
  projectId: "scout-19",
  storageBucket: "scout-19.appspot.com",
  messagingSenderId: "289359018586",
  appId: "1:289359018586:web:550244ef1a3b8a25de3663",
  measurementId: "G-CWFERVQG2Y"
};
firebase.initializeApp(config)

// create
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

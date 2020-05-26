import Vue from 'vue'
import App from '@/App.vue'

import router from '@/router/index'
import store from '@/store/index'
import vuetify from '@/vuetify/index'

import utility from '@/mixins/utility'

Vue.config.productionTip = false
Vue.config.devtools = true

// mixin
Vue.mixin(utility)

// create
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

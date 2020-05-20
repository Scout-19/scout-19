import Vue from 'vue'
import App from '@/App.vue'
import router from '@/plugins/router'
import store from '@/plugins/store'
import vuetify from '@/plugins/vuetify';
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

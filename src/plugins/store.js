import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    uid: '',
    email: '',
  },
  getters: {
    getUid: function(state) {
      return state.uid
    },
    auth: function(state) {
      return state.uid.length > 0
    },
    getEmail: function(state) {
      return state.email
    },
  },
  mutations: {
    setUid: function(state, uid) {
      state.uid = uid
    },
    setEmail: function(state, email) {
      state.email = email
    },
  },
  actions: {
    setUid: function(context, uid) {
      context.commit('setUid', uid)
    },
    setEmail: function(context, email) {
      context.commit('setEmail', email)
    },
  },
  modules: {
  }
})

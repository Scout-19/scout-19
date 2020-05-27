import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    uid: '',
  },
  getters: {
    getUid: function(state) {
      return state.uid
    },
    auth: function(state) {
      return state.uid.length > 0
    }
  },
  mutations: {
    setUid: function(state, uid) {
      state.uid = uid
    }
  },
  actions: {
    setUid: function(context, uid) {
      context.commit('setUid', uid)
    },
    clearUid: function(context) {
      context.commit('setUid', '')
    }
  },
  modules: {
  }
})

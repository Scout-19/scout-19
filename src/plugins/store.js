import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    uid: '',
    email: '',
    searchResult: { 'type': '', 'results': null }
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
    getSearchResult: function(state) {
      return state.searchResult
    },
  },
  mutations: {
    setUid: function(state, uid) {
      state.uid = uid
    },
    setEmail: function(state, email) {
      state.email = email
    },
    setSearchResult: function(state, results) {
      state.searchResult = results
    },
    clearSearchResult: function(state) {
      state.searchResult = { 'type': '', 'results': {}}
    }
  },
  actions: {
    setUid: function(context, uid) {
      context.commit('setUid', uid)
    },
    setEmail: function(context, email) {
      context.commit('setEmail', email)
    },
    setSearchResult: function(context, results) {
      context.commit('setSearchResult', results)
    },
    clearSearchResult: function(context) {
      context.commit('clearSearchResult')
    }
  },
  modules: {
  }
})

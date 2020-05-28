<template>
  <v-app>

    <SideBar account="player" v-if="drawSidebar"/>
    
    <v-content>
      <router-view/>
    </v-content>

  </v-app>
</template>

<script>
import firebase from 'firebase/app'

import { mapActions } from 'vuex'

import SideBar from '@/components/SideBar'

export default {
  name: 'App',

  components: {
    SideBar
  },

  data: () => ({
    drawSidebar: false,
  }),

  created() {
    // first judge
    this.drawSidebar = this.$router.currentRoute.meta.sidebar

    // set uid to store
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        this.setUid(user.uid)
      }
      else {
        this.setUid('')
      }
    })
  },

  methods: {
    ...mapActions([
      'setUid',
    ]),
  },

  watch: {
    // judge when change route
    '$route' (to) {
        this.drawSidebar = to.meta.sidebar
    }
  },
};
</script>

<template>
  <v-app :style="{background: $vuetify.theme.themes.light.background}">

    <SideBar account="player" v-if="false"/>
    
    <v-content>
      <router-view/>
    </v-content>

    <BottomNavigation v-if="drawNavigation"/>

    <v-footer absolute>
      <v-col class="text-center caption">© XXX All rights reserved.</v-col>
    </v-footer>

  </v-app>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

import { mapActions } from 'vuex'

import SideBar from '@/components/SideBar'
import BottomNavigation from '@/components/BottomNavigation'

export default {
  name: 'App',

  components: {
    SideBar,
    BottomNavigation
  },

  data: () => ({
    drawNavigation: false,
  }),

  created() {
    // first judge
    this.drawNavigation = this.$router.currentRoute.meta.navigation

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
      'setUserRegisterd'
    ]),
  },

  watch: {
    // judge when change route
    '$route' (to) {
        this.drawNavigation = to.meta.navigation
    }
  },
};
</script>

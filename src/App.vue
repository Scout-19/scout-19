<template>
  <v-app :style="{background: $vuetify.theme.themes.light.background}">

    <ApplicationBar :title="appBarTitle" v-if="drawNavigation"/>

    <v-content>
      <router-view/>
    </v-content>

    <BottomNavigation v-if="drawNavigation" v-model="appBarTitle"/>

    <v-footer padless>
      <v-col class="text-center caption">
        <v-row justify="center">
          <v-btn text class="mx-1 text-center caption">プライバシーポリシー</v-btn>
          <v-btn text class="mx-1 text-center caption">利用規約</v-btn>
          <v-btn text class="mx-1 text-center caption">お問い合わせ</v-btn>
        </v-row>
        <v-row justify="center">
        © ScoutMe All rights reserved.
        </v-row>
      </v-col>
    </v-footer>

  </v-app>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

import { mapActions } from 'vuex'

import BottomNavigation from '@/components/BottomNavigation'
import ApplicationBar from '@/components/ApplicationBar'

export default {
  name: 'App',

  components: {
    BottomNavigation,
    ApplicationBar
  },

  data: () => ({
    drawNavigation: false,
    appBarTitle: ''
  }),

  created() {
    // first judge
    this.drawNavigation = this.$router.currentRoute.meta.navigation

    // set uid to store
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        this.setUid(user.uid)
        this.setEmail(user.email)
      }
      else {
        this.setUid('')
        this.setEmail('')
      }
    })
  },

  methods: {
    ...mapActions([
      'setUid',
      'setEmail',
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

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
    this.drawSidebar = this.$router.currentRoute.meta.sidebar

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
    '$route' (to) {
        if(to.meta.title) {
          document.title = to.meta.title + ' | SCOUTME'
        }
        else {
          document.title = 'SCOUTME'
        }
        this.drawSidebar = to.meta.sidebar
    }
  },
};
</script>

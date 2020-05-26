<template>
  <v-app>

    <TopPage v-if="drawTopPage"/>
    <UserPage v-else/>

  </v-app>
</template>

<script>
import TopPage from '@/views/TopPage'
import UserPage from '@/views/UserPage'

export default {
  name: 'App',

  components: {
    TopPage,
    UserPage
  },

  data: () => ({
    toppage_route: ['About', 'Login', 'Signup']
  }),

  computed: {
    drawTopPage: function() {
      return this.toppage_route.indexOf(this.$router.currentRoute.name) >= 0
    }
  }
};
</script>

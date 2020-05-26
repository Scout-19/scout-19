<template>
  <div class="user-page">
    <v-row>
      <SideBar acount="player"/>

      <v-content>
        <v-container fluid class='pa-10'>
          <router-view/>
        </v-container>
      </v-content>

    </v-row>
  </div>
</template>

<script>
import SideBar from '@/components/SideBar'

export default {
  name: 'UserPage',

  components: {
    SideBar,
  },
};
</script>

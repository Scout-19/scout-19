<template>
  <v-app>

    <v-row>
      <SideBar :items="items"/>

      <v-content>
        <v-container fluid class='pa-10'>
          <router-view/>
        </v-container>
      </v-content>

    </v-row>

  </v-app>
</template>

<script>
import SideBar from '@/components/SideBar'

export default {
  name: 'App',

  components: {
    SideBar,
  },

  data: () => ({
    account: 'player',
    items_table: {
      player: [
          { title: 'プロフィール', icon: 'mdi-account', route: 'Profile' },
          { title: 'メッセージ', icon: 'mdi-email', route: 'Message' },
          { title: 'チーム検索', icon: 'mdi-school', route: 'Search' },
          { title: '設定', icon: 'mdi-cog', route: 'Setting' },
      ],
      scoutman: [
          { title: 'プロフィール', icon: 'mdi-account', route: 'Profile' },
          { title: 'メッセージ', icon: 'mdi-email', route: 'Message' },
          { title: 'プレイヤー検索', icon: 'mdi-charity', route: 'Search' },
          { title: '設定', icon: 'mdi-cog', route: 'Setting' },
      ],
    }
  }),

  computed: {
    items: function() {
      return ( this.account == 'player' ) ? this.items_table.player : this.items_table.scoutman
    },
  },
};
</script>

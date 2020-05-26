<template>
  <div id="app">
    <v-navigation-drawer
      color="primary"
      dark
      app
    >
      <v-list
        dense
        nav
      >
        <v-list-item-group v-model="selected" color="secondery">
          <v-list-item
            class="my-2"
            v-for="item in items"
            :key="item.title"
            link
            @click='$router.push({name: item.route}).catch({})'
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{item.title}}</v-list-item-title>
            </v-list-item-content>
            
          </v-list-item>
        </v-list-item-group>

      </v-list>

    </v-navigation-drawer>

  </div>
</template>

<script>

export default {
  name: 'SideBar',

  props: {
    account: String
  },

  data: () => ({
    selected: 0,

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
}
</script>

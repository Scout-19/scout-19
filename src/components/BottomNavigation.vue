<template>
  <div id="btm-nav">
    <v-bottom-navigation
      v-model="selected"
      color="primary"
      grow
      app
    >
      <v-btn
        height="100%"
        v-for="(item, i) in items"
        :key="i"
        @click='$router.push({name: item.route}, () => {})'
      >
        <span class="overline">{{item.title}}</span>
        <v-icon class="mb-1">{{item.icon}}</v-icon>
      </v-btn>
    </v-bottom-navigation>

  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/firestore'

export default {
  name: 'BottomNavigation',

  data: () => ({
    selected: 0,
    account_type: '',

    nav_table: {
      player: [
          { title: 'プロフィール', icon: 'mdi-account', route: 'Profile' },
          { title: 'メッセージ', icon: 'mdi-email', route: 'Message' },
          { title: 'チーム検索', icon: 'mdi-school', route: 'Search' },
          { title: '設定', icon: 'mdi-cog', route: 'Setting' },
      ],
      scouter: [
          { title: 'プロフィール', icon: 'mdi-account', route: 'Profile' },
          { title: 'メッセージ', icon: 'mdi-email', route: 'Message' },
          { title: 'プレイヤー検索', icon: 'mdi-charity', route: 'Search' },
          { title: '設定', icon: 'mdi-cog', route: 'Setting' },
      ],
    }
  }),

  created() {
    // todo: get from vuex
    // var uid = this.getUid
    var uid = 'dbHIC56klkQ40fkHXYV5g3uMP1J2'

    firebase.firestore().collection('users').doc(uid).get().then(doc => {
      if (doc.exists)
      {
        this.account_type = doc.data().account_type
      }
    }, err => {
      alert(err.message)
    })


  },

  computed: {
    items: function() {
      return ( this.account_type == 'player' ) ? this.nav_table.player : this.nav_table.scouter
    },
  },
}
</script>

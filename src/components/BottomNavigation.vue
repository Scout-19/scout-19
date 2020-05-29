<template>
  <div id="btm-nav">
    <v-progress-linear
      indeterminate
      color="primary"
      v-if="!dataLoaded"
    ></v-progress-linear>

    <v-bottom-navigation
      v-model="selected"
      color="primary"
      grow
      app
      v-else
    >
      <v-btn
        height="100%"
        v-for="(nav, i) in navs"
        :key="i"
        @click='click(nav)'
      >
        <span class="overline">{{nav.title}}</span>
        <v-icon class="mb-1">{{nav.icon}}</v-icon>
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
    dataLoaded: false,

    selected: 0,
    account_type: '',

    nav_table: {
      player: [
          { title: 'プロフィール', icon: 'mdi-account', route: 'Profile' },
          { title: 'メッセージ', icon: 'mdi-email', route: 'Message' },
          { title: 'チーム検索', icon: 'mdi-school', route: 'Search' },
          { title: '動画', icon: 'mdi-filmstrip', route: 'Video' },
          { title: '設定', icon: 'mdi-cog', route: 'Setting' },
      ],
      scouter: [
          { title: 'プロフィール', icon: 'mdi-account', route: 'Profile' },
          { title: 'メッセージ', icon: 'mdi-email', route: 'Message' },
          { title: 'プレイヤー検索', icon: 'mdi-charity', route: 'Search' },
          { title: '動画', icon: 'mdi-filmstrip', route: 'Video' },
          { title: '設定', icon: 'mdi-cog', route: 'Setting' },
      ],
    }
  }),

  created() {
    // apply current route
    for(this.selected = 0; this.selected < this.navs.length; this.selected++) {
      if(this.navs[this.selected].route == this.$router.currentRoute.name) {
        break
      }
    }

    // set initial title
    this.$emit('input', this.navs[this.selected].title)

    // todo: get from vuex
    // var uid = this.getUid
    var uid = 'dbHIC56klkQ40fkHXYV5g3uMP1J2'

    firebase.firestore().collection('users').doc(uid).get().then(doc => {
      if (doc.exists)
      {
        this.account_type = doc.data().account_type
        this.dataLoaded = true
      }
    }, err => {
      alert(err.message)
    })
  },

  computed: {
    navs: function() {
      return ( this.account_type == 'player' ) ? this.nav_table.player : this.nav_table.scouter
    },
  },

  methods: {
    click: function(nav) {
      this.$router.push({name: nav.route}).catch(err => {
        // scroll to top
        if(err.name == 'NavigationDuplicated') {
          window.scrollTo({top: 0, behavior: 'smooth'})
        }
        else {
          console.log(err.message)
        }
      })
      this.$emit('input', nav.title)
    }
  },
}
</script>

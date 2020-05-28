<template>
  <div class="setting">
    <v-container fluid class="pa-5">
      <v-card class="pa-5">
        <v-list>
          <v-subheader>SNS連携</v-subheader>
          <v-list-item>
            <v-switch class="mx-2" label="Twitter"></v-switch>
          </v-list-item>
          <v-list-item>
            <v-switch class="mx-2" label="Facebook"></v-switch>
          </v-list-item>
          <v-list-item>
            <v-switch class="mx-2" label="Google"></v-switch>
          </v-list-item>

          <v-divider class="my-5"></v-divider>

          <v-subheader>通知設定</v-subheader>
          <v-list-item>
            <v-switch v-model="mailNotify" class="mx-2" label="メール通知"></v-switch>
          </v-list-item>

          <v-divider class="my-5"></v-divider>

          <v-subheader>その他</v-subheader>
          <v-list-item @click="$router.push({name: Policy})">
            <v-list-item-title>プライバシーポリシー</v-list-item-title>
            <v-icon>mdi-open-in-new</v-icon>
          </v-list-item>
          <v-list-item @click="$router.push({name: Policy})">
            <v-list-item-title>利用規約</v-list-item-title>
            <v-icon>mdi-open-in-new</v-icon>
          </v-list-item>
          <v-list-item @click="$router.push({name: Policy})">
            <v-list-item-title>お問い合わせ</v-list-item-title>
            <v-icon>mdi-open-in-new</v-icon>
          </v-list-item>
          <v-list-item @click="$router.push({name: Policy})">
            <v-list-item-title>退会</v-list-item-title>
          </v-list-item>

          <v-divider class="my-5"></v-divider>

          <v-list-item>
            <v-btn block @click='logout' color="secondary">ログアウト</v-btn>
          </v-list-item>

        </v-list>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Setting',

  data: () => ({
    mailNotify: true
  }),
  
  computed: {
    ...mapGetters([
      'getUid',
    ]),
  },

  methods: {
    ...mapActions([
      'clearUid',
    ]),

    logout: function() {
      firebase.auth().signOut().then(() => {
        this.$router.push({name: 'Login'})
      }, err => {
        alert(err.message)
      })
    }
  },

  watch: {
    mailNotify: function() {
      // todo: get from vuex
      // var uid = this.getUid
      var uid = 'dbHIC56klkQ40fkHXYV5g3uMP1J2'

      var ref = firebase.firestore().collection('users').doc(uid).collection('profile').doc('private')

      ref.update({email: this.mailNotify}).then(() => {
      }, err => {
        alert(err.message)
      })
    }
  }
}
</script>

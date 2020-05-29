<template>
  <div class="registration">
    <v-container>
      <v-card class="pa-5 mt-5" height=60%>
        <v-card-title
         align='center'
        >
          確認が完了しました。
        </v-card-title>
        <v-card-text>
          ５秒後に自動的にリダイレクトします。<br>
          画面が切り替わらない場合は
          <router-link to="/Profile">こちら</router-link>
          をクリックしてください。
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import firebase from 'firebase/app'
import 'firebase/firestore'

export default {
  name: 'Registration',
  data: () => ({
    redirect_time:5
  }),
  created() {
    // todo: get from vuex
    var uid = this.getUid
    // create_user table to database.
    firebase.firestore().collection('users').doc(uid).set({})
    //redirect profile page
    setInterval(() => { this.redirect_time--}, 1000)
   },
   watch: {
     redirect_time: function(value) {
       if (value <= 0) {
         document.location = "/Profile"
       }
     }
   },
   computed: {
     ...mapGetters([
       'getUid',
     ]),
   },
}
</script>

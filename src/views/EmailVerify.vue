<template>
  <div class="email-verify">
    <v-container>
      <v-card class="pa-5 mt-5">
        <v-row class="ma-1" justify="center">
          <div>アドレス確認用のメールを送信しました</div>
        </v-row>
        <v-row class="ma-1" justify="center">
          <v-btn block color="secondary" @click="resend">もう一度送信</v-btn>
        </v-row>
        <v-row class="ma-1" justify="center">
          <v-btn text color="caption" @click="logout">ログアウト</v-btn>
        </v-row>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  name: 'EmailVerify',

  methods: {
    resend: function() {
      firebase.auth().currentUser.sendEmailVerification({
        url: location.origin + this.$router.resolve({name: 'Registration'}).href,
      })
    },

    logout: function() {
      firebase.auth().signOut().then(() => {
        this.$router.push({name: 'Login'})
      }, err => {
        alert(err.message)
      })
    }
  }
}
</script>

<template>
  <div class="password-reset">
    <v-container>
      <v-row justify="center">
        <h1>パスワードを忘れた方</h1>
      </v-row>

      <v-card class="pa-5 mt-5">
        <v-row class="ma-1">
          <v-btn text class="caption" @click="$router.push({name: 'Login'})">
            <v-icon left>mdi-arrow-left</v-icon>
            <span>戻る</span>
          </v-btn>
        </v-row>

        <v-row class="ma-1" justify="center">
            <v-text-field
              v-model="email"
              :rules="util_emailRules"
              label="メールアドレス"
              required
              outlined
            ></v-text-field>
        </v-row>

        <v-row class="ma-1" v-if="message != ''">
          <p class="error--text overline">{{message}}</p>
        </v-row>

        <v-row class="ma-1" justify="center">
          <v-btn block color="secondary" @click="reset">リセット</v-btn>
        </v-row>

      </v-card>
    </v-container>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  name: 'PasswordReset',

  data: () => ({
    email: '',

    message: '',
  }),

  methods: {
    reset: function() {
      firebase.auth().sendPasswordResetEmail(this.email, {
        url: location.origin + this.$router.resolve({name: 'Profile'}).href,
      }).then(() => {
        this.message = "メールを送信しました。"
      }, err => {
        switch(err.code) {
        case 'auth/invalid-email':
          this.message = 'メールアドレスの形式が無効です。'
          break
        case 'auth/user-disabled':
          this.message = 'ユーザーが無効です。'
          break
        case 'auth/user-not-found':
          this.message = 'ユーザーが見つかりませんでした。'
          break
        case 'auth/wrong-password':
          this.message = 'パスワードが間違っています。'
          break
        default:
          this.message = err.message
          break
        }
      })
    }
  }
}
</script>

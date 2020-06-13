<template>
  <div class="login">

    <v-container>
      <v-row justify="center">
        <h1>ログイン</h1>
      </v-row>

      <v-card class="pa-5 mt-5">
        <v-row class="ma-1" justify="center">
          <v-text-field
            v-model="email"
            :rules="util_emailRules"
            label="メールアドレス"
            required
            outlined
            @keydown.enter="enterKeyDown"
          ></v-text-field>
        </v-row>

        <v-row class="ma-1" justify="center">
          <v-text-field
            v-model="password"
            :rules="util_passwordRules"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            @click:append="showPassword = !showPassword"
            label="パスワード"
            required
            outlined
            @keydown.enter="enterKeyDown"
          ></v-text-field>
        </v-row>

        <v-row class="ma-1" v-if="errorMessage != ''">
          <p class="error--text overline">{{errorMessage}}</p>
        </v-row>

        <v-row class="ma-1" justify="center">
          <v-col>
            <v-btn block color="primary" @click="login">
              ログイン
            </v-btn>
          </v-col>
          <v-col>
            <v-btn block outlined @click="$router.push({name: 'Signup'})">
              新規登録の方はこちら
            </v-btn>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-btn text class="caption" @click="$router.push({name: 'PasswordReset'})">
            パスワードをお忘れですか？
          </v-btn>

          <v-btn text class="caption" @click="testLogin">
            テスト用ログイン
          </v-btn>

        </v-row>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'

import { mapGetters } from 'vuex'

export default {
  name: 'Login',

  data: () => ({
    email: '',

    password: '',
    showPassword: false,

    errorMessage: ''
  }),

  created() {
    // already logged in
    if(this.auth) {
      this.routeNext()
    }
  },

  computed: {
    ...mapGetters([
      'auth',
    ]),
  },

  methods: {

    // !!! test loging !!!
    testLogin: function() {
      this.email = 't2k.0207@gmail.com'
      this.password = '00000000'
      this.login()
    },

    enterKeyDown: function(e) {
      // enter key (zenkaku = 229)
      if(e.keyCode == 13) {
        this.login()
      }
    },

    login: function() {
      // clear
      this.errorMessage = ''

      // email rule
      for(let i = 0; i < this.util_emailRules.length; i++) {
        let ret = this.util_emailRules[i](this.email)
        if( ret != true ) {
          this.errorMessage = ret
          return
        }
      }

      // password rule
      for(let i = 0; i < this.util_passwordRules.length; i++) {
        let ret = this.util_passwordRules[i](this.password)
        if( ret != true ) {
          this.errorMessage = ret
          return
        }
      }

      // auth
      // https://firebase.google.com/docs/reference/js/firebase.auth.Auth
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(() => {
        this.routeNext()
      }, err => {
        switch(err.code) {
          case 'auth/invalid-email':
            this.errorMessage = 'メールアドレスの形式が無効です。'
            break
          case 'auth/user-disabled':
            this.errorMessage = 'ユーザーが無効です。'
            break
          case 'auth/user-not-found':
            this.errorMessage = 'ユーザーが見つかりませんでした。'
            break
          case 'auth/wrong-password':
            this.errorMessage = 'パスワードが間違っています。'
            break
          default:
            this.errorMessage = err.message
            break
        }
      })
    },

    routeNext: function() {
      // redirect
      if(this.$route.query.redirect) {
        this.$router.push({name: this.$route.query.redirect})
      }
      else {
        this.$router.push({name: 'Profile'})
      }
    },
  }
}
</script>>

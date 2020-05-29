<template>
  <div class="signup">

    <v-container>
      <v-row justify="center">
        <h1>新規登録</h1>
      </v-row>

      <v-card class="pa-5 mt-5">
        <v-row class="ma-1" justify="center">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="メールアドレス"
            required
            outlined
          ></v-text-field>
        </v-row>

        <v-row class="ma-1" justify="center">
          <v-text-field
            v-model="password"
            :rules="passwordRules"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            @click:append="showPassword = !showPassword"
            label="パスワード"
            required
            outlined
          ></v-text-field>
        </v-row>

        <v-row class="ma-1" justify="center">
          <v-text-field
            v-model="password2"
            :rules="passwordRules"
            :append-icon="showPassword2 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword2 ? 'text' : 'password'"
            @click:append="showPassword2 = !showPassword2"
            label="パスワード (確認用)"
            required
            outlined
          ></v-text-field>
        </v-row>

        <v-row class="ma-1" v-if="errorMessage != ''">
          <p class="error--text overline">{{errorMessage}}</p>
        </v-row>

        <v-row class="ma-1" justify="center">
          <v-col>
            <v-btn block color="primary" @click="signup">
              登録
            </v-btn>
          </v-col>
          <v-col>
            <v-btn block outlined @click="$router.push({name: 'Login'})">
              既にアカウントをお持ちの方はこちら
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

import { mapGetters } from 'vuex'

export default {
  name: 'Signup',

  data: () => ({
    email: '',
    emailRules: [
      v => !!v || 'メールアドレスを入力してください。',
      v => /.+@.+\..+/.test(v) || 'メールアドレスの形式が無効です。',
    ],

    password: '',
    password2: '',
    passwordRules: [
      v => !!v || 'パスワードを入力してください。',
      v => v.length >= 8 || 'パスワードを8文字以上で入力してください。',
    ],
    showPassword: false,
    showPassword2: false,

    errorMessage: ''
  }),

  created() {
    // already logged in
    if(this.auth) {
      if(this.$route.query.redirect) {
        this.$router.push({name: this.$route.query.redirect})
      }
      else {
        this.$router.push({name: 'Profile'})
      }
    }
  },

  computed: {
    ...mapGetters([
      'auth',
    ]),
  },

  methods: {
    signup: function() {
      // clear
      this.errorMessage = ''

      // email rule
      for(let i = 0; i < this.emailRules.length; i++) {
        let ret = this.emailRules[i](this.email)
        if( ret != true ) {
          this.errorMessage = ret
          return
        }
      }

      // password rule
      for(let i = 0; i < this.passwordRules.length; i++) {
        let ret = this.passwordRules[i](this.password)
        if( ret != true ) {
          this.errorMessage = ret
          return
        }
      }

      // password configure
      if(this.password != this.password2) {
        this.errorMessage = 'パスワードが一致しません。'
        return
      }

      // try auth
      // https://firebase.google.com/docs/reference/js/firebase.auth.Auth
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then( () => {
        // send email
        firebase.auth().currentUser.sendEmailVerification({
          url: location.origin + this.$router.resolve({name: 'Registration'}).href,
        })
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
          case 'auth/email-already-in-use':
            this.errorMessage = '登録済みのメールアドレスです。'
            break
          default:
            this.errorMessage = err.message
            break
        }
      })
    }
  }
}
</script>

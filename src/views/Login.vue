<template>
  <div class="login">

    <v-container>
        <v-row justify="center">
          <h1>ログイン</h1>
        </v-row>

        <v-card class="pa-5 mt-5">
          <v-col>
            <v-row class="ma-1" justify="center">
              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="メールアドレス"
                required
                outlined
                @keydown.enter="enterKeyDown"
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
                @keydown.enter="enterKeyDown"
              ></v-text-field>
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
          </v-col>
        </v-card>
    </v-container>
  </div>
</template>

<script>
import firebase from 'firebase/app'

import { mapGetters } from 'vuex'

export default {
  name: 'Login',
  title: 'ログイン',

  data: () => ({
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],

    password: '',
    passwordRules: [
      v => !!v || 'Password is required',
      v => v.length >= 8 || 'Min 8 characters',
    ],
    showPassword: false
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
    enterKeyDown: function(e) {
      // enter key (zenkaku = 229)
      if(e.keyCode == 13) {
        this.login()
      }
    },

    login: function() {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(() => {
        this.routeNext()
      }, err => {
        alert(err.message)
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

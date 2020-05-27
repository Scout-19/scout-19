<template>
  <div class="signup">

    <v-container>
        <v-row justify="center">
          <h1>新規登録</h1>
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
          </v-col>
        </v-card>
    </v-container>
  </div>
</template>

<script>
import firebase from 'firebase/app'

import { mapGetters } from 'vuex'

export default {
  name: 'Signup',

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
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(() => {
        // todo: input detail user info
        this.$router.push({name: '/'})
      }, err => {
        alert(err.message)
      })
    }
  }
}
</script>

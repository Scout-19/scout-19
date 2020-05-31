<template>
  <div class="setting">
    <v-container fluid class="pa-5">
      <v-card class="pa-5">
        <v-list>
          <v-subheader>登録情報変更</v-subheader>

          <v-list-item @click="changeEmailOpen">
            <v-list-item-title>メールアドレス変更</v-list-item-title>
            <v-icon>mdi-pencil</v-icon>
          </v-list-item>
          <v-list-item v-if="changeEmail">
            <v-text-field
              v-model="email"
              class="mr-10"
              :rules="util_emailRules"
              required
            >
            </v-text-field>
          </v-list-item>
          <v-list-item v-if="changeEmail">
            <v-btn color="primary" class="mr-5" @click="changeEmalRequest">変更</v-btn>
            <v-btn color="primary" outlined @click="changeEmail = false">キャンセル</v-btn>
          </v-list-item>
          <v-list-item v-if="changeEmailMessage.length > 0">
            <v-list-item-title :class="changeEmailSuccess ? 'primary--text' : 'error--text'" class="caption">{{changeEmailMessage}}</v-list-item-title>
          </v-list-item>


          <v-list-item @click="changePasswordOpen">
            <v-list-item-title>パスワード変更</v-list-item-title>
            <v-icon>mdi-pencil</v-icon>
          </v-list-item>
          <v-list-item v-if="changePassword">
            <v-text-field
              v-model="password"
              class="mr-10"
              :rules="util_passwordRules"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
              @click:append="showPassword = !showPassword"
              required
              label="パスワード"
            >
            </v-text-field>
          </v-list-item>
          <v-list-item v-if="changePassword">
            <v-text-field
              v-model="password2"
              class="mr-10"
              :rules="util_passwordRules"
              :append-icon="showPassword2 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword2 ? 'text' : 'password'"
              @click:append="showPassword2 = !showPassword2"
              required
              label="パスワード (確認用)"
            >
            </v-text-field>
          </v-list-item>
          <v-list-item v-if="changePassword">
            <v-btn color="primary" class="mr-5" @click="changePasswordRequest">変更</v-btn>
            <v-btn color="primary" outlined @click="changePassword = false">キャンセル</v-btn>
          </v-list-item>
          <v-list-item v-if="changePasswordMessage.length > 0">
            <v-list-item-title :class="changePasswordSuccess ? 'primary--text' : 'error--text'" class="caption">{{changePasswordMessage}}</v-list-item-title>
          </v-list-item>

          <v-divider class="my-5"></v-divider>

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
          <v-list-item @click="openWidhNewWindow('PrivacyPolicy')">
            <v-list-item-title>プライバシーポリシー</v-list-item-title>
            <v-icon>mdi-open-in-new</v-icon>
          </v-list-item>
          <v-list-item @click="openWidhNewWindow('Terms')">
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

import { mapGetters } from 'vuex'

export default {
  name: 'Setting',

  data: () => ({
    mailNotify: true,

    changeEmail: false,
    changeEmailMessage: '',
    changeEmailSuccess: true,
    email: '',

    changePassword: false,
    changePasswordMessage: '',
    changePasswordSuccess: true,
    password: '',
    password2: '',
    showPassword: false,
    showPassword2: false,

  }),

  computed: {
    ...mapGetters([
      'getUid',
      'getEmail',
    ]),
  },

  methods: {

    openWidhNewWindow: function(name) {
      var route = this.$router.resolve({name: name});
      window.open(route.href, '_blank');
    },

    logout: function() {
      firebase.auth().signOut().then(() => {
        this.$router.push({name: 'Login'})
      }, err => {
        alert(err.message)
      })
    },

    changeEmailOpen: function() {
      this.email = this.getEmail
      this.changeEmail = true
      this.changeEmailMessage = ''
    },

    changePasswordOpen: function() {
      this.password = ''
      this.password2 = ''
      this.changePassword = true
      this.changePasswordMessage = ''
    },

    changeEmalRequest: function() {

      // email rule
      for(let i = 0; i < this.util_emailRules.length; i++) {
        let ret = this.util_emailRules[i](this.email)
        if( ret != true ) {
          this.changeEmailMessage = ret
          this.changeEmailSuccess = false
          return
        }
      }

      // change email
      firebase.auth().currentUser.updateEmail(this.email).then(() => {
        this.changeEmailMessage = "メールアドレスの変更に成功しました。"
        this.changeEmailSuccess = true
        this.changeEmail = false
      }, err => {
        this.changeEmailMessage = err.message
        this.changeEmailSuccess = false
      });
    },

    changePasswordRequest: function() {
      // password rule
      for(let i = 0; i < this.util_passwordRules.length; i++) {
        let ret = this.util_passwordRules[i](this.password)
        if( ret != true ) {
          this.changePasswordMessage = ret
          this.changePasswordSuccess = false
          return
        }
      }

      // password configure
      if(this.password != this.password2) {
        this.changePasswordMessage = 'パスワードが一致しません。'
        this.changePasswordSuccess = false
        return
      }

      // change password
      firebase.auth().currentUser.updatePassword(this.password).then(() => {
        this.changePasswordMessage = "パスワードの変更に成功しました。"
        this.changePasswordSuccess = true
        this.changePassword = false
      }, err => {
        this.changePasswordMessage = err.message
        this.changePasswordSuccess = false
      });
    }
  },

  watch: {
    mailNotify: function() {
      // todo: get from vuex
      // var uid = this.getUid
      var uid = 'dbHIC56klkQ40fkHXYV5g3uMP1J2'

      var ref = firebase.firestore().collection('users').doc(uid).collection('profile').doc('private')

      ref.update({email_notify: this.mailNotify}).then(() => {
      }, err => {
        alert(err.message)
      })
    }
  }
}
</script>

<template>
  <div class="about">
    <v-app-bar
      color="primary"
      dark
    >
      <v-toolbar-title>SCOUTME</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn
        outlined
        class="ma-1"
        @click="$router.push({name: 'Login'}).catch({})"
      >
        ログイン
      </v-btn>

      <v-btn
        outlined
        class="ma-1"
        @click="$router.push({name: 'Signup'}).catch({})"
      >
        新規登録
      </v-btn>

      <v-btn
        outlined
        class="ma-1"
        @click="$router.push({name: 'Signup'}).catch({})"
      >
        スカウト関係者はこちら
      </v-btn>
    </v-app-bar>

    
  </div>
</template>

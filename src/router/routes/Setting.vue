<template>
  <div class="setting">
    <h2 class="mb-5">設定</h2>

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
          <v-btn block>ログアウト</v-btn>
        </v-list-item>

      </v-list>
    </v-card>
  </div>
</template>

<script>

export default {
  name: 'Setting',

  data: () => ({
    mailNotify: true
  })
}
</script>

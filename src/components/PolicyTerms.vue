<template>
  <div class="policy-terms">
    <v-container>
      <v-row justify="center">
        <h1>{{title}}</h1>
      </v-row>

      <v-card outlined class="pa-5 mt-5">
        <h3 class="pa-5">当社は，本ウェブサイト上で提供するサービス（以下,「本サービス」といいます。）における，ユーザーの個人情報の取扱いについて，以下のとおりプライバシーポリシー（以下，「本ポリシー」といいます。）を定めます。</h3>
        <v-list>
          <div
            v-for="(c, i) in content"
            :key="i"
            class="my-5"
          >
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="font-weight-bold body-1">{{c.title}}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>

            <v-list-item>
              <v-list-item-content>
                <p
                  v-for="(line, j) in c.lines"
                  :key="j"
                  class="body-2"
                >
                {{line}}
                </p>
              </v-list-item-content>
            </v-list-item>
          </div>
        </v-list>
      </v-card>

    </v-container>
  </div>
</template>

<script>

export default {
  name: 'PolicyTerms',

  props: {
    title: String,
    content: Array
  }
}
</script>
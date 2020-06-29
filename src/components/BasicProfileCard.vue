<template>

  <div>
    <v-hover v-slot:default="{ hover }">
      <v-card max-width="344"
              class="ma-3 pa-6"
              outlined
              tile
              :elevation="hover ? 16 : 2"
              @click.stop="go_to_the_player_profile_page()">
        <v-list-item three-line>
          <v-img class="white--text align-end"
                 v-if="profile.icon"
                 height="200px"
                 :src="profile.icon">
          </v-img>
          <v-icon v-else height="200px">
            mdi-account-circle
          </v-icon>
        </v-list-item>

        <v-card-title>{{profile.last_name}}{{profile.first_name}}</v-card-title>

        <v-card-text class="text--primary">
          <div>場所: {{profile.location}}</div>
          <div>年齢: {{profile.age}}</div>
          <div>
            ポジション
          </div>
          <v-chip class="ma-1"
                  v-for="(position, i) in profile.positions"
                  :key="i">
            {{position}}
          </v-chip>
        </v-card-text>
      </v-card>
    </v-hover>
  </div>

</template>

<script>

  export default {
    name: 'BasicProfileCard',

    props: {
      profile: Object
    },
    data: () => ({}),
    methods: {
      go_to_the_player_profile_page() {
        console.log(this.profile)
        this.$router.push({ name: 'Profile', params: { uid: this.profile.uid } }, () => {})
      }
    }
  }

</script>

<style>

</style>

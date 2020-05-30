<template>
  <div class="basic-profile">
    <v-card class='pa-5'>
      <v-list-item>
        <v-list-item-avatar
          size="90"
        >
          <img
            :src="icon"
            v-if="icon"
          >
          <v-icon
            v-else
            size="90"
          >
            mdi-account-circle
          </v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title class="headline">{{name}}</v-list-item-title>
          <v-list-item-subtitle class="subtitle-1">{{sports}}</v-list-item-subtitle>
          <v-list-item-subtitle>
            <v-icon>mdi-map-marker</v-icon>
            <span class="caption">{{location}}</span>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-card-text>{{bio}}</v-card-text>

    </v-card>
  </div>
</template>

<script>

export default {
  name: 'BasicProfile',

  props: {
    icon: String,
    name: String,
    sports: String,
    location: String,
    bio: String
  }

}
</script>

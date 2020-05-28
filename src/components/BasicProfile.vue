<template>
  <div class="basic-profile">
    <v-card class='pa-5'>
      <v-list-item>
        <v-list-item-avatar
          size="80"
          color="grey"
        >
          <img :src="icon">
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title class="headline">{{name}}</v-list-item-title>
          <v-list-item-subtitle class="subtitle-1">{{sports}}</v-list-item-subtitle>

          <v-row no-gutters>
            <v-col>
              <v-row justify="end" align="center">
                <v-icon>mdi-map-marker</v-icon>
              </v-row>
            </v-col>
            <v-col>
              <v-row justify="start" align="start">
                <v-card-text class=".caption">{{location}}</v-card-text>
              </v-row>
            </v-col>
          </v-row>
        </v-list-item-content>
      </v-list-item>

      <v-card-text class="body-2">{{bio}}</v-card-text>

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

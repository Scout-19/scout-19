<template>
  <div class="basic-profile">
    <v-card
      class='pa-5'
    >
      <v-col>
        <v-row>
          <v-avatar size="64">
            <img :src="icon">
          </v-avatar>

          <v-col>
            <p>{{sports}}</p>
            <h2>{{name}}</h2>
          </v-col>
        </v-row>
        
        <v-row>
          <v-icon>mdi-map-marker</v-icon>
          <p>{{location}}</p>
        </v-row>

        <v-row>
          <p>{{bio}}</p>
        </v-row>
      </v-col>
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

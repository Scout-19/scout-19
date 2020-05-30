<template>
  <div class="basic-video-frame">
    <v-card
      class="mx-auto"
      max-width="344"
      outlined
    >
    <v-card-text>
      <v-avatar
        left
        size="30"
      >
        <img :src="icon">
      </v-avatar>
      {{name}}
    </v-card-text>
      <v-list-item three-line>
        <v-img
        class="white--text align-end"
        height="200px"
        :src="thumbnail"
        >
      </v-img>
      </v-list-item>

      <v-card-actions>
        <v-btn text
        color="blue"
        x-small
        v-for="(hash_tag, key) in hash_tags" :key="key">
        {{hash_tag}}
        </v-btn>
      </v-card-actions>
      <v-card-text v-text="video_title" argin="center"></v-card-text>
      <v-card-actions>
        <v-btn icon small>
            <v-icon>mdi-thumb-up</v-icon>
        </v-btn>
        {{good}}
        <v-btn icon small>
          <v-icon>mdi-clipboard-text-outline</v-icon>
        </v-btn>
        {{comment}}
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>

export default {
  name: 'BasicVideoFrame',

  props: {
    icon: String,
    name: String,
    video_title: String,
    video_path: String,
    good: String,
    comment: String,
    hash_tags:Array,
    thumbnail:String
  }

}
</script>

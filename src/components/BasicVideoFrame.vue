<template>

  <div>
    <v-hover v-slot:default="{ hover }">
      <v-card max-width="344"
              class="ma-3 pa-6"
              outlined
              tile
              :elevation="hover ? 16 : 2"
              >
        <v-card-text
          @click.stop="go_to_the_player_profile_page()"
        >
          <v-avatar left
                    size="30">
            <img :src="icon" v-if="icon">
            <v-icon v-else>mdi-account-circle</v-icon>
          </v-avatar>
          {{name}}
        </v-card-text>
        <v-list-item three-line>
          <v-img class="white--text align-end"
                 height="200px"
                 :src="thumbnail_refs[0]"
                 @click.stop="show_detail()">
          </v-img>
        </v-list-item>

        <v-card-actions>
          <v-btn text
                 color="blue"
                 x-small
                 v-for="(hash_tag, key) in hash_tags"
                 :key="key"
                 @click.stop="$emit('search', hash_tag)">
            {{hash_tag}}
          </v-btn>
        </v-card-actions>
        <v-card-title v-text="title" argin="left"></v-card-title>
        <v-card-text v-text="overview" argin="left"></v-card-text>
        <v-card-actions>
          <v-icon>mdi-thumb-up</v-icon>
          {{good}}
        </v-card-actions>
      </v-card>
    </v-hover>
    <v-row>
      <v-dialog content-class="video-dialog"
                v-model="dialog"
                height=80%
                width=80%
                persistent
                no-click-animation>
        <v-card class="ma-3 pa-6" outlined tile>
          <v-card-text
            @click.stop="go_to_the_player_profile_page()"
          >
            <v-avatar left
                      size="30">
              <img :src="icon" v-if="icon">
              <v-icon v-else>mdi-account-circle</v-icon>
            </v-avatar>
            {{name}}
            <v-btn
              @click.stop="close_dialog()"
              absolute
              right
              icon
              large
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-text>
          <v-list-item three-line>
            <video ref="video"
                   :src="video_ref"
                   controls
                   width=100%
                   height=100%>
      </video>
          </v-list-item>

          <v-card-actions>
            <v-btn text
                   color="blue"
                   x-small
                   v-for="(hash_tag, key) in hash_tags"
                   :key="key">
              {{hash_tag}}
            </v-btn>
          </v-card-actions>
          <v-card-title v-text="title" argin="left"></v-card-title>
          <v-card-text v-text="overview" argin="left"></v-card-text>
          <v-card-actions>
            <v-btn icon small>
              <v-icon>mdi-thumb-up</v-icon>
            </v-btn>
            {{good}}
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>

</template>

<script>

  export default {
    name: 'BasicVideoFrame',

    props: {
      icon: String,
      name: String,
      title: String,
      video_ref: String,
      good: Number,
      hash_tags: Array,
      thumbnail_refs: Array,
      overview: String,
      posting_date: Date,
      contributor: String
    },
    data: () => ({
      dialog: false
    }),
    methods: {
      show_detail() {
        this.dialog = true
        return
      },
      close_dialog() {
        this.dialog = false
        this.$refs.video.pause()
      },
      go_to_the_player_profile_page() {
        this.contributor
        this.$router.push({name: 'Profile', params: { uid: this.contributor }}, () => {})
      }
    }
  }

</script>

<style>

  .video-dialog {
    overflow-x: hidden;
    max-height: 85% !important;
    box-shadow: none !important;
  }

</style>

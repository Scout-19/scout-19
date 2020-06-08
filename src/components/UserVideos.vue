<template>

  <div class="user-videos">
    <v-card class='pa-5'>

      <v-col>
        <v-row class="mb-3">
          <span class="headline">動画</span>
        </v-row>

        <v-carousel cycle
                    height="400"
                    hide-delimiter-background
                    show-arrows-on-hover>
          <v-carousel-item v-for="(video, i) in videos"
                           :key="i">
              <v-card
    class="mx-auto"
    max-width="400"
  >
    <v-img
      class="white--text"
      :src="video.thumbnail_refs[0]"
      v-if="!play"
      absolute
    >
    <v-btn
      fab
      large
      color='primary'
      @click="play=!play"
      class="play-button"
    >
      <v-icon dark>mdi-play</v-icon>
    </v-btn>
    </v-img>
    <video v-else v-bind:src="video.ref" v-video="play"></video>
    <v-card-title>{{video.title}}</v-card-title>
    <v-card-actions>
      <v-btn icon small>
          <v-icon>mdi-thumb-up</v-icon>
      </v-btn>
      {{video.good}}
    </v-card-actions>
    <v-card-subtitle class="pb-0">{{video.overview}}</v-card-subtitle>
    </v-card>
          </v-carousel-item>
        </v-carousel>

      </v-col>
    </v-card>
  </div>

</template>

<script>
  export default {
    name: 'UserVideos',
    data: () => ({
      play:false
    }),
    props: {
      videos: Array,
    },
     directives: {
          video(el, binding){
              binding.value ? el.play() : el.pause();
          }
      },
    created() {
      console.log(this.videos.length)
    }
  }

</script>

<style scoped>
.play-button {
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%,-50%);
}
</style>

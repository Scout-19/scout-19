<template>
  <div class="video">
    <v-container>
      <BasicVideoFrame
      class='pb-5'
      :icon='icon'
      :name='name'
      :video_path='video_path'
      :video_title='video_title'
      :good='good'
      :comment='comment'
      :hash_tags='hash_tags'
      :thumbnail='thumbnail'
      />
    </v-container>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'

import BasicVideoFrame from '@/components/BasicVideoFrame.vue'


export default {
  name: 'Movie',

  components: {
    BasicVideoFrame,
  },

  data: () => ({
    dataLoaded: false,

    icon: 'https://randomuser.me/api/portraits/women/4.jpg',
    name: 'NAME',
    video_title: 'TITLE',
    video_path: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg',
    good: '100',
    comment: '10',
    hash_tags: ['#tag', '#tag', '#tag'],
    thumbnail: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg'
  }),

  created() {
    // todo: get from vuex
    // var uid = this.getUid
   },

  computed: {
    ...mapGetters([
      'getUid',
    ]),
  },
}
</script>

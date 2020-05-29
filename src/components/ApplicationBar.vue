<template>
  <div class="app-bar">
    <v-app-bar
      color="primary"
      dark
      dense
      app
      max-height="48px"
    >
      <v-spacer></v-spacer>

      <v-toolbar-title
        class="font-weight-bold subtitle-1"
        @click="scroll"
      >
      {{title}}
      </v-toolbar-title>

      <v-spacer></v-spacer>
    </v-app-bar>

    
  </div>
</template>


<script>
export default {
  name: 'ApplicationBar',

  props: {
    title: String
  },

  methods: {
    scroll: function() {
      window.scrollTo({top: 0, behavior: 'smooth'})
    }
  }

};
</script>


<template>
  <div class="career">
    <v-card class='pa-5'>

      <v-col>
        <v-row class="mb-3">
          <span class="headline">略歴</span>
        </v-row>

        <v-data-table
          :headers="headers"
          :items="careers"
          mobile-breakpoint=""
          hide-default-footer
          disable-sort
        >
        </v-data-table>

      </v-col>
      
    </v-card>
  </div>
</template>

<script>

export default {
  name: 'Career',

  props: {
    careers: Array,
  },

  data: () => ({
    headers: [
      { text: '年', value: 'year' },
      { text: '月', value: 'month' },
      { text: '内容', value: 'content' },
    ],
  }),

}
</script>

<template>
  <div class="career">
    <v-card
      class='pa-5'
    >
      <v-col>
        <v-row>
          <h2>略歴</h2>
        </v-row>

        <v-row>
          <v-list-item
            v-for="(career, i) in careers"
            :key="i"
          >
            <v-list-item-content>
              <v-list-item-title>{{career.content}}</v-list-item-title>
              <v-list-item-subtitle class='overline'>{{util_getDateString(career.start)}}-{{util_getDateString(career.end)}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-row>

      </v-col>
    </v-card>
  </div>
</template>

<script>

export default {
  name: 'Career',

  props: {
    careers: Array,
  }
  
}
</script>

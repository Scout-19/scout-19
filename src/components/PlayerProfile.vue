<template>
  <div class="player-profile">
    <v-card class='pa-5'>

      <v-col>
        <v-row class="mb-3">
          <span class="headline">プレイヤー情報</span>
        </v-row>

        <v-row no-gutters class="mb-1">
          <v-col cols="4" sm='3' lg="2" xl="1" class="mr-2">
            <v-card class="justify-center" dark color="secondary">
              <v-row justify="center">生年月日</v-row>
            </v-card>
          </v-col>
          <v-col>{{util_getDateString(birthday)}} ({{util_getAge(birthday)}})</v-col>
        </v-row>

        <v-row no-gutters class="mb-1">
          <v-col cols="4" sm='3' lg="2" xl="1" class="mr-2">
            <v-card class="justify-center" dark color="secondary">
              <v-row justify="center">性別</v-row>
            </v-card>
          </v-col>
          <v-col>{{sex}}</v-col>
        </v-row>

        <v-row no-gutters class="mb-1">
          <v-col cols="4" sm='3' lg="2" xl="1" class="mr-2">
            <v-card class="justify-center" dark color="secondary">
              <v-row justify="center">身長/体重</v-row>
            </v-card>
          </v-col>
          <v-col>{{height}}cm / {{weight}}kg</v-col>
        </v-row>

        <v-row no-gutters class="mb-1">
          <v-col cols="4" sm='3' lg="2" xl="1" class="mr-2">
            <v-card class="justify-center" dark color="secondary">
              <v-row justify="center">利き手/利き足</v-row>
            </v-card>
          </v-col>
          <v-col>{{dominant.hand}}手 / {{dominant.leg}}足</v-col>
        </v-row>

      </v-col>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'PlayerProfile',

  props: {
    birthday: Date,
    sex: String,
    height: Number,
    weight: Number,
    dominant: Object
  },
}
</script>

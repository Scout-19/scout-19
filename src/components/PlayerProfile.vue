<template>
  <div class="player-profile">
    <v-card
      class='pa-5'
    >
      <v-col>
        <v-row>
          <h2>プレイヤー情報</h2>
        </v-row>

        <v-row>
          <p>生年月日</p>
          <p>{{util_getDateString(birthday)}} ({{util_getAge(birthday)}})</p>
        </v-row>

        <v-row>
          <p>性別</p>
          <p>{{sex}}</p>
        </v-row>

        <v-row>
          <p>身長/体重</p>
          <p>{{height}}cm/{{weight}}kg</p>
        </v-row>

        <v-row>
          <p>利き手/利き足</p>
          <p>{{dominant.hand}}/{{dominant.leg}}</p>
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

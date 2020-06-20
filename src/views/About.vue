<template>
  <div class="about">

    <div class="top">
      <v-img
        src="https://yaita-chuo.com/wp-content/uploads/2017/04/img_11-3.jpg"
        aspect-ratio="2.35"
        gradient="to top, rgba(0,0,0,.66), rgba(0,0,0,.33)"
      />
      <div>
        <p :class="subtitleFontSize" class="service-subtitle font-weight-bold" :style="subtitleTop">選手・スカウトのマッチングプラットフォーム</p>
        <p :class="titleFontSize" class="service-title font-italic font-weight-medium">ScoutMe</p>
      </div>
    </div>

    <v-container class="mt-10">

      <v-row>
        <v-col>
          <v-row justify="center">
            <p class="secondary--text text-center display-1 font-weight-black">選手の方へ</p>
          </v-row>

          <v-row justify="center">
            <p>選手の方のスポーツ活動を支援します。</p>
          </v-row>

          <v-row justify="center">
            <v-btn
              class="ma-5"
              color="primary"
              outlined
              @click="$router.push({name: 'Login'})"
            >
              選手のログイン・新規登録はこちら
            </v-btn>
          </v-row>

          <v-row>
            <v-divider class="ma-10"/>
          </v-row>

          <v-row justify="center">
            <p class="secondary--text text-center display-1 font-weight-black">スカウト関係者の方へ</p>
          </v-row>

          <v-row justify="center">
            <p>スカウト関係者の活動を支援します。</p>
          </v-row>

          <v-row justify="center">
            <v-btn
              class="ma-5"
              color="primary"
              outlined
            >
              スカウト関係者はこちら
            </v-btn>
          </v-row>

        </v-col>
      </v-row>

    </v-container>


  </div>
</template>

<script>
export default {

  name: "About",

  computed: {
    titleFontSize: function() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return 'display-3'
        default: return 'display-4'
      }
    },
    subtitleFontSize: function() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return 'overline'
        case 'sm': return 'caption'
        case 'md': return 'subtitle-2'
        default: return 'title'
      }
    },
    subtitleTop: function() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return 'top: 35%;'
        case 'sm': return 'top: 35%;'
        case 'md': return 'top: 38%;'
        default: return 'top: 40%;'
      }
    }
  },
}
</script>

<style scoped>

.top {
  position: relative;
}

.service-title {
  position: absolute;
  top: 50%;
  left: 50%;
  color: white;
  -ms-transform: translate(-50%,-50%);
  -webkit-transform: translate(-50%,-50%);
  transform: translate(-50%,-50%);
  margin:0;
  padding:0;
}
.service-subtitle {
  position: absolute;
  width: fit-content;
  left: 50%;
  color: white;
  -ms-transform: translate(-50%,-50%);
  -webkit-transform: translate(-50%,-50%);
  transform: translate(-50%,-50%);
  margin:0;
  padding:0;
}

</style>

import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: colors.red.darken3,
        secondary: colors.blueGrey.darken3,
        background: colors.grey.lighten4,
      },
    },
  },
});

export default {
  methods: {

    util_getAge: function(birthday) {
      const bdy = birthday.getFullYear().toString().padStart(4, '0');
      const bdm = (birthday.getMonth() + 1).toString().padStart(2, '0');
      const bdd = birthday.getDate().toString().padStart(2, '0');

      var today = new Date();
      const tdy = today.getFullYear().toString().padStart(4, '0');
      const tdm = (today.getMonth() + 1).toString().padStart(2, '0');
      const tdd = today.getDate().toString().padStart(2, '0');

      return Math.floor((Number(tdy + tdm + tdd) - Number(bdy + bdm + bdd)) / 10000);
    },

    util_getDateString: function(datetime) {
      const y = datetime.getFullYear()
      const m = datetime.getMonth() + 1
      const d = datetime.getDate()
      return y.toString().padStart(4, '0') + '/' + m.toString().padStart(2, '0') + '/' + d.toString().padStart(2, '0')
    },

    util_getTimeString: function(datetime) {
      const h = datetime.getHours()
      const m = datetime.getMinutes()
      return h.toString().padStart(2, '0') + ':' + m.toString().padStart(2, '0')
    },

    util_getDateTimeString: function(datetime) {
      return this.util_getDateString(datetime) + ' ' + this.util_getTimeString(datetime)
    },
  },

}
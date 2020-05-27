export default {
  methods: {

    util_getAge: (birthday) =>
    {
      const bdy = birthday.getFullYear().toString().padStart(4, '0');
      const bdm = (birthday.getMonth() + 1).toString().padStart(2, '0');
      const bdd = birthday.getDate().toString().padStart(2, '0');

      var today = new Date();
      const tdy = today.getFullYear().toString().padStart(4, '0');
      const tdm = (today.getMonth() + 1).toString().padStart(2, '0');
      const tdd = today.getDate().toString().padStart(2, '0');

      return Math.floor((Number(tdy + tdm + tdd) - Number(bdy + bdm + bdd)) / 10000);
    },

    util_getDateString: (date) => 
    {
      return date.year.toString().padStart(4, '0') + '/' + date.month.toString().padStart(2, '0') + '/' + date.day.toString().padStart(2, '0')
    },

    util_getTimeString: (time) => 
    {
      return time.hour.toString().padStart(2, '0') + ':' + time.minutes.toString().padStart(2, '0')
    },
  },

}
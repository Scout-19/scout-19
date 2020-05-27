<template>
  <div class="message">

    <h2 class="mb-5">メッセージ</h2>

    <v-row>

      <v-list dense>
        <v-list-item-group v-model="selected" color="primary">

          <v-list-item
            v-for="(chat, i) in chatrooms"
            :key="i"
            @click="$router.push({name: 'MessageUser', params: {user: chat.user.name}}, () => {})"
          >
            <v-list-item-avatar>
              <img :src="chat.user.icon">
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{chat.user.name}}</v-list-item-title>
              <v-list-item-subtitle>{{chat.log.slice(-1)[0].content}}</v-list-item-subtitle>
              <v-list-item-subtitle class='overline'>{{util_getDateString(chat.log.slice(-1)[0].date)}} {{util_getTimeString(chat.log.slice(-1)[0].time)}}</v-list-item-subtitle>
            </v-list-item-content>

          </v-list-item>
        </v-list-item-group>

      </v-list>

      
      <v-col class="pl-10">
        <!-- message log -->
        <v-row
          v-for="(log, i) in selectedLog"
          :key="i"
          :justify="(log.sender == 'you') ? 'start' : 'end'"
        >
          <v-list>

            <v-row>
              <v-list-item-avatar v-if="log.sender == 'you'">
                <img :src="selectedUser.icon">
              </v-list-item-avatar>

              <v-col>

                <v-card class="py-1 px-2" v-if="log.sender == 'you'">{{log.content}}</v-card>
                <v-card class="py-1 px-2" v-else dark color="primary">{{log.content}}</v-card>

                <div class='overline'>{{util_getDateString(log.date)}} {{util_getTimeString(log.time)}}</div>
              </v-col>
            </v-row>
          </v-list>

        </v-row>

        <!-- <v-row v-if="selected >= 0" style="position: fixed; bottom: 0px"> -->
        <v-row v-if="selected >= 0">
          <v-text-field v-model="input" append-icon="mdi-send" @click:append="submit"></v-text-field>
        </v-row>

      </v-col>

    </v-row>

  </div>
</template>

<script>

export default {
  name: 'Message',
  
  components: {
  },

  data: () => ({
    input: "",
    selected: -1,
    chatrooms: [
      {
        user: { icon: 'https://randomuser.me/api/portraits/men/80.jpg', name: '影山 秀路' },
        log: [
          { sender: 'me', content: 'はじめまして', date: {year: 2020, month: 4, day: 22}, time: {hour: 23, minutes: 50} },
          { sender: 'me', content: 'はじめまして', date: {year: 2020, month: 4, day: 22}, time: {hour: 23, minutes: 50} },
          { sender: 'me', content: 'はじめまして', date: {year: 2020, month: 4, day: 22}, time: {hour: 23, minutes: 50} },
          { sender: 'me', content: 'はじめまして', date: {year: 2020, month: 4, day: 22}, time: {hour: 23, minutes: 50} },
          { sender: 'me', content: 'はじめまして', date: {year: 2020, month: 4, day: 22}, time: {hour: 23, minutes: 50} },
          { sender: 'me', content: 'はじめまして', date: {year: 2020, month: 4, day: 22}, time: {hour: 23, minutes: 50} },
          { sender: 'me', content: 'はじめまして', date: {year: 2020, month: 4, day: 22}, time: {hour: 23, minutes: 50} },
          { sender: 'me', content: 'はじめまして', date: {year: 2020, month: 4, day: 22}, time: {hour: 23, minutes: 50} },
          { sender: 'me', content: 'はじめまして', date: {year: 2020, month: 4, day: 22}, time: {hour: 23, minutes: 50} },
          { sender: 'me', content: 'はじめまして', date: {year: 2020, month: 4, day: 22}, time: {hour: 23, minutes: 50} },
          { sender: 'you', content: 'こんにちは', date: {year: 2020, month: 4, day: 22}, time: {hour: 23, minutes: 52} },
        ]
      },
      {
        user: { icon: 'https://randomuser.me/api/portraits/men/81.jpg', name: '山田 太郎' },
        log: [
          { sender: 'you', content: 'こんにちは', date: {year: 2020, month: 4, day: 21}, time: {hour: 21, minutes: 1} },
        ]
      },
    ]
  }),

  computed: {
    selectedLog: function() {
      return (this.selected < 0) ? [] : this.chatrooms[this.selected].log
    },
    selectedUser: function() {
      return (this.selected < 0) ? {} : this.chatrooms[this.selected].user
    }
  },

  methods: {
    submit: function() {
      if( this.input.length > 0 ) {
        console.log("submit " + this.input)
        this.input = ""
      }
    },
  }

}
</script>

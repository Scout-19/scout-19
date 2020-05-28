<template>
  <div class="message">
    <v-progress-linear
      indeterminate
      color="primary"
      v-if="!dataLoaded"
    ></v-progress-linear>

    <v-container
      v-else
      fluid
      class="pa-5"
    >

      <v-row>

        <v-list dense>
          <v-subheader>メッセージ一覧</v-subheader>

          <v-list-item-group v-model="selected" color="primary">

            <v-list-item
              v-for="(room, i) in chatrooms"
              :key="i"
              @click="$router.push({name: 'MessageRoom', params: {id: room.id}}, () => {})"
            >
              <v-list-item-avatar>
                <img :src="room.opponent.icon">
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>{{room.opponent.last_name + ' ' + room.opponent.first_name}}</v-list-item-title>
                <v-list-item-subtitle>{{room.latest.content}}</v-list-item-subtitle>
                <v-list-item-subtitle class='overline'>{{util_getDateTimeString(room.latest.timestamp.toDate())}}</v-list-item-subtitle>
              </v-list-item-content>

            </v-list-item>
          </v-list-item-group>

        </v-list>
        
        <v-col class="pl-10">
          <v-row
            v-for="(message, i) in messages"
            :key="i"
            :justify="sendByMe(message) ? 'end' : 'start'"
          >
            <v-list>

              <v-row>
                <v-list-item-avatar v-if="!sendByMe(message)">
                  <img :src="selectedUser.icon">
                </v-list-item-avatar>

                <v-col>

                  <v-card
                    class="py-1 px-2"
                    :dark="sendByMe(message)"
                    :color="(sendByMe(message)) ? 'primary' : ''"
                    style="white-space: pre;"
                  >
                    <div>{{message.content}}</div>
                  </v-card>

                  <div class='overline'>{{util_getDateTimeString(message.timestamp.toDate())}}</div>
                </v-col>
              </v-row>
            </v-list>

          </v-row>

          <v-row v-if="selected >= 0">
            <v-textarea
              v-model="input"
              append-icon="mdi-send"
              auto-grow
              clearable
              outlined
              @click:append="submit"
              @keydown.enter.ctrl="enterKeyDown"
            />
          </v-row>

        </v-col>

      </v-row>
    </v-container>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/firestore'

import { mapGetters } from 'vuex'

export default {
  name: 'Message',

  data: () => ({
    dataLoaded: false,

    input: '',
    selected: -1,

    chatrooms: [],
    messages: [],

    unsubscribe_user_chatroom_ids: null,
    unsubscribe_messages: null,

    now: new Date()
  }),

  created() {
    // todo: get from vuex
    // var uid = this.getUid
    var uid = 'dbHIC56klkQ40fkHXYV5g3uMP1J2'

    var ref = firebase.firestore().collection('users').doc(uid).collection('chat_rooms_ids').doc('ids')

    this.unsubscribe_user_chatroom_ids = ref.onSnapshot(doc => {
      this.reloadChatrooms(doc.data().ids)
    })
  },

  destroyed() {
    if( this.unsubscribe_user_chatroom_ids ) {
      this.unsubscribe_user_chatroom_ids()
    }
  },

  computed: {
    ...mapGetters([
      'getUid',
    ]),
    selectedUser: function() {
      return this.chatrooms[this.selected].opponent
    },

    roomid: function() {
      return this.chatrooms[this.selected].id
    }
  },

  methods: {
    sendByMe: function(message) {
      return message.user_id == this.getUid
    },

    enterKeyDown: function(e) {
      // enter key (zenkaku = 229)
      if(e.keyCode == 13) {
        this.submit()
      }
    },

    submit: function() {
      if( this.input.length > 0 ) {
        const payload = {
          // escape return
          content: this.input.replace('\n', '\\n'),
          timestamp: new Date(),
          user_id: this.getUid
        }
        firebase.firestore().collection('chat_rooms').doc(this.roomid).collection('messages').add( payload ).then(() => {
          this.input = ""
        }, err => {
          alert(err.message)
        })
      }
    },

    reloadChatrooms: function(ids) {
      // clear
      this.chatrooms = []

      ids.forEach( id => {

        // get chatroom info
        firebase.firestore().collection('chat_rooms').doc(id).get().then(doc => {
          if (doc.exists)
          {
            var data = doc.data()
            var opponentUid = this.getUid == data.participants[0] ? data.participants[1] : data.participants[0]

            firebase.firestore().collection('users').doc(opponentUid).collection('profile').doc('public').get().then(doc => {
              if( doc.exists ) {
                this.chatrooms.push(
                  {
                    id: id,
                    latest: data.latest,
                    opponent: doc.data()
                  }
                )
              }
            })

            this.dataLoaded = true
          }
        }, err => {
          alert(err.message)
        })
      })
    },
  },

  watch: {
    selected: function() {

      // out index
      if(this.selected < 0 || this.selected >= this.chatrooms.length) {
        return
      }

      // unsubscribe
      if(this.unsubscribe_messages != null) {
        this.unsubscribe_messages()
        this.unsubscribe_messages = null
      }

      // clear
      this.messages = []

      var ref = firebase.firestore().collection('chat_rooms').doc(this.roomid).collection('messages')

      this.unsubscribe_messages = ref.orderBy('timestamp', 'asc').onSnapshot(col => {
        col.docChanges().forEach( change => {
          // push only added item
          if( change.type == 'added' ) {
            ref.doc(change.doc.id).get().then( message => {
              if( message.exists ) {
                this.messages.push(
                  {
                    // escape return
                    content: message.data().content.replace('\\n', '\n'),
                    timestamp: message.data().timestamp,
                    user_id: message.data().user_id,
                  }
                )
              }
            })
          }
        })
      })

    }
  }

}
</script>

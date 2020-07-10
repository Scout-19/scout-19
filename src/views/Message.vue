<template>

  <div class="message">
    <v-progress-linear indeterminate
                       color="primary"
                       v-if="!dataLoaded"></v-progress-linear>

    <v-container v-else fluid class="pa-5">
      <v-row>
        <!-- User list !-->
        <v-col cols=3>
          <v-list dense height="80vh">
            <v-subheader>メッセージ一覧</v-subheader>

            <v-list-item-group v-model="selected" color="primary">
              <v-virtual-scroll bench="10"
                                :items="chatrooms"
                                item-height="64"
                                height="70vh">
                <template v-slot="{item}">
                <v-list-item
                  @click="$router.push({name: 'MessageRoom', params: {id: item.id}}, () => {})"
                >
                  <v-list-item-avatar>
                    <img :src="item.opponent.icon">
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>{{item.opponent.last_name + ' ' + item.opponent.first_name}}</v-list-item-title>
                    <v-list-item-subtitle>{{item.latest.content}}</v-list-item-subtitle>
                    <v-list-item-subtitle class='overline'>{{util_getDateTimeString(item.latest.timestamp.toDate())}}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

              </template>
              </v-virtual-scroll>
            </v-list-item-group>

          </v-list>
        </v-col>

        <!-- Messsage Area !-->
        <v-col height="80vh" cols=9>
          <v-row dense>
            <!-- Messages !-->
            <v-col cols=12>
              <v-row>
                <v-col>
                  <v-virtual-scroll bench="10"
                                    :items="messages"
                                    height="60vh"
                                    item-height="100px">
                    <template v-slot="{item}">
                      <!-- One message !-->
                        <v-list-item two-line :class="`text-${sendByMe(item) ? 'right' : 'left'}`">
                            <v-list-item-content>
                              <v-list-item-title>
                                <v-avatar left v-if="!sendByMe(item)" size=30 class="message-avatar">
                                  <img :src="selectedUser.icon">
                                </v-avatar>
                                <v-chip class="message-chip" large>
                                <div class="one-message">{{item.content}}</div>
                                </v-chip>
                              </v-list-item-title>
                              <v-list-item-subtitle>
                                <div class="message-date">
                                  {{util_getDateTimeString(item.timestamp.toDate())}}
                                </div>
                              </v-list-item-subtitle>
                            </v-list-item-content>
                          </v-list-item>
                    </template>
                  </v-virtual-scroll>
                </v-col>
              </v-row>
            </v-col>
            <!-- Send Message Area !-->
            <v-col cols=12>
              <v-textarea v-model="input"
                          append-icon="mdi-send"
                          auto-grow
                          clearable
                          outlined
                          @click:append="submit"
                          @keydown.enter.ctrl="enterKeyDown" />
            </v-col>
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
      benched: 0,
      now: new Date(),
      items: []
    }),
    created() {
      var uid = this.getUid

      var ref = firebase
        .firestore()
        .collection('users')
        .doc(uid)
        .collection('chat_rooms_ids')
        .doc('ids')

      this.unsubscribe_user_chatroom_ids = ref.onSnapshot(doc => {
        if (doc.data())
        {
          this.reloadChatrooms(doc.data().ids)
        }
      })
    },

    destroyed() {
      if (this.unsubscribe_user_chatroom_ids) {
        this.unsubscribe_user_chatroom_ids()
      }
    },

    computed: {
      ...mapGetters(['getUid']),
      selectedUser: function() {
        return this.chatrooms[this.selected].opponent
      },

      roomid: function() {
        return this.chatrooms[this.selected].id
      },
      chat_rooms: function() {
        return this.chatrooms
      }
    },

    methods: {
      add_room: function() {
        this.chatrooms.push(this.chatrooms[0])
      },
      sendByMe: function(message) {
        return message.user_id == this.getUid
      },

      enterKeyDown: function(e) {
        // enter key (zenkaku = 229)
        if (e.keyCode == 13) {
          this.submit()
        }
      },

      submit: function() {
        if (this.input.length > 0) {
          const payload = {
            // escape return
            content: this.input.replace('\n', '\\n'),
            timestamp: new Date(),
            user_id: this.getUid
          }
          firebase
            .firestore()
            .collection('chat_rooms')
            .doc(this.roomid)
            .collection('messages')
            .add(payload)
            .then(
              () => {
                this.input = ''
              },
              err => {
                alert(err.message)
              }
            )
        }
      },

      reloadChatrooms: function(ids) {
        // clear
        this.chatrooms = []

        ids.forEach(id => {
          // get chatroom info
          firebase
            .firestore()
            .collection('chat_rooms')
            .doc(id)
            .get()
            .then(
              doc => {
                if (doc.exists) {
                  var data = doc.data()
                  var opponentUid = this.getUid == data.participants[0] ? data.participants[1] : data.participants[0]

                  firebase
                    .firestore()
                    .collection('users')
                    .doc(opponentUid)
                    .collection('profile')
                    .doc('public')
                    .get()
                    .then(doc => {
                      if (doc.exists) {
                        this.chatrooms.push({
                          id: id,
                          latest: data.latest,
                          opponent: doc.data()
                        })
                      }
                    })

                  this.dataLoaded = true
                }
              },
              err => {
                alert(err.message)
              }
            )
        })
      }
    },

    watch: {
      selected: function() {
        // out index
        if (this.selected < 0 || this.selected >= this.chatrooms.length) {
          return
        }

        // unsubscribe
        if (this.unsubscribe_messages != null) {
          this.unsubscribe_messages()
          this.unsubscribe_messages = null
        }

        // clear
        this.messages = []

        var ref = firebase
          .firestore()
          .collection('chat_rooms')
          .doc(this.roomid)
          .collection('messages')

        this.unsubscribe_messages = ref.orderBy('timestamp', 'asc').onSnapshot(col => {
          col.docChanges().forEach(change => {
            // push only added item
            if (change.type == 'added') {
              ref
                .doc(change.doc.id)
                .get()
                .then(message => {
                  if (message.exists) {
                    this.messages.push({
                      // escape return
                      content: message.data().content.replace('\\n', '\n'),
                      timestamp: message.data().timestamp,
                      user_id: message.data().user_id
                    })
                  }
                })
            }
          })
        })
      }
    }
  }

</script>

<style>

  .message-avatar {
    padding-left: 20px;
    padding-right: 20px;
  }

  .one-message {
    width: 100%;
    white-space: pre-line;
    word-break: break-all;
  }

  .v-virtual-scroll__item {
    position: static !important;
  }

  .message-chip {
    height: auto !important;
    width: auto;
    min-width: 20%;
  }
  .message-date {
    padding-left: 50px;
  }

</style>

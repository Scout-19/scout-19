<template>

  <div class="video" ref="video_page" height="1000px">
    <v-container>
      <v-row dense>
        <v-col>
          <v-text-field v-model="search_text"
                        label="検索"
                        prepend-inner-icon="mdi-magnify"
                        @keydown.enter="search(search_text)">
          </v-text-field>
        </v-col>
        <v-col cols="1">
          <v-btn style="bottom: -12px"
                 @click="search(search_text)">
            検索
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-row justify="start" dense>
            <BasicVideoFrame class='pb-5'
                             v-for="(video, i) in videos"
                             :key="i"
                             :icon='video.icon'
                             :name='video.name'
                             :video_ref='video.video_ref'
                             :title='video.title'
                             :good='video.good'
                             :hash_tags='video.hash_tags'
                             :thumbnail_refs='video.thumbnail_refs'
                             :overview='video.overview'
                             :contributor='video.contributor'
                             @search="search"/>
          </v-row>
        </v-col>

      </v-row>
    </v-container>
  </div>

</template>

<script>

  import { mapGetters } from 'vuex'

  import BasicVideoFrame from '@/components/BasicVideoFrame.vue'
  import firebase from 'firebase/app'

  export default {
    name: 'Movie',

    components: {
      BasicVideoFrame
    },

    data: () => ({
      dataLoaded: false,
      search_text: '',
      videos: [],
      last_doc: null
    }),

    methods: {
      search(text) {
        console.log(text)
        this.videos = []
        var ref = firebase.firestore().collection('videos')
        if (text.match(/^#.+/)) {
          ref.where("hash_tags", "array-contains", text)
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              var data = doc.data()
              var contributor = data.contributor
              var user_ref = firebase
                .firestore()
                .collection('users')
                .doc(contributor)
                .collection('profile')
                .doc('public')
              user_ref.get().then(doc => {
                if (doc.exists) {
                  var profile = doc.data()
                  data['icon'] = profile.icon
                  data['name'] = profile.last_name + profile.first_name
                  this.videos.push(data)
                }
              })
            })
          })
          .catch(error => {
            console.log('Error getting documents: ', error)
          })
        }
        else {
          ref.where("title", ">=", text)
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              var data = doc.data()
              var contributor = data.contributor
              var user_ref = firebase
                .firestore()
                .collection('users')
                .doc(contributor)
                .collection('profile')
                .doc('public')
              user_ref.get().then(doc => {
                if (doc.exists) {
                  var profile = doc.data()
                  data['icon'] = profile.icon
                  data['name'] = profile.last_name + profile.first_name
                  this.videos.push(data)
                }
              })
            })
          })
          .catch(error => {
            console.log('Error getting documents: ', error)
          })
        }

        return
      },
      push_videos() {
        var ref = firebase.firestore().collection('videos')
        if (!this.last_doc) {
          ref
            .orderBy('posting_date', 'desc')
            .limit(1)
            .get()
            .then(querySnapshot => {
              this.last_doc = querySnapshot.docs[querySnapshot.docs.length-1]
              console.log(this.last_doc)
              querySnapshot.forEach(doc => {
                console.log(doc)
                var data = doc.data()
                var contributor = data.contributor
                var user_ref = firebase
                  .firestore()
                  .collection('users')
                  .doc(contributor)
                  .collection('profile')
                  .doc('public')
                user_ref.get().then(doc => {
                  if (doc.exists) {
                    var profile = doc.data()
                    data['icon'] = profile.icon
                    data['name'] = profile.last_name + profile.first_name
                    this.videos.push(data)
                  }
                })
              })
            })
        }
        else {
          ref
            .orderBy('posting_date', 'desc')
            .startAfter(this.last_doc)
            .limit(1)
            .get()
            .then(querySnapshot => {
              this.last_doc = querySnapshot.docs[querySnapshot.docs.length-1]
              querySnapshot.forEach(doc => {
                console.log(doc)
                var data = doc.data()
                var contributor = data.contributor
                var user_ref = firebase
                  .firestore()
                  .collection('users')
                  .doc(contributor)
                  .collection('profile')
                  .doc('public')
                user_ref.get().then(doc => {
                  if (doc.exists) {
                    var profile = doc.data()
                    data['icon'] = profile.icon
                    data['name'] = profile.last_name + profile.first_name
                    this.videos.push(data)
                  }
                })
              })
            })
            
        }

      },
    },
    created() {
      this.push_videos()
    },

    computed: {
      ...mapGetters(['getUid'])
    }
  }

</script>

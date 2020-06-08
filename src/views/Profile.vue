<template>

  <div class="profile">
    <v-progress-linear indeterminate
                       color="primary"
                       v-if="!dataLoaded"></v-progress-linear>
    <v-container v-else>
      <div>
        <v-card class='pa-5'
                color='primary'
                v-if='profile_not_registered'>
          <v-card-text color='red'>
            プロフィールが登録されていません。登録しよう！
          </v-card-text>
        </v-card>
      </div>
      <BasicProfile class='pb-5'
                    :icon='icon'
                    :name='name'
                    :sports='sports'
                    :location='location'
                    :bio='bio' />
      <PlayerProfile class='pb-5'
                     :birthday='birthday'
                     :sex='sex'
                     :height='height'
                     :weight='weight'
                     :dominant='dominant' />
      <Career class='pb-5' :careers="[
            {year: 2010, month: 4, content: '〇〇小学校でフォワード'},
            {year: 2013, month: 4, content: '△△中学校でフォワードおおおおおおおおおおおおおお'},
          ]" />

      <UserVideos :videos='videos' />


      <FileUpload/>
      <div id="app">
        <label for="input-video">{{ isLoading ? '読み込み中...' : '動画を選択'}}</label>
        <input id="input-video" type="file" accept="video/mp4,video/x-m4v" @change="handleFileSelect">
        <video controls v-if="src">
      <source :src="src" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'>
    </video>
        <div class="thumbnail-list">
          <transition-group name="fade">
            <img class="thumbnail"
                 v-for="(thumbnail, index) in thumbnails"
                 :key="'thumbnail' + index"
                 :src="thumbnail"
                 :class="{ active: index === selected }"
                 @click="selected = index">
          </transition-group>
        </div>
      </div>

    </v-container>
  </div>

</template>

<script>

  import firebase from 'firebase/app'
  import 'firebase/firestore'
  import 'firebase/storage'

  import { mapGetters } from 'vuex'

  import BasicProfile from '@/components/BasicProfile.vue'
  import PlayerProfile from '@/components/PlayerProfile.vue'
  import Career from '@/components/Career.vue'
  import UserVideos from '@/components/UserVideos.vue'
  import FileUpload from '@/components/FileUpload.vue'

  export default {
    name: 'Profile',

    components: {
      BasicProfile,
      PlayerProfile,
      Career,
      UserVideos,
      FileUpload
    },

    data: () => ({
      dataLoaded: false,

      icon: '',
      name: '名前未設定',
      sports: '未設定',
      location: '未設定',
      bio: '',
      birthday: new Date(),
      sex: '未設定',
      height: 0,
      weight: 0,
      dominant: { hand: '', leg: '' },
      profile_not_registered: false,
      videos: [],
      src: null,
      thumbnails: [],
      selected: 0,
      isLoading:false
    }),

    created() {
      // todo: get from vuex
      var uid = this.getUid
      console.log(uid)
      var ref = firebase
        .firestore()
        .collection('users')
        .doc(uid)
        .collection('profile')
        .doc('public')

      ref.get().then(
        doc => {
          if (doc.exists) {
            var data = doc.data()
            if (Object.keys(data).length) {
              this.icon = data.icon
              this.name = data.last_name + ' ' + data.first_name
              this.sports = data.sports
              this.location = data.location
              this.bio = data.bio
              if ('birthday' in data) {
                this.birthday = data.birthday.toDate()
              }
              this.sex = data.sex
              this.height = data.height
              this.weight = data.weight
              this.dominant = { hand: data.dominant_hand, leg: data.dominant_leg }

              this.dataLoaded = true
            } else {
              this.profile_not_registered = true
              this.dataLoaded = true
            }
          } else {
            this.dataLoaded = true
          }
        },
        err => {
          alert(err.message)
        }
      )

      var user_videos_ref = firebase.firestore().collection('videos')
      user_videos_ref
        .where('contributor', '==', uid)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, ' => ', doc.data())
            var data = doc.data()
            this.videos.push(data)
          })
        })
        .catch(error => {
          console.log('Error getting documents: ', error)
        })
    },
    methods: {
      handleFileSelect(event) {
        // reset data
        this.src = null
        this.thumbnails = []
        this.selected = 0
        // varidate file
        const file = event.target.files[0]
        if (!file || !file.type.match('video/*')) return
        // read file
        const reader = new FileReader()
        reader.onload = evt => {
          this.src = evt.target.result
          this.createThumbnails(this.src)
          this.isLoading = false
        }
        reader.readAsDataURL(file)
        this.isLoading = true
      },
      createThumbnails(src) {
        const video = document.createElement('video')
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')

        // set canvas
        video.onloadeddata = () => {
          canvas.width = video.videoWidth
          canvas.height = video.videoHeight
          video.currentTime = 0
        }

        // capture thumbnail
        video.onseeked = () => {
          console.log("KOKO?")
          if (video.currentTime < video.duration) {
            context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight)
            this.thumbnails.push(canvas.toDataURL('image/jpeg'))
            video.currentTime += Math.ceil(video.duration / 4)
          } else {
            context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight)
            this.thumbnails.push(canvas.toDataURL('image/jpeg'))
          }
        }

        // set video source
        video.src = src
        video.load()
      }
    },

    computed: {
      ...mapGetters(['getUid'])
    }
  }

</script>

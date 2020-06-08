<template>

  <v-sheet id="upload_area"
           title="動画をアップロードする"
           color="primary"
           width="100%"
           height="200"
           class="pa-2"
           @click.capture="click_upload_area()"
           >
    <input
           ref="file_input"
           id="file_upload"
           style="display:none"
           type="file"
           accept="video/mp4,video/x-m4v"
           @change="handleFileSelect" />
    <v-row justify="center">
      <v-icon v-if="!upload_now"
              color="white"
              size="100">mdi-cloud-upload
      </v-icon>
    </v-row>
    <v-row justify="center">
      <v-progress-circular v-if="upload_now"
                           :rotate="360"
                           :size="100"
                           :width="15"
                           :value="upload_state"
                           color="white">
        {{ upload_state }}%
      </v-progress-circular>
    </v-row>
    <v-row justify="center">
      <span class="white--text">動画をアップロード</span>
    </v-row>
  </v-sheet>


</template>

<script>

  import firebase from 'firebase/app'
  import 'firebase/firestore'
  import 'firebase/storage'

  export default {
    name: 'FileDrop',

    props: {},
    data: () => ({
      upload_now: false,
      upload_state: 0,
      download_url: "",
      thumbnails:[]
    }),
    mounted() {

    },
    methods: {
      click_upload_area() {
        this.$refs.file_input.click()
        return
      },
      handleFileSelect(event) {
        this.src = null
        this.thumbnails = []
        this.selected = 0
        this.upload_now = true
        const storage = firebase.storage()
        // varidate file
        const file = event.target.files[0]
        if (!file || !file.type.match('video/*')) return
        var uploadTask = storage
          .ref()
          .child('y3SONr9xOLUGNahigjQN7U1hkeP2/sample2.mp4')
          .put(file)
        uploadTask.on(
          'state_changed',
          snapshot => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            this.upload_state = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 1000) / 10
            console.log('Upload is ' + this.upload_state + '% done')
            switch (snapshot.state) {
              case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log('Upload is paused')
                break
              case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log('Upload is running')
                break
            }
          },
          error => {
            // Handle unsuccessful uploads
            console.log(error)
          },
          function() {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
              this.download_url = downloadURL;
            })
          }
        )
      }
    }
  }

</script>

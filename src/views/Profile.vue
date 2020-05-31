<template>
  <div class="profile">
    <v-progress-linear
      indeterminate
      color="primary"
      v-if="!dataLoaded"
    ></v-progress-linear>
    <v-container v-else>
      <div>
      <v-card class='pa-5'
        color='primary'
        v-if='profile_not_registered'
      >
        <v-card-text
          color='red'
        >
          プロフィールが登録されていません。登録しよう！
        </v-card-text>
      </v-card>
      </div>
      <BasicProfile
        class='pb-5'
        :icon='icon'
        :name='name'
        :sports='sports'
        :location='location'
        :bio='bio'
      />
      <PlayerProfile
        class='pb-5'
        :birthday='birthday'
        :sex='sex'
        :height='height'
        :weight='weight'
        :dominant='dominant'
      />
      <Career
        class='pb-5'
        :careers="[
          {year: 2010, month: 4, content: '〇〇小学校でフォワード'},
          {year: 2013, month: 4, content: '△△中学校でフォワードおおおおおおおおおおおおおお'},
        ]"
      />
    </v-container>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/firestore'

import { mapGetters } from 'vuex'

import BasicProfile from '@/components/BasicProfile.vue'
import PlayerProfile from '@/components/PlayerProfile.vue'
import Career from '@/components/Career.vue'

export default {
  name: 'Profile',

  components: {
    BasicProfile,
    PlayerProfile,
    Career,
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
    dominant: {hand: '', leg: ''},
    profile_not_registered: false
  }),

  created() {
    // todo: get from vuex
    var uid = this.getUid
    var ref = firebase.firestore().collection('users').doc(uid).collection('profile').doc('public')

    ref.get().then(doc => {
      if (doc.exists)
      {
        var data = doc.data()
        if (Object.keys(data).length)
        {
          this.icon = data.icon
          this.name = data.last_name + ' ' +  data.first_name
          this.sports = data.sports
          this.location = data.location
          this.bio = data.bio
          if ("birthday" in data)
          {
            this.birthday = data.birthday.toDate()
          }
          this.sex = data.sex
          this.height = data.height
          this.weight = data.weight
          this.dominant = {hand: data.dominant_hand, leg: data.dominant_leg}

          this.dataLoaded = true
        }
        else
        {
          this.profile_not_registered = true
          this.dataLoaded = true
        }
      }
    }, err => {
      alert(err.message)
    })
   },

  computed: {
    ...mapGetters([
      'getUid',
    ]),
  },
}
</script>

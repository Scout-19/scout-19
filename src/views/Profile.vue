<template>
  <div class="profile">
    <v-container>
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
          {start: {year: 2000, month: 4, day: 1}, end: {year: 2003, month: 3, day: 31}, content: '〇〇小学校でフォワード'},
          {start: {year: 2003, month: 4, day: 1}, end: {year: 2006, month: 3, day: 31}, content: '△△中学校でフォワード'},
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
    Career
  },

  data: () => ({
    icon: '',
    name: '',
    sports: '',
    location: '',
    bio: '',
    birthday: new Date(),
    sex: '',
    height: 0,
    weight: 0,
    dominant: {hand: '', leg: ''}
  }),

  created() {
    // todo: get from vuex
    // var uid = this.getUid
    var uid = 'dbHIC56klkQ40fkHXYV5g3uMP1J2'

    var ref = firebase.firestore().collection('users').doc(uid).collection('profile').doc('public')

    ref.get().then(doc => {
      if (doc.exists)
      {
        var data = doc.data()
        this.icon = data.icon
        this.name = data.last_name + ' ' +  data.first_name
        this.sports = data.sports
        this.location = data.location
        this.bio = data.bio

        this.birthday = data.birthday.toDate()
        this.sex = data.sex
        this.height = data.height
        this.weight = data.weight
        this.dominant = {hand: data.dominant_hand, leg: data.dominant_leg}
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

<template>
  <div class="profile">
    <BasicProfile
      class='pa-5'
      icon='https://randomuser.me/api/portraits/women/4.jpg'
      name='橋本 環奈'
      sports='サッカー'
      location='東京都'
      bio='よろしくお願いします。'
    />
    <PlayerProfile
      class='pa-5'
      :birthday='{ year: 2005, month: 10, day: 5 }'
      sex='男'
      height='170'
      weight='60'
      :dominant='{ hand: "右", leg: "左" }'
    />
    <Career
      class='pa-5'
      :careers="[
        {start: {year: 2000, month: 4, day: 1}, end: {year: 2003, month: 3, day: 31}, content: '〇〇小学校でフォワード'},
        {start: {year: 2003, month: 4, day: 1}, end: {year: 2006, month: 3, day: 31}, content: '△△中学校でフォワード'},
      ]"
    />
  </div>
</template>

<script>
import BasicProfile from '@/components/BasicProfile.vue'
import PlayerProfile from '@/components/PlayerProfile.vue'
import Career from '@/components/Career.vue'

export default {
  name: 'Profile',

  components: {
    BasicProfile,
    PlayerProfile,
    Career
  }

}
</script>

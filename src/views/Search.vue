<template>

  <div class="search">
    <v-container fluid class="pa-5">
      <v-row>

        <v-col cols=12 sm=6 md=3>
          <v-select v-model="prefecture"
                    :items="prefecturesList"
                    label="都道府県"
                    clearable>
          </v-select>
        </v-col>

        <v-col cols=12 sm=6 md=3>
          <v-range-slider v-model="ageRange" max=100 min=0 hide-details
                          class="align-center"
                          style="margin-top: 12px;">
            <template v-slot:prepend>
                              <v-text-field
                                :value="ageRange[0]"
                                class="mt-0 pt-0"
                                type="number"
                                style="width: 60px"
                                label="年齢"
                                @change="$set(ageRange, 0, $event)"
                              ></v-text-field>
                            </template>
            <template v-slot:append>
                              <v-text-field
                                :value="ageRange[1]"
                                class="mt-0 pt-0"
                                label=""
                                type="number"
                                style="width: 60px"
                                @change="$set(ageRange, 1, $event)"
                              ></v-text-field>
                            </template>
          </v-range-slider>
        </v-col>

        <v-col cols=12 sm=6 md=3 v-if="account_type=='team'">
          <v-select v-model="positions"
                    :items="positionsList"
                    label="ポジション"
                    multiple
                    clearable>
          </v-select>
        </v-col>

        <v-col cols=12 sm=6 md=3>
          <v-select v-model="sex"
                    :items="sexList"
                    label="性別">
          </v-select>
        </v-col>

        <v-col cols=12 sm=6 md=3 v-if="account_type=='team'">
          <v-select v-model="type"
                    :items="typeList"
                    label="検索種別">
          </v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn color="primary" block rounded @click="search" :disabled="!searchEnable">
            <v-icon>mdi-magnify</v-icon>検索
          </v-btn>
        </v-col>
      </v-row>

      <v-row justify="start" dense v-if="searched && type=='動画'">
        <v-col v-for="(video, i) in videos" :key="i">
          <BasicVideoFrame class='pb-5'
                           :icon='video.icon'
                           :name='video.name'
                           :video_ref='video.video_ref'
                           :title='video.title'
                           :good='video.good'
                           :hash_tags='video.hash_tags'
                           :thumbnail_refs='video.thumbnail_refs'
                           :overview='video.overview'
                           :contributor='video.contributor'
                           @search="search" />
        </v-col>
      </v-row>
      <v-row v-else-if="searched && type=='プロフィール'" justify="start" dense>
        <v-col v-for="(profile, i) in profiles" :key="i">
          <BasicProfileCard :profile="profile" />
        </v-col>
      </v-row>
    </v-container>
  </div>

</template>

<script>

  import { mapGetters } from 'vuex'
  import firebase from 'firebase/app'
  import 'firebase/firestore'
  import BasicVideoFrame from '@/components/BasicVideoFrame.vue'
  import BasicProfileCard from '@/components/BasicProfileCard.vue'
  export default {
    name: 'Search',
    components: {
      BasicVideoFrame,
      BasicProfileCard
    },
    data: () => ({
      searched: false,
      account_type: 'player',
      prefecture: '',
      prefecturesList: [
        '北海道',
        '青森県',
        '岩手県',
        '宮城県',
        '秋田県',
        '山形県',
        '福島県',
        '茨城県',
        '栃木県',
        '群馬県',
        '埼玉県',
        '千葉県',
        '東京都',
        '神奈川県',
        '新潟県',
        '富山県',
        '石川県',
        '福井県',
        '山梨県',
        '長野県',
        '岐阜県',
        '静岡県',
        '愛知県',
        '三重県',
        '滋賀県',
        '京都府',
        '大阪府',
        '兵庫県',
        '奈良県',
        '和歌山県',
        '鳥取県',
        '島根県',
        '岡山県',
        '広島県',
        '山口県',
        '徳島県',
        '香川県',
        '愛媛県',
        '高知県',
        '福岡県',
        '佐賀県',
        '長崎県',
        '熊本県',
        '大分県',
        '宮崎県',
        '鹿児島県',
        '沖縄県'
      ],

      ageRange: [14, 18],

      positions: [],
      positionsList: [
        'FW(全て)',
        'FW(センター)',
        'FW(右)',
        'MF(全て)',
        'MF(ボランチ)',
        'MF(右)',
        'MF(左)',
        'MF(トップ下)',
        'DF(全て)',
        'DF(右)',
        'DF(左)',
        'GK'
      ],

      sex: '',
      sexList: ['男性', '女性'],

      type: 'プロフィール',
      typeList: ['プロフィール', '動画'],

      teams: [
        {
          name: 'XXX中学校',
          icon: 'https://randomuser.me/api/portraits/men/80.jpg',
          bio: 'ぜひ練習に参加してみてください'
        },
        {
          name: 'YYY中学校',
          icon: 'https://randomuser.me/api/portraits/men/82.jpg',
          bio: 'ぜひ練習に参加してみてください'
        },
        {
          name: 'ZZZ中学校',
          icon: 'https://randomuser.me/api/portraits/men/84.jpg',
          bio: 'ぜひ練習に参加してみてください'
        }
      ],
      videos: [],
      profiles: []
    }),

    computed: {
      ...mapGetters(['getUid']),
      searchEnable: function() {
        return (
          this.prefecture != '' ||
          this.ageRange[0] != 0 ||
          this.ageRange[1] != 0 ||
          this.positions.length > 0 ||
          this.sex != ''
        )
      },
      foundTeams: function() {
        return this.teams.length
      }
    },
    created() {
      var uid = this.getUid
      var ref = firebase
        .firestore()
        .collection('users')
        .doc(uid)

      ref.get().then(
        doc => {
          if (doc.exists) {
            var data = doc.data()
            if (Object.keys(data).length) {
              this.account_type = data.account_type
            } else {
              this.account_type = 'player'
            }
            if (this.account_type == 'team') {
              this.typeList.push('動画')
            }
          } else {
            console.log('Document does not exits')
          }
          this.account_type = 'team'
        },
        err => {
          alert(err.message)
        }
      )
    },
    methods: {
      search: function() {
        // initialize
        this.videos = []
        this.profiles = []

        this.searched = true

        // make custom query.
        var ref = firebase.firestore().collection('users')
        if (this.positions.length != 0) {
          ref = ref.where('profile.positions', 'array-contains-any', this.positions)
        }

        if (this.prefecture) {
          ref = ref.where('profile.location', '==', this.prefecture)
        }

        if (this.ageRange[0] != 0) {
          ref = ref.where('profile.age', '>=', this.ageRange[0])
        }

        if (this.ageRange[1] != 0) {
          ref = ref.where('profile.age', '<=', this.ageRange[1])
        }

        if (this.sex) {
          ref = ref.where('profile.sex', '==', this.sex)
        }

        if (this.account_type == 'player') {
          ref = ref.where('account_type', '==', 'team')
        } else {
          ref = ref.where('account_type', '==', 'player')
        }
        // get data from database
        ref.get().then(querySnapshot => {
          querySnapshot.forEach(doc => {
            if (this.type == '動画') {
              this.profiles = []
              var player_id = doc.id
              var icon = doc.data().profile.icon
              var name = doc.data().profile.last_name + doc.data().profile.first_name
              var player_profile_ref = firebase
                .firestore()
                .collection('videos')
                .where('contributor', '==', player_id)
              player_profile_ref.get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                  var video_data = doc.data()
                  video_data.icon = icon
                  video_data.name = name
                  this.videos.push(video_data)
                })
              })
            } else {
              this.videos = []
              var profile = doc.data().profile
              profile['uid'] = doc.id
              this.profiles.push(profile)
            }
          })
        })
      }
    }
  }

</script>

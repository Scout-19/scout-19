<template>
  <div class="search">
    <v-container fluid class="pa-5">
      <v-row>
        <v-col cols=12 sm=6 md=3>
          <v-combobox
            v-model="prefectures"
            :items="prefecturesList"
            label="都道府県"
            multiple
            chips
            clearable
          ></v-combobox>
        </v-col>

        <v-col cols=12 sm=6 md=3>
          <v-combobox
            v-model="grade"
            :items="gradeList"
            label="学年"
            multiple
            chips
            clearable
          ></v-combobox>
        </v-col>

        <v-col cols=12 sm=6 md=3>
          <v-combobox
            v-model="positions"
            :items="positionsList"
            label="ポジション"
            multiple
            chips
            clearable
          ></v-combobox>
        </v-col>

        <v-col cols=12 sm=6 md=3>
          <v-combobox
            v-model="type"
            :items="typeList"
            label="検索種別"
            chips
          ></v-combobox>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn color="primary" block rounded @click="search" :disabled="!searchEnable">
            <v-icon>mdi-magnify</v-icon>検索
          </v-btn>
        </v-col>
      </v-row>

      <v-row>
        <v-container fluid>
          <v-list v-if="searched" three-line>
            <v-subheader>検索結果 ({{foundTeams}} チーム)</v-subheader>
              <v-list-item
                @click="console.log('team')"
                class="pa-2 mx-5"
                v-for="(team, i) in teams"
                :key="i"
              >
                <v-list-item-avatar>
                  <v-img :src="team.icon"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title v-text="team.name"></v-list-item-title>
                  <v-list-item-subtitle>{{team.bio}}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
          </v-list>
        </v-container>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Search',

  data: () => ({

    searched: false,

    prefectures: [],
    prefecturesList: [
      "北海道","青森県","岩手県","宮城県","秋田県","山形県","福島県",
      "茨城県","栃木県","群馬県","埼玉県","千葉県","東京都","神奈川県",
      "新潟県","富山県","石川県","福井県","山梨県","長野県","岐阜県",
      "静岡県","愛知県","三重県","滋賀県","京都府","大阪府","兵庫県",
      "奈良県","和歌山県","鳥取県","島根県","岡山県","広島県","山口県",
      "徳島県","香川県","愛媛県","高知県","福岡県","佐賀県","長崎県",
      "熊本県","大分県","宮崎県","鹿児島県","沖縄県"
    ],

    grade: [],
    gradeList: [
      '小学校',
      '中学校',
      '高校',
      '大学',
      'プロ'
    ],


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
      'GK',
    ],

    type: "プロフィール",
    typeList: [ 'プロフィール', '動画' ],

    teams: [
      { name: 'XXX中学校', icon: 'https://randomuser.me/api/portraits/men/80.jpg', bio: 'ぜひ練習に参加してみてください' },
      { name: 'YYY中学校', icon: 'https://randomuser.me/api/portraits/men/82.jpg', bio: 'ぜひ練習に参加してみてください' },
      { name: 'ZZZ中学校', icon: 'https://randomuser.me/api/portraits/men/84.jpg', bio: 'ぜひ練習に参加してみてください' },
    ],
  }),

  computed: {
    ...mapGetters([
      'getUid',
    ]),
    searchEnable: function() {
      return this.prefectures.length > 0 || this.grade.length > 0
    },
    foundTeams: function() {
      return this.teams.length
    }
  },

  methods: {
    search: function() {
      this.searched = true
    }
  },
}
</script>

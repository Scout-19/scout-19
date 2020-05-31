<template>
  <div class="privacy-policy">
    <PolicyTerms
      title="プライバシーポリシー"
      :content="policies"
    />
  </div>
</template>

<script>
import PolicyTerms from '@/components/PolicyTerms'

export default {
  name: 'PrivacyProlicy',

  components: {
    PolicyTerms
  },

  data: () => ({
    policies: [
      {
        title: '定義',
        lines: [
          'なんとかかんとか',
        ]
      },
      {
        title: '個人情報の取得及び利用目的',
        lines: [
          '当社は、個人情報を以下の目的で取得及び利用いたします。',
          '(1) なんとか',
          '(2) なんとか',
        ]
      },
      {
        title: '個人情報の取得及び利用目的の変更',
        lines: [
          '当社は、個人情報の取得及び利用目的との間で、関連性を有すると合理的に認められる範囲内において、取得及び利用目的を変更することがあります。',
        ]
      },
    ]
  })
}
</script>
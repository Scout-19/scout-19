<template>
  <div class="terms">
    <PolicyTerms
      title="利用規約"
      :content="terms"
    />
  </div>
</template>

<script>
import PolicyTerms from '@/components/PolicyTerms'

export default {
  name: 'Terms',

  components: {
    PolicyTerms
  },

  data: () => ({
    terms: [
      {
        title: '第1条（定義）',
        lines: [
          'なんとかかんとか',
        ]
      },
    ]
  })
}
</script>
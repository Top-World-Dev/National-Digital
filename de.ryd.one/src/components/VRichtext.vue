<template>
  <div>
    <div v-html="richtext"></div>
  </div>
</template>

<script>
  export default {
    props: ['text'],
    computed: {
      richtext() {
        return this.text ? this.$storyapi.richTextResolver.render(this.text) : ''
      }
    }
  }
</script>
<style lang="scss">
@import '~/assets/styles.scss';
p {
  letter-spacing: -0.15px;
  color: $veryDarkGrey;
  font-size: 0.85rem;
}
</style>
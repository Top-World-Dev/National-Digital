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
        console.log(this.$storyapi.richTextResolver.render(this.text));
        return this.text ? this.$storyapi.richTextResolver.render(this.text) : ''
      }
    }
  }
</script>
<style lang="scss">
@import '~/assets/styles.scss';

</style>
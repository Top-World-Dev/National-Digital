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
        console.log('hello')
        return this.text ? this.$storyapi.richTextResolver.render(this.text) : ''
      }
    }
  }
</script>
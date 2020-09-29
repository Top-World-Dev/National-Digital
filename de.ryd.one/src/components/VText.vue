<template>
  <tag :is="blok.style" class="v-text" v-editable="blok">
    <v-richtext :text="blok.content"></v-richtext>
  </tag>
</template>
<script>
  export default {
    props: ['blok']
  }
</script>
<style lang="scss">
@import '~/assets/styles.scss';
</style>

<template>
  <tag :is="blok.style" class="v-text" v-editable="blok">
    <richtext v-html="richtext"></richtext>
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

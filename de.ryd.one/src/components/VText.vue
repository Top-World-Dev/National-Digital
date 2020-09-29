<template>
  <tag :is="blok.style" class="v-text" v-editable="blok">
    <div v-html="blok.content"></div>
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

<template>
  <tag :is="blok.style" class="v-heading" v-editable="blok">
    {{ blok.content }}
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

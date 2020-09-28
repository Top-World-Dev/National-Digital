<template>
  <tag :is="blok.Style" class="v-heading" v-editable="blok">
    {{ blok.Content }}
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

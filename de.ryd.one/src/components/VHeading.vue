<template>
  <h2 class="v-heading" v-editable="blok">
    {{ blok.content }}
  </h2>
</template>
<script>
  export default {
    props: ['blok']
  }
</script>
<style lang="scss">
@import '~/assets/styles.scss';
</style>

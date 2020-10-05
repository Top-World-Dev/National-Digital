<template>
  <div class="v-gap" :style="{height: blok.size + 'rem' }" v-editable="blok">
  </div>
</template>
<script>
  export default {
    props: ['blok']
  }
</script>
<style lang="scss">
@import '~/assets/styles.scss';
.v-gap {
  width: auto;
}
</style>
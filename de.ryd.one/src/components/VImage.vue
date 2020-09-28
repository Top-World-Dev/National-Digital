<template>
  <div class="v-image" :class="blok.style" v-editable="blok">
    <g-link v-if="blok.link.linktype == 'story'" :to="blok.link.url">g-img</g-link>
    <a v-else :href="blok.link.url" target="_blank" rel="noopener noreferrer">g-img</a>
  </div>
</template>
<script>
  export default {
    props: ['blok']
  }
</script>
<style lang="scss">
@import '~/assets/styles.scss';
.v-image {
  &.image-inline {
    display: inline-block;
  }
  &.image-block {
    display: block;
  }
}
</style>
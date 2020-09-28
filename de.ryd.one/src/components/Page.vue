<template>
  <div>
    <component :key="blok._uid" v-for="blok in blok.body" :blok="blok" :is="blok.component"></component>
  </div>
</template>

<script>
export default {
  props: ['blok']
}
</script>


<style lang="scss">
@import '~/assets/styles.scss';
.xy-section {
  &.section-white {
    color: $white;
  }
  .section-container {
    @include container($container);
  }
}
</style>
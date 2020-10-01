<template>
  <div class="v-imageoverlay" :class="blok.style" v-editable="blok">
    <v-image :source="item"></v-image>
    <div class="imageoverlay-content">
      <component :key="blok._uid" v-for="blok in blok.overlay" :blok="blok" :is="blok.component"></component>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['blok']
  }
</script>
<style lang="scss">
@import '~/assets/styles.scss';
.v-imageoverlay {
  position: relative;
  img {
    display: block;
    width: 100%;
    height: auto;
  }
  &.imageoverlay-content {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
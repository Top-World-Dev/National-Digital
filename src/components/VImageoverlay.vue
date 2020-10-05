<template>
  <div class="v-imageoverlay" :class="blok.style" v-editable="blok">
    <v-image class="imageoverlay-image" :source="blok.image[0]"></v-image>
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
  .imageoverlay-image img {
    display: block;
    width: 100%;
    height: auto;
    opacity: 0.8;
  }
  .imageoverlay-content {
    background-image: linear-gradient(180deg, rgba(46, 50, 131, 0) 50%, rgba(13, 15, 54, 1) 100%);
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    text-align: center;
    padding-bottom: 2rem;
    color: $white;
  }
}
</style>
<template>
  <div class="v-button" v-editable="blok">
    <a :href="blok.link.url" :class="blok.class" :target="blok.linktype != 'url' ? '_blank' : '_self'" :rel="blok.linktype != 'url' ? 'noopener nofollow' : ''">{{ blok.text }}</a>
  </div>
</template>
<script>
  export default {
    props: ['blok']
  }
</script>
<style lang="scss">
@import '~/assets/styles.scss';
</style>
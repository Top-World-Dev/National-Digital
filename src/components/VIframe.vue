<template>
  <iframe class="v-iframe" :id="blok.id" :src="blok.src"></iframe>
</template>
<script>
  export default {
    props: ['blok'],
  }
</script>
<style lang="scss">
@import '~/assets/styles.scss';
.v-iframe {
  border: none;
  width: 100%;
  height: 1080px;
}
</style>  
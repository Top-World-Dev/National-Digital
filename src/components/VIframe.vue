<template>
  <iframe class="v-iframe" :id="blok.id" :src="blok.src" :style="{height: height}"></iframe>
</template>
<script>
  export default {
    props: ['blok'],
    data() {
      return {
        height: '0px'
      }
    },
    mounted() {
      window.addEventListener('message', (event) => {
        this.height = `${event.data[1]}px`;
      });
    },
    destroyed() {
      window.removeEventListener('message', (event) => {
      });
    },
  }
</script>
<style lang="scss">
@import '~/assets/styles.scss';
.v-iframe {
  border: none;
  width: 100%;
}
</style>  


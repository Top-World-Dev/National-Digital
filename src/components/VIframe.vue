<template>
  <!-- <iframe class="v-iframe" :id="blok.id" :src="blok.src" :style="{height: height}"></iframe> -->
</template>
<script>
  import xmlToJson from '../xml-json';
  export default {
    props: ['blok'],
    data() {
      return {
        height: '0px'
      }
    },
    destroyed() {
      window.removeEventListener('resize', (event) => {
      });
    },
    async mounted() {
      const response = await fetch('https://thinxnet-jobs.personio.de/xml');
      const data = await response.text();
      var XmlNode = new DOMParser().parseFromString(data, 'text/xml');
      console.log(XmlNode)
    }   
  }
</script>
<style lang="scss">
@import '~/assets/styles.scss';
.v-iframe {
  border: none;
  width: 100%;
}
</style>  



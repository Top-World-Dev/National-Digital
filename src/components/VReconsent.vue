<template>
  <div><a class="v-reconsent" v-editable="blok" role="button" tabindex="0">{{ blok.title }}</a></div>
</template>
<script>
  export default {
    props: ['blok']
  }

// export default {
//   props: ['blok'],
//   methods: {
//     resetConsent() {
//       if (process.isClient) {
//         localStorage.setItem('consentGiven',false);
//         this.$emit('askConsent',true);
//       }
//     }
//   }
// };
</script>
<style lang="scss">
@import '~/assets/styles.scss';
</style>
<template>
  <div><a class="v-reconsent" v-editable="blok" role="button" tabindex="0" @click="resetConsent">{{ blok.title }}</a></div>
</template>
<script>
  import EventBus from '../eventbus';
  export default {
    props: ['blok'],
    methods: {
      resetConsent() {
        if (process.isClient) {
          localStorage.setItem('consentGiven',false);
          EventBus.$emit('toggleModal');
        }
      }
    }
  }
</script>
<style lang="scss">
@import '~/assets/styles.scss';

</style>
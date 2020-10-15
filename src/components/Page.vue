<template>
  <div>
    <theconsent :key="blok.component" v-for="blok in blok.body" v-if="blok.component == 'TheHeader'" :show="askConsent" :content="blok.section.content.section[0].modal[0]"></theconsent>
    <component :key="blok._uid" v-for="blok in blok.body" :blok="blok" :is="blok.component"></component>
  </div>
</template>

<script>
import TheConsent from "./TheConsent"; 
import EventBus from '../eventbus';

export default {
  props: ['blok'],
  components: {
    "theconsent": TheConsent,
  },
  mounted() {
    EventBus.$on('askConsent', bool => this.askConsent = bool);
  },
  data() {
    return {
      askConsent: false
    }
  },
  metaInfo() {
    const data = this.blok.meta_information;
    if(!data) {
      return false
    } 
    else {
      return {
        title: data.title,
        meta: [
          { name: 'description', content: data.description }
        ],
        link: [
          { rel: 'canonical', href: `${this.$route.fullPath}` },
        ]
      }
    }
  },
  created() {
    if (process.isClient) {
      if (!localStorage.getItem('consentGiven')) {
        this.askConsent = true;
      }
    }
  }
}
</script>


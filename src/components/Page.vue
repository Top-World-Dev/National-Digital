<template>
  <div>
    <theconsent :key="blok._uid" v-for="blok in blok.body" v-if="blok.component == 'TheHeader' && askConsent" :content="blok.section.content.section[0]"></theconsent>
    <component :key="blok._uid" v-for="blok in blok.body" :blok="blok" :is="blok.component"></component>
  </div>
</template>

<script>
import TheConsent from "./TheConsent"; 

export default {
  props: ['blok'],
  components: {
    "theconsent": TheConsent,
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
  mounted() {
    if (!localStorage.getItem('consentGiven')) {
      this.askConsent = true;
    }
  },
  data() {
    return {
      askConsent: false
    }
  }
}
</script>


<template>
  <div>
    <theconsent :key="blok.component" v-for="blok in blok.body" v-if="blok.component == 'TheHeader'" :content="blok.section.content.section[0].modal[0]"></theconsent>
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
    const data = this.blok.meta;
    if(!data) {
      return false
    } 
    else {
      return {
        title: data[0].title,
        meta: [
          { name: 'description', content: data.description },
          { name: 'robots', content: (data.noindex) ? 'noindex' : 'index' }
        ],
        link: [
          { rel: 'canonical', href: `${this.$route.fullPath}` },
        ]
      }
    }
  }
}
</script>


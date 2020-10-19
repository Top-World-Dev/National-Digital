<template>
  <div>
    <theconsent :key="blok.component" v-for="blok in blok.body" v-if="blok.component == 'TheHeader' && blok.section.content" :content="blok.section.content.section[0].modal[0]"></theconsent>
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
    const data = this.blok.meta[0];
    if(!data) {
      return false
    } 
    else {
      let description = data.description ? this.$storyapi.richTextResolver.render(data.description) : '';
      return {
        title: data.title,
        meta: [
          { name: 'description', content: description.replace('<p>', '').replace('</p>', '') },
          { name: 'robots', content: (data.noindex) ? 'noindex' : 'index' },
          { name: "twitter:card", content: "summary" },
          { name: 'og:url', content: `${this.$route.fullPath}` },
          { name: 'og:title', content: data.title },
        ],
        link: [
          { rel: 'canonical', href: `${this.$route.fullPath}` },
        ]
      }
    }
  }
}
</script>

<template>
  <div>
    <component :key="blok._uid" v-for="blok in blok.body" :blok="blok" :is="blok.component"></component>
  </div>
</template>

<script>
export default {
  props: ['blok'],
  metaInfo() {
      // const data = this.blok.body[0].section.content.section[0].meta[0];
      const data = this.blok.meta;
      if(!data) {
        return false
      } 
      else {
        return {
          title: data.title,
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


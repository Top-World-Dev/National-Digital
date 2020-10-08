<template>
  <div>
    <component :key="blok._uid" v-for="blok in blok.body" :blok="blok" :is="blok.component"></component>
  </div>
</template>

<script>
export default {
  props: ['blok'],
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
    }
}
</script>


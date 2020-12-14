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
    "theconsent": TheConsent
  }
}
</script>

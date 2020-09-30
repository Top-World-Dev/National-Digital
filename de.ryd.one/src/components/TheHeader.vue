<template>
  <header>
     <component :key="blok._uid" v-for="blok in blok.section.content.section" :blok="blok" :is="blok.component"></component> 
  </header>
</template>

<script>
export default {
  props: ["blok"],
};
</script>

<style lang="scss">
@import "~/assets/styles.scss";
</style>

<template>
  <div class="xy-header">
    <sidenav class="header-sidenav" :content="blok.nav" :logo="blok.image['0']"></sidenav>
    <topnav class="header-topnav" :content="blok.nav" :logo="blok.image['0']"></topnav>
  </div>
</template>

<script>
import SideNav from "./TheHeaderSidenav"; 
import Topnav from "./TheHeaderTopnav"; 

export default {
  props: ["blok"],
  components: {
    "sidenav": SideNav,
    "topnav": Topnav
  },
  metaInfo() {
    const data = this.blok.meta[0];
    if(!data) {
      return false
    } 
    else {
      return {
        meta: [
          { name: 'twitter:site', content: data.twitter },
          { name: 'og:type', content: 'website' },
          { name: 'og:description', content: 'description' },
        ]
      }
    }
  },
  data() {
    return {
      isActive: '7bf1391b-faf3-4647-b7ce-2f631781f55c'
    }
  },
  methods: {
    selectTab(item) {
      this.isActive = item._uid
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/styles.scss";

/* Nav display logic */
@media (max-width: $breakColumns - 1px) {
  .header-topnav {
    display: none !important;
  }
}
@media (min-width: $breakColumns) {
  .header-sidenav {
    display: none !important;
  }
}
</style>

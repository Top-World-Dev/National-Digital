<template>
  <div class="xy-header">
    <sidenav :content="blok.nav" :logo="blok.image['0']"></sidenav>
    <tabnav :content="blok.nav" :logo="blok.image['0']"></tabnav>
  </div>
</template>

<script>
import SideNav from "./TheHeaderSidenav"; 
import TabNav from "./TheHeaderTabnav"; 

export default {
  props: ["blok"],
  components: {
    "sidenav": SideNav,
    "tabnav": TabNav
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

</style>

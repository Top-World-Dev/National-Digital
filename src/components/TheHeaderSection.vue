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
};
</script>

<style lang="scss">
@import "~/assets/styles.scss";
/* Nav display logic */
@media (max-width: $breakNav - 1px) {
  .header-topnav {
    display: none !important;
  }
}
@media (min-width: $breakNav) {
  .header-sidenav {
    display: none !important;
  }
}

.xy-header {
  z-index: 10;
  position: relative;
  box-shadow:  0 0.01em 1em 0.05em rgba($black,0.4);
}
</style>

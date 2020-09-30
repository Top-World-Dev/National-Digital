<template>

  <div class="xy-header">
    <div class="header-sidenav-logo"><v-image :source="blok.image['0']"></v-image></div>
    <div class="header-sidenav-toggle">TOGGLE</div>
    <div class="header-sidenav-overlay">
      <div class="header-sidenav-overlay-logo"><v-image :source="blok.image['0']"></v-image></div>
      <div class="header-sidenav-overlay-toggle">TOGGLE</div>
      <div class="header-sidenav-overlay-menu">
        <ul>
          <li>item</li>
          <li>item</li>
          <li>item</li>
          <li>item</li>
          <li>item</li>
          <li>item</li>
          <li>item</li>
        </ul>
      </div>
    </div>
    <div class="header-tabnav-tablinks-wrapper">
      <div class="header-tabnav-tablinks-container">
        <ul class="header-tabnav-tablinks-links">
          <li>item</li>
          <li>item</li>
          <li>item</li>
          <li>item</li>
          <li>item</li>
          <li>item</li>
          <li>item</li>
        </ul>
      </div>
      <div class="header-tabnav-tabcontent-wrapper">
        <div class="header-tabnav-tabcontent-container">
          <div class="header-tabnav-logo">LOGO</div>
          <ul class="header-tabnav-tabcontent-links">
            <li>item</li>
            <li>item</li>
            <li>item</li>
            <li>item</li>
            <li>item</li>
            <li>item</li>
            <li>item</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["blok"],
};
</script>

<style lang="scss">
@import "~/assets/styles.scss";

.xy-header {
  /* Sidebar Navigation */
  @media (max-width: $breakMD - 1px) {
    // disable tabnav
    [class^="header-tabnav-"] {
      display: none !important;
    }

    // sidenav layout
    display: grid;
    grid-template-columns: 1fr 120px 1fr;
    grid-template-rows: 32px;
    grid-template-areas: "toggle_open sidenav_logo .";

    .header-sidenav-logo {
      grid-area: sidenav_logo;
      text-align: center;
    }

    .header-sidenav-toggle {
      grid-area: toggle_open;
    }

    .header-sidenav-overlay {
      display: none;
    }

    // enabled nav layout
    &.header-sidenav-enabled {
      .header-sidenav-overlay {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: 100%;
        background-color: $white;
        z-index: 999999999;
        display: grid;
        grid-template-columns: 1fr 120px 1fr;
        grid-template-rows: 32px auto;
        grid-template-areas: "toggle_close overlay_logo ." "sidebar_menu sidebar_menu sidebar_menu";
      }

      .header-sidenav-overlay-logo {
        grid-area: overlay_logo;
        text-align: center;
        align-self: center;
      }

      .header-sidenav-overlay-toggle {
        grid-area: toggle_close;
        align-self: center;
      }

      .header-sidenav-overlay-menu {
        grid-area: sidebar_menu;
      }
    }
  }

  /* Tabnav Navigation */
  @media (min-width: $breakMD) {
    // disable sidenav
    [class^="header-sidenav-"] {
      display: none !important;
    }

    // containers

    .header-tabnav-tablinks-wrapper {
      background-color: $white;
    }

    .header-tabnav-tabcontent-wrapper {
      background-color: $brand;
      box-shadow: 0 0.025em 0.05em 0 rgba($darkBlue, 0.5);
    }

    .header-tabnav-tablinks-container,
    .header-tabnav-tabcontent-container {
      @include container($containerOuter);
    }

    // tabnav layout
    .header-tabnav-tablinks-container {
      display: grid;
      grid-template-columns: 1fr 240px 1fr;
      grid-template-rows: 32px;
      grid-template-areas: "tablinks . .";
      align-items: center;
    }

    .header-tabnav-tabcontent-container {
      display: grid;
      grid-template-columns: 1fr 240px 1fr;
      grid-template-rows: 60px;
      grid-template-areas: "tabcontent tabnav_logo .";
      align-items: center;
    }

    .header-tabnav-logo {
      grid-area: tabnav_logo;
      text-align: center;
    }

    .header-tabnav-tablinks-links {
      grid-area: tablinks;
      @include nav-row(0.5em);
    }

    .header-tabnav-tabcontent-links {
      grid-area: tabcontent;
      @include nav-row(0.5em);
    }
  }
}
</style>

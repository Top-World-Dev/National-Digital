<template>
  <div class="xy-header is-expanded">
    <div class="header-sidenav-logo"><v-image :source="blok.image['0']"></v-image></div>
    <div class="header-sidenav-toggle"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 12"><g fill="none" fill-rule="evenodd"><path d="M-3-6h24v24H-3z"/><path fill="#fff" fill-rule="nonzero" d="M0 0h18v2H0V0m0 5h18v2H0V5m0 5h18v2H0v-2z"/></g></svg></div>
    <div class="header-sidenav-overlay">
      <div class="header-sidenav-overlay-navbar">
        <div class="header-sidenav-overlay-logo"><v-image :source="blok.image['0']"></v-image></div>
        <div class="header-sidenav-overlay-toggle"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14"><g fill="none" fill-rule="evenodd"><path d="M-5-5h24v24H-5z"/><path fill="#fff" fill-rule="nonzero" d="M14 1.41L12.59 0 7 5.59 1.41 0 0 1.41 5.59 7 0 12.59 1.41 14 7 8.41 12.59 14 14 12.59 8.41 7z"/></g></svg></div>
      </div>
      <div class="header-sidenav-overlay-menu">
      <div class="header-sidenav-tablinks-wrapper">
        <div class="header-sidenav-tablinks-container">
          <ul class="header-sidenav-tablinks-links">
            <li v-for="tab in blok.nav" :class="{ 'is-active': isActive == tab._uid }" :key="tab._uid"><a @click="selectTab(tab)">{{ tab.title }}</a></li>
          </ul>
        </div>
        <div class="header-sidenav-tabcontent-wrapper">
          <div class="header-sidenav-tabcontent-container">
            <div class="header-sidenav-logo"><v-image :source="blok.image['0']"></v-image></div>
              <ul class="header-sidenav-tabcontent-links" v-if="isActive == nav._uid" v-for="nav in blok.nav" :key="nav._uid">
                <li v-for="item in nav.item" :key="item._uid">
                  <g-link v-if="item.link.linktype == 'story'" :to="item.link.url">{{ item.title }}</g-link>
                  <a v-else :href="item.link.url" rel="noopener noreferrer">{{ item.title }}</a>
                  <ul v-if="item.subitem.length > 0" class="header-sidenav-tabcontent-sublinks">
                    <li v-for="subitem in item.subitem" :key="item._uid">
                      <g-link v-if="subitem.link.linktype == 'story'" :to="subitem.link.url">{{ subitem.title }}</g-link>
                      <a v-else :href="subitem.link.url" rel="noopener noreferrer">{{ subitem.title }}</a>
                    </li>
                  </ul>
                </li>
              </ul>
          </div>
        </div>
      </div>
      </div>
    </div>
    <div class="header-tabnav-tablinks-wrapper">
      <div class="header-tabnav-tablinks-container">
        <ul class="header-tabnav-tablinks-links">
          <li v-for="tab in blok.nav" :class="{ 'is-active': isActive == tab._uid }"><a @click="selectTab(tab)">{{ tab.title }}</a></li>
        </ul>
      </div>
      <div class="header-tabnav-tabcontent-wrapper">
        <div class="header-tabnav-tabcontent-container">
          <div class="header-tabnav-logo"><v-image :source="blok.image['0']"></v-image></div>
          <ul class="header-tabnav-tabcontent-links" v-if="isActive == nav._uid" v-for="nav in blok.nav">
            <li v-for="item in nav.item">{{ item.title }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["blok"],
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
    grid-template-rows: 60px;
    grid-template-areas: "toggle_open sidenav_logo .";
    align-items: center;

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
    &.is-expanded {
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
        grid-template-columns: 1fr;
        grid-template-rows: 60px auto;
        grid-template-areas: "sidebar_navbar" "sidebar_menu";
      }

      .header-sidebar-overlay-navbar {
        grid-area: sidebar_navbar;
      }
      .header-sidenav-overlay-menu {
        grid-area: sidebar_menu;
      }

      .header-sidenav-overlay-navbar {
        display: grid;
        grid-template-columns: 1fr 120px 1fr;
        grid-template-rows: 60px;
        grid-template-areas: "toggle_close overlay_logo .";
        align-items: center;
      }

      .header-sidenav-overlay-logo {
        grid-area: overlay_logo;
        text-align: center;
      }

      .header-sidenav-overlay-toggle {
        grid-area: toggle_close;
      }

    }

    .header-sidenav-overlay-navbar {
      background-color: $brand;
      box-shadow: 0 0.05em 0.1em 0 rgba($darkBlue, 0.5);
    }

    // styles
    .header-sidenav-toggle, .header-sidenav-overlay-toggle {
      margin: 0.5rem;
      svg {
        height: 1.375rem;
        width: auto;
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

<template>

  <div class="xy-header">
    <div class="header-sidenav-logo"><v-image :source="blok.image['0']"></v-image></div>
    <div class="header-sidenav-toggle">TOGGLE</div>
    <div class="header-sidenav-overlay">
      <div class="header-sidenav-overlay-logo"><v-image :source="blok.image['0']"></v-image></div>
      <div class="header-sidenav-overlay-toggle">TOGGLE</div>
      <div class="header-sidenav-overlay-menu">
        <!-- <ul>
          <li v-for="itemParent in blok.nav">{{itemParent.title}}</li>
          <ul>
            <li v-for="item in itemParent.item">{{item.title}}</li>
          </ul>
        </ul> -->
      </div>
    </div>
    <div class="header-tabnav-tablinks-wrapper">
      <div class="header-tabnav-tablinks-container">
        <ul class="header-tabnav-tablinks-links">
          <li v-for="tab in blok.nav" :class="{ 'is-active': isActive == tab._uid }" :key="tab._uid"><a @click="selectTab(tab)">{{ tab.title }}</a></li>
        </ul>
      </div>
      <div class="header-tabnav-tabcontent-wrapper">
        <div class="header-tabnav-tabcontent-container">
          <div class="header-tabnav-logo"><v-image :source="blok.image['0']"></v-image></div>
            <ul class="header-tabnav-tabcontent-links" v-if="isActive == nav._uid" v-for="nav in blok.nav" :key="nav._uid">
              <li v-for="item in nav.item" :key="item._uid">
                <g-link v-if="item.link.linktype == 'story'" :to="item.link.url">{{ item.title }}</g-link>
                <a v-else :href="item.link.url" rel="noopener noreferrer">{{ item.title }}</a>
                <ul v-if="item.subitem.length > 0" class="header-tabnav-tabcontent-sublinks">
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
</template>

<script>
export default {
  props: ["blok"],
  data() {
    return {
      isActive: '7432fc6d-7637-4628-9978-9c90b4abe6b0'
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
      align-items: end;
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
      @include nav-row(0em);
    }

    .header-tabnav-tabcontent-links {
      grid-area: tabcontent;
      @include nav-row(0em);
    }

    // subnav

    .header-tabnav-tabcontent-links > li {
      .header-tabnav-tabcontent-sublinks {
        display: none;
      }
      &:hover {
        position: relative;
        background-color: $accent;
        .header-tabnav-tabcontent-sublinks {
          // logic
          display: block;
          position: absolute;
          top: 2.4rem;
          left: 0rem;
          // format
          @include nav-col(0.5rem);
          width: 220px;
          a {
            display: block;
            padding-top: 0.5em;
            padding-bottom: 0.5em;
            padding-left: 1.5em;
          }
        }
      }
    }

    // styles

    .header-tabnav-tablinks-links > li {
      font-size: 0.875rem;
      margin-bottom: 0;
      a {
        color: $brand;
        text-decoration: none;
        padding: 0.5em 1.25em 0.5em 1.25em;
        border-top-left-radius: 0.25em;
        border-top-right-radius: 0.25em;
      }
      &.is-active {
        a {
          background-color: $brand;
          color: $white;
        }
      }
    }

    .header-tabnav-tabcontent-links > li {
      font-size: 1rem;
      margin-bottom: 0;
      padding: 0.5em 1.25em 0.5em 1.25em;
      border-top-left-radius: 0.25em;
      border-top-right-radius: 0.25em;
      a {
        color: $white;
        text-decoration: none;
      }
    }

    .header-tabnav-tabcontent-sublinks {
      font-size: 0.875rem;
      background-color: $white;
      border-top: 0.5em solid $accent;
      border-bottom: 0.25em solid $white;
      border-top-right-radius: 0.25em;
      border-bottom-right-radius: 0.25em;
      border-bottom-left-radius: 0.25em;
      li a {
        color: $black;
        text-decoration: none;
      }
      li:hover {
        background-color: $lightGrey;
      }
    }
  }
}
</style>

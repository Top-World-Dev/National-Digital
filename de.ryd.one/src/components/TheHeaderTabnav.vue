<template>
  <section class="xy-tabnav">
    <div class="tabnav-tablinks-wrapper">
      <div class="tabnav-tablinks-container">
        <ul class="tabnav-tablinks-links">
          <li v-for="tab in content" :class="{ 'is-active': isActive == tab._uid }"><a @click="selectTab(tab)">{{ tab.title }}</a></li>
        </ul>
      </div>
      <div class="tabnav-tabcontent-wrapper">
        <div class="tabnav-tabcontent-container">
          <div class="tabnav-logo"><v-image :source="logo"></v-image></div>
            <ul class="tabnav-tabcontent-links" v-if="isActive == nav._uid" v-for="nav in content">
              <li v-for="item in nav.item">
                <g-link v-if="item.link.linktype == 'story'" :to="item.link.cached_url">{{ item.title }}</g-link>
                <a v-else :href="item.link.url" rel="noopener noreferrer">{{ item.title }}</a>
                <ul v-if="item.subitem.length > 0" class="tabnav-tabcontent-sublinks">
                  <li v-for="subitem in item.subitem">
                    <g-link v-if="subitem.link.linktype == 'story'" :to="subitem.link.cached_url">{{ subitem.title }}</g-link>
                    <a v-else :href="subitem.link.url" rel="noopener noreferrer">{{ subitem.title }}</a>
                  </li>
                </ul>
              </li>
            </ul>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  props: ['content', 'logo'],
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
.xy-tabnav {
  /* Sidebar Navigation */
  @media (max-width: $breakMD - 1px) {
    // disable tabnav
    [class^="tabnav-"] {
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
    .header-sidenav-toggle,
    .header-sidenav-overlay-toggle {
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

    .tabnav-tablinks-wrapper {
      background-color: $white;
    }

    .tabnav-tabcontent-wrapper {
      background-color: $brand;
      box-shadow: 0 0.025em 0.05em 0 rgba($darkBlue, 0.5);
    }

    .tabnav-tablinks-container,
    .tabnav-tabcontent-container {
      @include container($containerOuter);
    }

    // tabnav layout
    .tabnav-tablinks-container {
      display: grid;
      grid-template-columns: 1fr 240px 1fr;
      grid-template-rows: 32px;
      grid-template-areas: "tablinks . .";
      align-items: end;
    }
    .tabnav-tabcontent-container {
      display: grid;
      grid-template-columns: 1fr 240px 1fr;
      grid-template-rows: 60px;
      grid-template-areas: "tabcontent tabnav_logo .";
      align-items: center;
    }
    .tabnav-logo {
      grid-area: tabnav_logo;
      text-align: center;
    }
    .tabnav-tablinks-links {
      grid-area: tablinks;
      @include nav-row(0em);
    }
    .tabnav-tabcontent-links {
      grid-area: tabcontent;
      @include nav-row(0em);
    }

    // subnav
    .tabnav-tabcontent-links > li {
      .tabnav-tabcontent-sublinks {
        display: none;
      }
      &:hover {
        position: relative;
        z-index: 999999999;
        .tabnav-tabcontent-sublinks {
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
    .tabnav-tablinks-links > li {
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
    .tabnav-tabcontent-links > li {
      font-size: 1rem;
      margin-bottom: 0;
      padding: 0.5em 1.25em 0.5em 1.25em;
      border-top-left-radius: 0.25em;
      border-top-right-radius: 0.25em;
      a {
        color: $white;
        text-decoration: none;
      }
      &:hover {
        background-color: $accent;
      }
    }
    .tabnav-tabcontent-sublinks {
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
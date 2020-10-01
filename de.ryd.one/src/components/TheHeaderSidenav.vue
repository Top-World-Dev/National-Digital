<template>
  <section class="xy-sidenav" :class="{ 'is-expanded': showNavigation}">
    <div class="sidenav--logo"><v-image :source="logo"></v-image></div>
    <div class="sidenav--toggle" @click="toggleNav(true)"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 12"><g fill="none" fill-rule="evenodd"><path d="M-3-6h24v24H-3z"/><path fill="#fff" fill-rule="nonzero" d="M0 0h18v2H0V0m0 5h18v2H0V5m0 5h18v2H0v-2z"/></g></svg></div>
    <div class="sidenav--overlay">
      <div class="sidenav--overlay-navbar">
        <div class="sidenav--overlay-logo"><v-image :source="logo"></v-image></div>
        <div class="sidenav--overlay-toggle"@click="toggleNav(false)" ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14"><g fill="none" fill-rule="evenodd"><path d="M-5-5h24v24H-5z"/><path fill="#fff" fill-rule="nonzero" d="M14 1.41L12.59 0 7 5.59 1.41 0 0 1.41 5.59 7 0 12.59 1.41 14 7 8.41 12.59 14 14 12.59 8.41 7z"/></g></svg></div>
      </div>
      <div class="sidenav--overlay-menu">
        <div class="sidenav--tablinks-wrapper">
          <div class="sidenav--tablinks-container">
            <ul class="sidenav--tablinks-links" v-for="tab in content" :class="{ 'is-active': isActive == tab._uid }">
              <li><a @click="selectTab(tab)">{{ tab.title }}</a>
                <ul class="sidenav--tabcontent-sublinks" >
                  <li v-for="item in tab.item">
                    <g-link v-if="item.link.linktype == 'story'" :to="item.link.cached_url">{{ item.title }}</g-link>
                    <a v-else :href="item.link.url" rel="noopener noreferrer">{{ item.title }}</a>
                    <ul v-if="item.subitem.length > 0">
                      <li v-for="subitem in item.subitem">
                        <g-link v-if="subitem.link.linktype == 'story'" :to="subitem.link.cached_url">{{ subitem.title }}</g-link>
                        <a v-else :href="subitem.link.url" rel="noopener noreferrer">{{ subitem.title }}</a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
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
      isActive: '7bf1391b-faf3-4647-b7ce-2f631781f55c',
      showNavigation: false
    }
  },
  methods: {
    selectTab(item) {
      this.isActive = item._uid
    },
    toggleNav(action) {
      this.showNavigation = action;
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/styles.scss";
.xy-sidenav {
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

    .sidenav--logo {
      grid-area: sidenav_logo;
      text-align: center;
    }

    .sidenav--toggle {
      grid-area: toggle_open;
    }

    .sidenav--overlay {
      display: none;
    }

    // enabled nav layout
    &.is-expanded {
      .sidenav--overlay {
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
      .sidenav--overlay-menu {
        grid-area: sidebar_menu;
      }

      .sidenav--overlay-navbar {
        display: grid;
        grid-template-columns: 1fr 120px 1fr;
        grid-template-rows: 60px;
        grid-template-areas: "toggle_close overlay_logo .";
        align-items: center;
      }

      .sidenav--overlay-logo {
        grid-area: overlay_logo;
        text-align: center;
      }

      .sidenav--overlay-toggle {
        grid-area: toggle_close;
      }
    }

    .sidenav--overlay-navbar {
      background-color: $brand;
      box-shadow: 0 0.05em 0.1em 0 rgba($darkBlue, 0.5);
    }

    // styles
    .sidenav--toggle,
    .sidenav--overlay-toggle {
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
    [class^="sidenav--"] {
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
        z-index: 999999999;
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
      &:hover {
        background-color: $accent;
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
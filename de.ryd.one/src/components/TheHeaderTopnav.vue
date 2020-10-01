<template>
  <section class="xy-topnav">
    <div class="topnav-tabs">
      <div class="topnav-tabs-container">
        <ul class="topnav-tabs-links">
          <li v-for="tab in content" :class="{ 'is-active': isActive == tab._uid }"><a @click="selectTab(tab)">{{ tab.title }}</a></li>
        </ul>
      </div>
    </div>
    <div class="topnav-menu">
      <div class="topnav-menu-container">
        <div class="topnav-logo"><g-link to="/"><v-image :source="logo"></v-image></g-link></div>
          <ul class="topnav-menu-links" v-if="isActive == nav._uid" v-for="nav in content">
            <li v-for="item in nav.item">
              <g-link v-if="item.link.linktype == 'story'" :to="item.link.cached_url">{{ item.title }}</g-link>
              <a v-else :href="item.link.url" rel="noopener noreferrer">{{ item.title }}</a>
              <ul v-if="item.subitem.length > 0" class="topnav-tabcontent-sublinks">
                <li v-for="subitem in item.subitem">
                  <g-link v-if="subitem.link.linktype == 'story'" :to="subitem.link.cached_url">{{ subitem.title }}</g-link>
                  <a v-else :href="subitem.link.url" rel="noopener noreferrer">{{ subitem.title }}</a>
                </li>
              </ul>
            </li>
          </ul>
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
.xy-topnav {

  .topnav-tabs-container,
  .topnav-menu-container {
    @include container($containerOuter);
  }

  // topnav layout
  .topnav-tabs-container {
    display: grid;
    grid-template-columns: 1fr 240px 1fr;
    grid-template-rows: 32px;
    grid-template-areas: "topnav_tabs . .";
    align-items: end;
  }
  .topnav-menu-container {
    display: grid;
    grid-template-columns: 1fr 240px 1fr;
    grid-template-rows: 60px;
    grid-template-areas: "topnav_menu topnav_logo .";
    align-items: center;
  }
  .topnav-logo {
    grid-area: topnav_logo;
    text-align: center;
  }
  .topnav-tabs-links {
    grid-area: topnav_tabs;
    @include nav-row(0em);
  }
  .topnav-menu-links {
    grid-area: topnav_menu;
    @include nav-row(0em);
  }

  // subnav
  .topnav-menu-links > li {
    padding-bottom: 1em;
    .topnav-tabcontent-sublinks {
      display: none;
    }
    &:hover {
      position: relative;
      z-index: 10;
      .topnav-tabcontent-sublinks {
        // logic
        display: block;
        position: absolute;
        top: 1.3rem;
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

  .topnav-tabs {
    background-color: $white;
  }

  .topnav-menu {
    background-color: $brand;
    box-shadow: 0 0.025em 0.05em 0 rgba($darkBlue, 0.5);
  }

  // tabs
  .topnav-tabs-links > li {
    font-size: 0.875rem;
    font-weight:600;
    margin-bottom: 0;
    a {
      color: $brand;
      background-color: transparent;
      border: 0 solid transparent;
      text-decoration: none;
      padding: 0.5em 1.25em 0.5em 1.25em;
      border-top-left-radius: 0.25em;
      border-top-right-radius: 0.25em;
    }
    &.is-active {
      a {
        color: $white;
        background-color: $brand;
        border-color: $brand;

      }
    }
  }
  // main nav
  .topnav-menu-links > li {
    font-size: 1rem;
    margin-bottom: 0;
    margin-left: 0.25rem;
    margin-right: 0.25rem;
    > a {
      color: $white;
      border: 0 solid transparent;
      text-decoration: none;
      padding: 0.5em 1.25em 0.5em 1.25em;
      border-top-left-radius: 0.25em;
      border-top-right-radius: 0.25em;
    }
    > a.active, &:hover > a {
        background-color: $accent;
        border-radius: 0.5rem;
        color: $brand;
        // transition: background-color 0.2s ease-out; 
    }
  }
  .topnav-tabcontent-sublinks {
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
</style>
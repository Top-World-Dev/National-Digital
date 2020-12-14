<template>
  <section class="xy-topnav">
    <div class="topnav-tabs">
      <div class="topnav-tabs-container">
        <ul class="topnav-tabs-links">
          <li v-for="tab in content" 
            :class="{ 'is-active': isActive == tab._uid }" 
            :data-name="tab._uid"
            @mouseover="showNav(tab._uid)"
            @mouseleave="hideNav(tab.uid)"

          ><g-link :to="tab.self.cached_url" @click="selectTab(tab)">{{ tab.title }}</g-link></li>
        </ul>
      </div>
    </div>
    <div class="topnav-menu">
      <div class="topnav-menu-container" 
        @mouseover="showParent()"
        @mouseleave="hideParent()">
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
import EventBus from '../eventbus';
export default {
  props: ['content', 'logo'],
  data() {
    return {
      isActive: '',
      isChild: false,
      hovered: '',
    }
  },
  methods: {
    showNav(id) {
      if(!this.isChild) {
        this.isActive = id;
        this.hovered = id;
      } 
    },
    hideNav(id) {
      if(!this.isChild) {
        this.isActive = '';
      } 
    },
    showParent(id) {
      if(this.hovered.length > 0) {
        this.isActive = this.hovered;
      } 
    },
    hideParent(id) {
      if(!this.isChild) {
        this.isActive = '';
        this.hovered = '';
      } 
    }
  },
  mounted() {
    if (this.$route.path.length == 1 || this.$route.path.split('/').includes('ryd-pay')) {
      this.isChild = true;
      this.isActive = '7432fc6d-7637-4628-9978-9c90b4abe6b0';
    } else if(this.$route.path.split('/').includes('ryd-box')) {
      this.isActive =  '7bf1391b-faf3-4647-b7ce-2f631781f55c';
      this.isChild = true;

    } else {
      this.isActive = '';
      this.isChild = false;
    }
  }
};
</script>
<style lang="scss">
@import "~/assets/styles.scss";
.xy-topnav {
  position: relative;

  .topnav-tabs-container,
  .topnav-menu-container {
    @include container($containerOuter);
  }

  // topnav layout
  .topnav-tabs-container {
    display: grid;
    grid-template-columns: 1fr auto auto;
    grid-template-rows: 32px;
    grid-template-areas: "topnav_tabs . .";
    align-items: end;
  }
  .topnav-menu-container {
    display: grid;
    align-items: center;
    grid-template-columns: 1fr auto 240px;
    grid-template-rows: 60px;
    grid-template-areas: "topnav_menu . topnav_logo";
  }
  .topnav-logo {
    grid-area: topnav_logo;
    div {
      display: flex;
      align-items: center;
      justify-content: flex-end; // logo right
      margin-right: 1rem;
    }
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
    // padding-bottom: 1em;
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
  .topnav-menu-links {
    > li {
      font-size: 1rem;
      margin-top: 0.5rem;
      margin-bottom: 0.5rem;
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
          opacity: unset;
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
}
</style>
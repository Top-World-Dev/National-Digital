<template>
  <section class="xy-sidenav" :class="{ 'is-expanded': showNavigation}">
    <div class="sidenav-navbar">
      <div class="sidenav-logo"><v-image :source="logo"></v-image></div>
      <div class="sidenav-toggle-open"><span class="sidenav-toggle" @click="toggleNav(true)" role="button" tabindex="0"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 12"><g fill="none" fill-rule="evenodd"><path d="M-3-6h24v24H-3z"/><path fill="#fff" fill-rule="nonzero" d="M0 0h18v2H0V0m0 5h18v2H0V5m0 5h18v2H0v-2z"/></g></svg></span></div>
      <div class="sidenav-toggle-close"><span class="sidenav-toggle" @click="toggleNav(false)" role="button" tabindex="0"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14"><g fill="none" fill-rule="evenodd"><path d="M-5-5h24v24H-5z"/><path fill="#fff" fill-rule="nonzero" d="M14 1.41L12.59 0 7 5.59 1.41 0 0 1.41 5.59 7 0 12.59 1.41 14 7 8.41 12.59 14 14 12.59 8.41 7z"/></g></svg></span></div>
    </div>
    <div class="sidenav-menu">
      <ul class="sidenav-menu-alpha" v-for="tab in content" :key="tab._uid" :class="{'is-expanded' : active.includes(tab._uid)}">
        <li><a @click="accordion(tab)" :class="tab.title">{{ tab.title }}</a>
          <ul class="sidenav-menu-beta">
            <span @click="accordion(tab)" class="sidenav-menu-toggle" role="button" tabindex="0"><span class="sidenav-menu-arrow" :class="{'is-expanded' : active.includes(tab._uid)}"></span></span>
            <li v-for="item in tab.item">
              <g-link v-if="item.link.linktype == 'story'" :to="item.link.cached_url"><span @click="accordion(item)">{{ item.title }}</span></g-link>
              <a @click="accordion(item)" v-else :href="item.link.url" rel="noopener noreferrer">{{ item.title }}</a>
              <ul v-if="item.subitem.length > 0" class="sidenav-menu-gamma" :class="{'is-expanded' : active.includes(item._uid)}">
                <span @click="accordion(item)" class="sidenav-menu-toggle" role="button" tabindex="0"><span class="sidenav-menu-arrow" :class="{'is-expanded' : active.includes(item._uid)}"></span></span>
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
  </section>
</template>
<script>
export default {
  props: ['content', 'logo'],
  data() {
    return {
      showNavigation: false,
      active: []
    }
  },
  methods: {
    selectTab(item) {
      this.isActive = item._uid
    },
    toggleNav(action) {
      this.showNavigation = action;
    },
    accordion(tab) {
      console.log(tab);
      (this.active.includes(tab._uid)) ? this.active = this.active.filter(item => item !== tab._uid) : this.active.push(tab._uid);
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/styles.scss";

/* Normal Layout */
.xy-sidenav:not(.is-expanded) {
  
  .sidenav-navbar {
    display: grid;
    grid-template-columns: 1fr 120px 1fr;
    grid-template-rows: 60px;
    grid-template-areas: "sidenav_toggle sidenav_logo .";
    align-items: center;
  }
  .sidenav-logo {
    grid-area: sidenav_logo;
    text-align: center;
  }

  .sidenav-toggle-open {
    grid-area: sidenav_toggle;
  }

  .sidenav-toggle-close {
    display:none;
  }
  
  .sidenav-menu {
    display:none;
  }

}

/* Expanded Layout */
.xy-sidenav.is-expanded {
  // expand everywhere
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: $white;
  z-index: 999999999;

  // main layout
  .sidenav-navbar {
    display: grid;
    grid-template-columns: 1fr 120px 1fr;
    grid-template-rows: 60px;
    grid-template-areas: "sidenav_toggle sidenav_logo .";
    align-items: center;
  }

  .sidenav-logo {
    grid-area: sidenav_logo;
    text-align: center;
  }

  .sidenav-toggle-open {
    display:none;
  }

  .sidenav-toggle-close {
    grid-area: sidenav_toggle;
  }
  
  .sidenav-menu {
    display: block;
  }

  /* Submenu logic */

  .sidenav-menu-alpha {
    > li > ul > li {
      display: none;
    }
    &.is-expanded {
      > li, > li > ul, > li > ul > li {
        display: block;
      }
    }
  }

  .sidenav-menu-beta {
    > li > ul > li {
      display: none;
    }
    &.is-expanded {
      > li, > li > ul, > li > ul > li {
        display: block;
      }
    }
  }

  .sidenav-menu-gamma {
    > li > ul > li {
      display: none;
    }
    &.is-expanded {
      > li, > li > ul {
        display: block;
      }
    }
  }

}



/* Styles */

.xy-sidenav {

  .sidenav-navbar {
    background-color: $brand;
    box-shadow: 0 0.05em 0.1em 0 rgba($darkBlue, 0.5);
  }

  .sidenav-toggle {
    display: inline-block;
    margin: 0.5rem;
    svg {
      height: 1.375rem;
      width: auto;
    }
  }

  .sidenav-menu ul {
    @include no-list;
    a {
      display: block;
      text-decoration: none;
    }
    li {
      position: relative;
    }
  }

  .sidenav-menu-toggle {
    position: absolute;
    right: 1.5rem;
    top: 0.5rem;
  }

  .sidenav-menu-beta {
    .sidenav-menu-arrow {
      border: solid white;
      border-width: 0 0.25em 0.25em 0;
      display: inline-block;
      padding: 0.25em;
      transform: rotate(45deg);
      &.is-expanded {
        transform: rotate(-135deg);
      }
    }
  }

  .sidenav-menu-gamma {
    .sidenav-menu-arrow {
      border: solid $brand;
      border-width: 0 0.25em 0.25em 0;
      display: inline-block;
      padding: 0.25em;
      transform: rotate(45deg);
      &.is-expanded {
        transform: rotate(-135deg);
      }
    }
  }

  .sidenav-menu-alpha > li {
    > a {
      color: $white;
      background-color: $brand;
      font-size: 1rem;
      padding: .5em 0 .5em 1em;
    }
  }
  .sidenav-menu-beta > li {
    &.is-active a {
      background-color: $accent;
    }
    > a {
      color: $brand;
      background-color: $white;
      font-size: 1rem;
      padding: 0.5em 0 0.5em 2em;
    }
  }
  .sidenav-menu-gamma > li {
    > a {
      color: $brand;
      background-color: $white;
      font-size: 0.875rem;
      padding: 0.25em 0 0.25em 3em;
      // &.active {
      //   background-color: $lightGrey;
      // }
    }
  }


}
</style>
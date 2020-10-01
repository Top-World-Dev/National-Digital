<template>
  <section :class="{ 'is-expanded': showNavigation}">
    <div class="header-sidenav-logo"><v-image :source="logo"></v-image></div>
    <div class="header-sidenav-toggle" @click="toggleNav(true)"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 12"><g fill="none" fill-rule="evenodd"><path d="M-3-6h24v24H-3z"/><path fill="#fff" fill-rule="nonzero" d="M0 0h18v2H0V0m0 5h18v2H0V5m0 5h18v2H0v-2z"/></g></svg></div>
    <div class="header-sidenav-overlay">
      <div class="header-sidenav-overlay-navbar">
        <div class="header-sidenav-overlay-logo"><v-image :source="logo"></v-image></div>
        <div class="header-sidenav-overlay-toggle"@click="toggleNav(false)" ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14"><g fill="none" fill-rule="evenodd"><path d="M-5-5h24v24H-5z"/><path fill="#fff" fill-rule="nonzero" d="M14 1.41L12.59 0 7 5.59 1.41 0 0 1.41 5.59 7 0 12.59 1.41 14 7 8.41 12.59 14 14 12.59 8.41 7z"/></g></svg></div>
      </div>
      <div class="header-sidenav-overlay-menu">
        <div class="header-sidenav-tablinks-wrapper">
          <div class="header-sidenav-tablinks-container">
            <ul class="header-sidenav-tablinks-links" v-for="tab in content" :class="{ 'is-active': isActive == tab._uid }">
              <li><a @click="selectTab(tab)">{{ tab.title }}</a>
                <ul class="header-sidenav-tabcontent-sublinks" >
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
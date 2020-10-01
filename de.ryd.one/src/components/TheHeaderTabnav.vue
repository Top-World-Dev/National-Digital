<template>
  <div class="header-tabnav-tablinks-wrapper">
    <div class="header-tabnav-tablinks-container">
      <ul class="header-tabnav-tablinks-links">
        <li v-for="tab in content" :class="{ 'is-active': isActive == tab._uid }"><a @click="selectTab(tab)">{{ tab.title }}</a></li>
      </ul>
    </div>
    <div class="header-tabnav-tabcontent-wrapper">
      <div class="header-tabnav-tabcontent-container">
        <div class="header-tabnav-logo"><v-image :source="logo"></v-image></div>
          <ul class="header-tabnav-tabcontent-links" v-if="isActive == nav._uid" v-for="nav in content">
            <li v-for="item in nav.item">
              <g-link v-if="item.link.linktype == 'story'" :to="item.link.url">{{ item.title }}</g-link>
              <a v-else :href="item.link.url" rel="noopener noreferrer">{{ item.title }}</a>
              <ul v-if="item.subitem.length > 0" class="header-tabnav-tabcontent-sublinks">
                <li v-for="subitem in item.subitem">
                  <g-link v-if="subitem.link.linktype == 'story'" :to="subitem.link.url">{{ subitem.title }}</g-link>
                  <a v-else :href="subitem.link.url" rel="noopener noreferrer">{{ subitem.title }}</a>
                </li>
              </ul>
            </li>
          </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['content', 'logo'],
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
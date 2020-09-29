<template>
  <ul class="v-linklist" v-editable="blok" :class="blok.style">
    <li v-for="item in blok.item" v-bind:key="item.text">
      <g-link v-if="item.link.linktype == 'story'" :to="item.link.url"><g-image v-if="item.icon.id" :src="item.imageUrl" class="linklist-icon"></g-image><span>{{ item.title }}</span></g-link>
      <a v-else :href="item.link.url" rel="noopener noreferrer"><g-image v-if="item.icon.id" :src="item.imageUrl" class="linklist-icon"></g-image><span>{{ item.title }}</span></a>
    </li>
  </ul>
</template>
<script>
export default {
  props: ["blok"],
  computed: {
    getImage() {
      return this.blok.item.map((item) => {
        if (item.icon) {
          if (typeof item.icon == "object") {
            item.imageUrl = require(`!!assets-loader?width=16&height=16!@media/${item.icon.filename.filename}`);
          } else {
            let image = item.icon.split("/").pop();
            item.imageUrl = require(`!!assets-loader?width=16&height=16!@media/${file}`);
          }
        }
        return item;
      });
    },
  },
};
</script>
<style lang="scss">
@import '~/assets/styles.scss';
.v-linklist {
  font-size: 0.875rem;
  @include no-list;
  text-align: left;
  &.linklist-inline {
    @include nav-row(0.25rem);
    li::before {
      content: "• ";
    }
  }
  &.linklist-block {
    @include nav-col(0.25rem);
  }
  .linklist-icon {
    display: inline;
    margin-right: 0.25rem;
  }
  a {
    text-decoration: none;
  }
}
</style>
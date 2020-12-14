<template>
  <ul class="v-linklist" v-editable="blok" :class="[blok.style]">
    <li class="linklist-item" v-for="item in blok.item" :key="item._uid">
      <v-image v-if="item.image['0']" class="linklist-icon" :source="item.image['0']"></v-image>
      <g-link v-if="item.link.linktype == 'story'" :to="item.link.cached_url">{{ item.title }}</g-link>
      <a v-else-if="item.link.url.length > 0" :href="item.link.url" rel="noopener noreferrer">{{ item.title }}</a>
      <a v-else :href="item.link.url.url" target="_blank">{{ item.title }}</a>    
    </li>
  </ul>
</template>
<script>
export default {
  props: ["blok"]
};
</script>
<style lang="scss">
@import '~/assets/styles.scss';
.v-linklist {
  font-size: 0.875rem;
  @include no-list;
  .linklist-item {
    display: flex;
  }
  > .listlist-icon {
    margin-right: 1rem;
  }
  // format
  &.linklist-inline {
    @include nav-row(0.25rem);
    margin-top: 1rem;
    margin-bottom: 1rem;
    li::before {
      content: "• ";
    }
  }
  &.linklist-block {
    @include nav-col(0.25rem);
    margin-bottom: 1rem;
  }
  // // align
  // &.linklist-align-left {
  //   text-align: left;
  // }
  // &.linklist-align-center {
  //   text-align: center;
  // }
  // &.linklist-align-right {
  //   text-align: right;
  // }
  // style
  .linklist-icon {
    display: inline;
    margin-right: 0.25rem;
  }
}
</style>
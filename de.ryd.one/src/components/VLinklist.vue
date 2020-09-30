<template>
  <ul class="v-linklist" v-editable="blok" :class="[blok.style,blok.align]">
    <li v-for="item in blok.item" :key="item._uid">
      <g-link v-if="item.link.linktype == 'story'" :to="item.link.url"><v-image v-if="item.image.id" :source="item.image" class="linklist-icon"></v-image> <span>{{ item.title }}</span></g-link>
      <a v-else :href="item.link.url" rel="noopener noreferrer"><v-image v-if="item.image.id" :source="item.image" class="linklist-icon"></v-image><span>{{ item.title }}</span></a>
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
  text-align: left;
  // format
  &.linklist-inline {
    @include nav-row(0.25rem);
    li::before {
      content: "• ";
    }
  }
  &.linklist-block {
    @include nav-col(0.25rem);
  }
  // align
  &.linklist-align-left {
    text-align: left;
  }
  &.linklist-align-center {
    text-align: center;
  }
  &.linklist-align-right {
    text-align: right;
  }
  // style
  .linklist-icon {
    display: inline;
    margin-right: 0.25rem;
  }
  a {
    text-decoration: none;
  }
}
</style>
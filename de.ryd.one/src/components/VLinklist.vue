<template>
  <ul class="v-linklist" v-editable="blok" :class="blok.style">
    <li v-for="item in blok.item" v-bind:key="item.text">
      <g-link v-if="item.link.linktype == 'story'" :to="item.link.url"><span class="linklist-icon" v-if="item.icon">YEAH</span><span>{{ item.title }}</span></g-link>
      <a v-else :href="item.link.url" target="_blank" rel="noopener noreferrer"><span class="linklist-icon" v-if="item.icon">YEAH</span><span>{{ item.title }}</span></a>
    </li>
  </ul>
</template>
<script>
  export default {
    props: ['blok']
  }
</script>
<style lang="scss">
@import '~/assets/styles.scss';
.v-linklist {
  font-size: 0.875rem;
  @include no-list;
  text-align: left;
  &.linklist-inline {
    @include nav-row(0.75rem);
  }
  &.linklist-block {
    @include nav-col(0.25rem);
  }
  .linklist-icon {
    display: inline;
    margin-right: 0.5rem;
  }
  a {
    text-decoration: none;
  }
}
</style>
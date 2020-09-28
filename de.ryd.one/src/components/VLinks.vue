<template>
  <ul class="v-links" v-editable="blok">
    <li v-for="item in blok.item" :class="blok.style" v-bind:key="item.text">
      <span>
        <g-link v-if="item.link.linktype == 'story'" :to="item.link.url">{{ item.title }}</g-link>
        <a v-else :href="item.link.url" target="_blank" rel="noopener noreferrer">{{ item.title }}</a>
      </span>
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
.v-links {
  font-size: 0.875rem;
  @include no-list;
  text-align: left;
  .links-inline {
    @include nav-row(0.5rem);
  }
  .links-block {
    @include nav-col(0.5rem);
  }
  a {
    text-decoration: none;
  }
}
</style>
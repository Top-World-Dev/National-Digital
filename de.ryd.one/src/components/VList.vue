<template>
  <ul class="v-list" v-editable="blok">
    <li>
      <h6 v-if="blok.item.title">{{ blok.item.title }}</h6>
      <span v-if="blok.item.content">{{ blok.item.content }}</span>
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
.v-list {
  @include no-list;
}
</style>
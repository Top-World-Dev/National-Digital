<template>
  <ul class="v-list" v-editable="blok">
    <li v-for="item in blok.item">
      <h6 v-if="item.title">{{ item.title }}</h6>
      <span v-if="item.content">{{ item.content }}</span>
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
  h6 {
    margin-top: unset;
    margin-bottom: unset;
  }
}
</style>
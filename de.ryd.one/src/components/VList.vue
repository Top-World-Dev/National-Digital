<template>
  <ul class="v-list" v-editable="blok">
    <li v-for="item in blok.item" :key="item._uid">
      <h5 v-if="item.title">{{ item.title }}</h5>
      <v-richtext v-if="item.content" :style="(item.title ? '' : 'display:block')" :text="item.content"></v-richtext>
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
  font-size: 0.875rem;
  @include no-list;
  text-align: left;
  h5 {
    margin-left: 1.5rem;
  }
  span {
    margin-left: 1.5rem;
  }
  li {
    position: relative;
    &:before {
      position: absolute;
      top: 0.2rem;
      left: 0;
      content: '';
      display: inline-block;
      height: 1rem;
      width: 1rem;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath fill='%2300e9b9' d='M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z'/%3E%3C/svg%3E");
      background-size: contain;
      background-repeat: no-repeat;
    }
  }
}
</style>
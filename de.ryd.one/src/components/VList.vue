<template>
  <ul class="v-list" v-editable="blok" :class="blok.align">
    <li v-for="item in blok.item" :key="item._uid">
      <div class="list-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 14"><g fill="none" fill-rule="evenodd"><path d="M-4-5h24v24H-4z"/><path fill="#00ebbc" fill-rule="nonzero" d="M17.5 1.41l-12 12L0 7.91 1.41 6.5l4.09 4.08L16.09 0z"/></g></svg></div>
      <div class="list-content" :class="blok.style">
        <tag :is="blok.style" v-if="item.title">{{ item.title }}</tag>
        <v-richtext v-if="item.content" :style="(item.title ? '' : 'display:block')" :text="item.content"></v-richtext>
      </div>
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
  li {
    display: flex;
    align-items: flex-start;
  }
  .list-icon svg {
    width: 1rem;
    height: auto;
    margin-right: 0.5rem;
    margin-top: 0.5rem;
  }
  .list-content {
    display: flex;
    flex-direction: column;
  }
  // align
  &.list-align-left li {
    justify-content: flex-start;
  }
  &.list-align-center li {
    justify-content: center;
  }
  &.list-align-right li {
    justify-content: flex-end;
  }
}
</style>
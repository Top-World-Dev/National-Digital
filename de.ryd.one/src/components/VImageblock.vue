<template>
  <div class="v-imageblock" :class="blok.style" v-editable="blok">
    <div class="imageblock-item" v-for="item in blok.item" :key="item._uid">
      <template v-if="item.link.url == ''">
        <v-image :source="item"></v-image>
      </template>
      <template v-else-if="item.link.linktype == 'story'">
        <g-link :to="item.link.url"><v-image :source="item"></v-image></g-link>
      </template>
      <template v-else-if="item.link.linktype == 'url'">
        <a :href="item.link.url" rel="noopener noreferrer"><v-image :source="item"></v-image></a>
      </template>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['blok']
  }
</script>
<style lang="scss">
@import '~/assets/styles.scss';
.v-imageblock {
  display: flex;
  &.imageblock-column {
    flex-direction: column;
  }
  &.imageblock-row {
    flex-direction: row;
    justify-content: center;
    .imageblock-item {
      margin-left: 0.375rem;
      margin-right: 0.375rem;
    }
  }
}
</style>
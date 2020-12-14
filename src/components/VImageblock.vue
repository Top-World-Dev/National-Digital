<template>
  <div class="v-imageblock" :class="blok.style" v-editable="blok">
    <div class="imageblock-item" :class="blok.effect" v-for="item in blok.image" :key="item._uid">
    <div v-if="item.link.linktype == 'url'">
      <a v-if="item.link.url.length > 0" :href="item.link.url" rel="noopener noreferrer"><v-image :source="item"></v-image></a>
      <a v-else :href="item.link.url.url" target="_blank"><v-image :source="item"></v-image></a>
    </div>
    <div v-else-if="item.link.linktype == 'story' && item.link.cached_url.length > 0" > 
      <g-link :to="item.link.cached_url"><v-image :source="item"></v-image></g-link>
    </div>
    <div v-else>
      <v-image :source="item"></v-image>
    </div>
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
  .imageblock-rounded img {
    border-radius: 1rem;
  }
}
</style>
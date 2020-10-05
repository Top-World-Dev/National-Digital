<template>
  <div class="v-imageblock" :class="blok.style" v-editable="blok">
    <div class="imageblock-item" :class="blok.effect" v-for="item in blok.image" :key="item._uid">
    <template v-if="item.link.url.length > 0">
      <g-link v-if="item.link.linktype == 'story'" :to="item.link.url"><v-image :source="item"></v-image></g-link>
      <a v-else :href="item.link.url" rel="noopener noreferrer"><v-image :source="item"></v-image></a>
    </template>
    <template v-else>
      <v-image :source="item"></v-image>
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
  .imageblock-rounded img {
    border-radius: 1rem;
  }
}
</style>
<template>
  <div class="v-imageblock" v-editable="blok">
    <div class="imageblock-item" v-for="item in getImage" v-bind:key="item.title">
      <template v-if="item.link.url == ''">
        <g-image :src="item.imageUrl"></g-image>
      </template>
      <template v-else-if="item.link.linktype == 'story'">
        <g-link :to="item.link.url"><g-image :src="item.imageUrl"></g-image></g-link>
      </template>
      <template v-else-if="item.link.linktype == 'url'">
        <a :href="item.link.url" target="_blank" rel="noopener noreferrer"><g-image :src="item.imageUrl"></g-image></a>
      </template>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['blok'],
    computed: {
      getImage () {
        return this.blok.item.map(item => {
          if(typeof item.image == 'object') {
            item.imageUrl = require(`!!assets-loader?width=${item.image.width}&height=${item.image.height}!@media/${item.image.filename.filename}`);
          } else {
            let image = item.image.split("/").pop(); 
            item.imageUrl = require(`!!assets-loader?width=${item.image.width}&height=${item.image.height}!@media/${file}`)
          }
          return item
        });
      }
    }
  }
</script>
<style lang="scss">
@import '~/assets/styles.scss';
.v-imageblock {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  .imageblock-item {
    border: 0.5rem solid transparent;
  }
}
</style>
<template>
  <div class="v-imageblock" v-editable="blok">
    <div class="imageblock-item" v-for="item in getImage" :key="item._uid">
      <template v-if="item.link.url == ''">
        <g-image :src="item.imageUrl"></g-image>
      </template>
      <template v-else-if="item.link.linktype == 'story'">
        <g-link :to="item.link.url"><g-image :src="item.imageUrl"></g-image></g-link>
      </template>
      <template v-else-if="item.link.linktype == 'url'">
        <a :href="item.link.url" rel="noopener noreferrer"><g-image :src="item.imageUrl"></g-image></a>
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
            let image = require(`!!assets-loader!@media/${item.image.filename.filename}`);
            image.size.height = parseInt(item.height);
            image.size.width = parseInt(item.width);
            item.imageUrl = image;
          } else {
            let imageName = item.image.split("/").pop(); 
            let image = require(`!!assets-loader!@media/${imageName}`);
            image.size.height = parseInt(item.height);
            image.size.width = parseInt(item.width);
            item.imageUrl = image;
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

}
</style>
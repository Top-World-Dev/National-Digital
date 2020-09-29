<template>
  <div class="v-blurbicon" v-editable="blok">
    <div class="blurbicon-item" v-for="item in getImage" v-bind:key="item.title">
      <g-image :src="item.imageUrl"></g-image>
      <h5 v-if="item.title">{{ item.title }}</h5>
      <div v-if="item.content">{{ item.content }}</div>
    </div>
</div>
</template>
<script>
  export default {
    props: ['blok'],
    computed: {
      getImage () {
        return this.blok.item.map(item => {
          if(item.icon) {
            if(typeof item.icon == 'object') {
              item.imageUrl = require(`!!assets-loader?width=100&height=100!@media/${item.icon.filename.filename}`);
            } else {
              let image = item.icon.split("/").pop(); 
              item.imageUrl = require(`!!assets-loader?width=100&height=100!@media/${file}`)
            }
          }
          return item
        });
      }
    }
  }
</script>
<style lang="scss">
@import '~/assets/styles.scss';
.v-blurbicon {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
  .blurbicon-item {
    flex: 0 0 320px;
    margin: 1rem;
  }
}
</style>
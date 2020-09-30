<template>
  <div class="v-imageblock" :class="blok.style" v-editable="blok">
    
    <div class="imageblock-item" v-for="item in blok.image" :key="item._uid">
       <v-image :source="item"></v-image>
       
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
<template>
  <div class="v-slider" :class="blok.style" v-editable="blok">
    {{ blok }}
  </div>
</template>
<script>
  export default {
    props: ['blok']
  }
</script>
<style lang="scss">
@import '~/assets/styles.scss';
.v-slider {
  
}
</style>
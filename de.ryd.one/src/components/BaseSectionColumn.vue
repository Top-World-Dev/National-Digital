<template>
  <section :id="blok.name" class="xy-column" :style="{backgroundImage: backgroundStyle}" :class="blok.backgroundColor">
      <div class="column-inner" :class="[blok.container,blok.align]">
        <component :key="blok._uid" v-for="blok in blok.block" :blok="blok" :is="blok.component"></component>
      </div>
  </section>
</template>

<script>
  import backgroundImage from '../mixins/backgroundImage'
  export default {
    mixins: [backgroundImage],
    props: ['blok'],
  }
</script>

<style lang="scss">
@import '~/assets/styles.scss';
.xy-column {
  /* Background and Text Colors  */
  &.column-background-transparent {
    color: inherit;
    background-color: transparent;
  }
  /* Container Options */
  .column-container-none {
    width: 100%;
    height: auto;
  }
  /* Text alignment */
  .column-align-left {
    text-align: left;
  }
  .column-align-center {
    text-align: center;
  }
  .column-align-right {
    text-align: right;
  }
  .column-align-justify {
    text-align: justify;
  }
}
</style>
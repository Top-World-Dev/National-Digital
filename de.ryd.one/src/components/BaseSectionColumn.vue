<template>
  <section :id="blok.name" class="xy-column" :class="blok.valign">
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
  /* Vertical alignment */
  &.column-valign-top {
    align-self: flex-start;
  }
  &.column-valign-middle {
    align-self: center;
  }
  &.column-valign-bottom {
    align-self: flex-end;
  }
  /* Container Options */
  .column-container-none {
    width: 100%;
    height: auto;
  }
  .column-container-mleft {
    margin-left: 40%;
  }
  .column-container-mright {
    margin-right: 40%;
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
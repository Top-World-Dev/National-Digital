<template>
  <section :id="blok.name" class="xy-section" :style="{backgroundImage: backgroundStyle}" :class="blok.backgroundColor">
      <div class="section-inner" :class="[blok.container,blok.align]">
        <component :key="blok._uid" v-for="blok in blok.columns" :blok="blok" :is="blok.component"></component>
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
.xy-section {
  /* Background and Text Colors  */
  &.section-background-white {
    color: $black;
    background-color: $white;
  }
  &.section-background-brandgradient {
    color: $white;
    background-color: $brand;
    background-position: bottom center;
    background-size: cover;
    background-repeat: no-repeat;
    a {
      color: $accent;
    }
  }
  &.section-background-accentblock {
    color: $white;
    background-color: $accent;
    background-position: bottom center;
    background-size: cover;
    background-repeat: no-repeat;
    a {
      color: $accent;
    }
  }
  /* Container Options */
  .section-container-none {
    width: 100%;
    height: auto;
  }
  .section-container-large {
    @include container($containerOuter);
    padding-top: 8em;
    padding-bottom: 8em;
  }
  .section-container-normal {
    @include container($container);
    padding-top: 6em;
    padding-bottom: 6em;
  }
  .section-container-small {
    @include container($containerInner);
    padding-top: 4em;
    padding-bottom: 4em;
  }
  /* Flex layouts */
  .section-inner {
    display: flex;
    flex-direction: row;
    > * {
      flex: 1 1 0px;
    }
  }
  .section-align-left {
    justify-content: flex-start;
  }
  .section-align-center {
    justify-content: center;
  }
  .section-align-right {
    justify-content: flex-end;
  }
  .section-align-justify {
    justify-content: space-between;
  }
}
</style>
<template>
  <section :id="blok.name" class="xy-section" :style="backgroundStyle ? {backgroundImage: backgroundStyle} : ''" :class="blok.backgroundColor" v-editable="blok">
      <div class="section-inner section-container" :class="[blok.container,blok.align,`section-${countCols}`,(blok.reverse ? 'column-reverse' : '' ),(blok.mobile_fullwidth ? 'column-fullmobile' : '')]">
        <component :key="blok._uid" v-for="blok in blok.columns" :blok="blok" :is="blok.component"></component>
      </div>
  </section>
</template>

<script>
  import backgroundImage from '../mixins/backgroundImage'
  export default {
    mixins: [backgroundImage],
    props: ['blok', 'viewPort'],
    computed: {
      countCols() {
        return (this.blok.columns.length > 1 ? 'multi' : 'single')
      }
    }
  }

</script>

<style lang="scss">
@import '~/assets/styles.scss';
.xy-section {
  /* Background and Text Colors  */
  &.section-background-brandblock {
    color: $white;
    border-color: $brand;
    background-color: $brand;
    a {
      color: $accent;
      &:hover {
        transition: 0.1s all;
        opacity: 0.85;
        border-color: $accent;
      }
    }
  }
  &.section-background-brandgradient {
    color: $white;
    border-color: $brand;
    background-color: $brand;
    background-position: center right;
    background-size: cover;
    background-repeat: no-repeat;
    a {
      color: $accent;
      &:hover {
        transition: 0.1s all;
        opacity: 0.85;
        border-color: $accent;
      }
    }
  }
  &.section-background-transparent {
    color: $veryDarkGrey;
    border-color: transparent;
    background-color: transparent;
    a {
      color: $accent;
      &:hover {
          transition: 0.1s all;
          border-color: $accent;
      }
    }
  }
  &.section-background-white {
    color: $veryDarkGrey;
    border-color: $white;
    background-color: $white;
    a {
      color: $accent;
      &:hover {
          transition: 0.1s all;
          border-color: $accent;
      }
    }
  }
  /* Container Options */
  // mobile default
  @media (max-width: $breakColumns - 1px) { 
    .section-container:not(.column-fullmobile) { 
      @include container($breakColumns);
    }
  }
  // desktop options
  @media (min-width: $breakColumns) {
    .section-container-none {
      width: 100%;
      height: auto;
    }
    .section-container-large {
      @include container($containerOuter);
      &.section-multi > * {
        margin: 1rem;
      }
    }
    .section-container-normal {
      @include container($container);
      &.section-multi > * {
        margin: 1rem;
      }
    }
    .section-container-small {
      @include container($containerInner);
      &.section-multi > * {
        margin: 1rem;
      }
    }
  }
  /* Flex layouts - mobile */
  @media (max-width: $breakColumns - 1px) {
    .section-multi.section-inner {
      display: flex;
      flex-direction: column;
      &.column-reverse {
        flex-direction: column-reverse;
      }
    }
  }
  /* Flex layouts - desktop */
  @media (min-width: $breakColumns) {
    .section-multi.section-inner {
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
}
</style>
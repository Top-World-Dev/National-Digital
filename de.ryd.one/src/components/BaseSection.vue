<template>
  <section :id="blok.name" class="xy-section" :style="{backgroundImage: backgroundStyle}" :class="blok.backgroundColor">
      <div class="section-inner section-container" :class="[blok.container,blok.align,(blok.reverse ? 'column-reverse' : '' )]">
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
    background-position: bottom right;
    background-size: 66.67%;
    background-repeat: no-repeat;
    background-image: linear-gradient(90deg, rgba(46, 50, 131, 1) 70%, rgba(58, 147, 191, 0.67) 100%);
    a {
      color: $accent;
    }
  }
  &.section-background-brandblock {
    color: $white;
    background-color: $brand;
    background-position: bottom center;
    background-size: cover;
    background-repeat: no-repeat;
    a {
      color: $accent;
    }
  }
  /* Container Options */
  // mobile default
  @media (max-width: $breakColumns - 1px) { 
    .section-container { 
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
      > * {
        margin: 1rem;
      }
    }
    .section-container-normal {
      @include container($container);
      > * {
        margin: 1rem;
      }
    }
    .section-container-small {
      @include container($containerInner);
      > * {
        margin: 1rem;
      }
    }
  }
  /* Flex layouts - mobile */
  @media (max-width: $breakColumns - 1px) {
    .section-inner {
      display: flex;
      flex-direction: column;
      &.column-reverse {
        flex-direction: column-reverse;
      }
    }
  }
  /* Flex layouts - desktop */
  @media (min-width: $breakColumns) {
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
}
</style>
<template>
  <section v-if="loaded" :id="blok.name" class="xy-column" :class="[blok.valign, blok.container]">
    <div class="column-inner column-container" :class="[blok.align_mobile, blok.align_desktop]">
      <component :key="blok._uid" v-for="blok in blok.block" :blok="blok" :is="blok.component"></component>
    </div>
  </section>
</template>

<script>

import backgroundImage from "../mixins/backgroundImage";
export default {
  mixins: [backgroundImage],
  props: ["blok"],
  data() {
    return {
      loaded: false
    }
  },
  mounted() {
    let components = this.blok.block.map(item => item.component);
    for(let component of components) {
      this.$options.components[`${component}`] = require(`./${component}`).default
    }
    this.loaded = true;
  }
};
</script>

<style lang="scss">
@import "~/assets/styles.scss";
.xy-column {
  /* Layouts */
  @media (min-width: $breakColumns) {
    /* Vertical alignment (desktop) */
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
    &.column-container-none {
      // width: 100%;
      // height: auto;
    }
    &.column-container-mleft {
      .column-container {
        margin-left: 40%;
        margin-right: 1.5rem;
      }
    }
    &.column-container-mright {
      .column-container {
        margin-left: 1.5rem;
        margin-right: 40%;
      }
    }
    &.column-container-reset {
      margin-left: 0px;
      margin-right: 0px;
    }
    &.column-container-padding {
      .column-container {
        margin-left: 5rem;
        margin-right: 5rem;
      }
    }
  }
  /* Text alignment */
  @media (max-width: $breakColumns - 1px) {
    .column-mobile-align-left {
      text-align: left;
    }
    .column-mobile-align-center {
      text-align: center;
    }
    .column-mobile-align-right {
      text-align: right;
    }
    .column-mobile-align-justify {
      text-align: justify;
    }
  }
  @media (min-width: $breakColumns) {
    .column-desktop-align-left {
      text-align: left;
    }
    .column-desktop-align-center {
      text-align: center;
    }
    .column-desktop-align-right {
      text-align: right;
    }
    .column-desktop-align-justify {
      text-align: justify;
    }
  }
  
}
</style>
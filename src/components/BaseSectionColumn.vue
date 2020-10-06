<template>
  <section :id="blok.name" class="xy-column" :class="[blok.valign]">
    <div class="column-inner column-container" :class="[blok.container, blok.align_mobile, blok.align_desktop]">
      <component :key="blok._uid" v-for="blok in blok.block" :blok="blok" :is="blok.component"></component>
    </div>
  </section>
</template>

<script>
import backgroundImage from "../mixins/backgroundImage";
export default {
  mixins: [backgroundImage],
  props: ["blok"],
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
    .column-container-none {
      // width: 100%;
      // height: auto;
    }
    .column-container-mleft {
      margin-left: 40%;
      margin-right: 1.5rem;
    }
    .column-container-mright {
      margin-left: 1.5rem;
      margin-right: 40%;
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
<template>
  <section :id="blok.anchor" class="xy-section section-beta" :style="{backgroundImage: backgroundStyle}" :class="(blok.backgroundStyle == 'is-null' ? '' : 'section-white')">
      <div class="section-column">
        <div :class="blok.container" v-editable="blok"> 
          <component :key="blok._uid" v-for="blok in blok.col1" :blok="blok" :is="blok.component"></component>
        </div>
      </div>
      <div class="section-column">
          <div :class="blok.container" v-editable="blok">
            <component :key="blok._uid" v-for="blok in blok.col2" :blok="blok" :is="blok.component"></component>
          </div>
      </div>
  </section>
</template>

<script>
  import backgroundImage from '../mixins/backgroundImage'
  export default {
    mixins: [backgroundImage],
    props: ['blok']
  }
</script>

<style lang="scss">
@import "~/assets/styles.scss";
.xy-section.section-beta {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column; // mobile first
  text-align: center;
  @media (min-width: $breakMD) {
    flex-direction: row;
    .section-column {
      margin-left: 1rem;
      margin-right: 1rem;
      flex: 0 1 49%;
    }
  }
}
</style>
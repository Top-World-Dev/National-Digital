<template>
  <section :id="blok.anchor" class="xy-section section-alpha" :style="{backgroundImage: backgroundStyle}" :class="(blok.backgroundColor == 'is-null' ? '' : 'section-background')">
      <div class="section-column">
        <div class="section-center" :class="blok.container" v-editable="blok">
          <component :key="blok._uid" v-for="blok in blok.col1" :blok="blok" :is="blok.component"></component>
        </div>
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
.xy-section.section-alpha {
  .section-center {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
}
</style>
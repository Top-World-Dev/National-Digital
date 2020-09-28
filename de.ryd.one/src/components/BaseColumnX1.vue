<template>
  <section :id="blok.anchor" class="xy-section section-alpha" :style="{backgroundImage: backgroundStyle}" :class="(blok.backgroundStyle == 'is-null' ? '' : 'section-white')">
      <div class="section-column">
        <div :class="blok.container" v-editable="blok"> 
          <component :key="blok._uid" v-for="blok in blok.col1" :blok="blok" :is="blok.component"></component>
        </div>
      </div>
  </section>
</template>

<script>
  import backgroundImage from '../mixins/shared'
  export default {
    mixins: [backgroundImage],
    props: ['blok'],
    data() {
      return {
      }
    },
  }
</script>

<style lang="scss">
@import '~/assets/styles.scss';
.xy-section.section-alpha {
  .section-container {
    @include container($container);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
}
</style>
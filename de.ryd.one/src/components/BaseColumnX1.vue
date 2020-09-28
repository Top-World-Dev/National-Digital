<template>
  <section class="xy-section section-alpha" :style="{backgroundImage: backgroundStyle}">
      <div class="section-container" v-editable="blok">
        <component :key="blok._uid" v-for="blok in blok.col1" :blok="blok" :is="blok.component"></component>
        <!-- // section ID
        // background image + drop-down select options 
        // code: style="linear-gradient(to ##TOP/RIGHT/BOTTOM/LEFT##, rgba(##COLOR SELECT##, ##TRANSPARENCY##), rgba(##COLOR SELECT##, ##TRANSPARENCY##)), url('## IMG SELECT ##');
        // choice of nested blocks -->

      </div>
  </section>
</template>

<script>
  export default {
    props: ['blok'],
    data() {
      return {

      }
    },
    methods: {
      assignColors(color) {
        switch (color) {
          case 'is-primary-horizontal':
            return `linear-gradient(to right, #2e3283 38%, rgba(34, 107, 172, 0.67) 89%)`
            break;
          case 'is-secondary-horizontal':
            return `linear-gradient(to left, #226bac, #2e3283 0%)`
            break;
          case 'is-primary-vertical':
            return `linear-gradient(to bottom, rgba(46, 50, 131, 0) 47%, #0d0e36 91%)`
            break;
          default:
            return `linear-gradient(180deg,rgba(255,255,255,1),rgba(255,255,255,1))`
        } 
      }
    },
    computed: {
      backgroundStyle() {
        let color = this.assignColors(this.blok.background_color);
        if(this.blok.background_image.filename) {
          return `${color}, url(${this.blok.background_image.filename})`;
        } else {
          return `${color}`;
        }
      }
    }
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
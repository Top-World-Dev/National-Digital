<template>
  <section class="xy-section section-alpha" :style="{backgroundImage: backgroundStyle}">
      <div class="section-container" v-editable="blok">
        <component :key="blok._uid" v-for="blok in blok.Col1" :blok="blok" :is="blok.component"></component>
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
          case 'is-dark':
            return `linear-gradient(180deg,rgba(0,0,0,.6),rgba(13,13,13,.6))`
            break;
          case 'is-light':
            return `linear-gradient(180deg,rgba(255,255,255,.6),rgba(13,13,13,.6))`
            break;
          default:
            return `linear-gradient(180deg,rgba(13,13,13,.6),rgba(13,13,13,.6))`
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
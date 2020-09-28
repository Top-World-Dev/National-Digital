<template>
  <section class="xy-section section-gamma">
    <div class="section-column">

        <div class="section-container">
          <component :key="blok._uid" v-for="blok in blok.col1" :blok="blok" :is="blok.component"></component>
            <!-- // section ID
            // background image + drop-down select options
            // optional no container
            FOR EACH COLUMN:
              // choice of nested blocks -->
        </div>
    </div>
    <div class="section-column">
        <div class="section-container">
          <component :key="blok._uid" v-for="blok in blok.col2" :blok="blok" :is="blok.component"></component>
        </div>
    </div>
    <div class="section-column">
        <div class="section-container">
          <component :key="blok._uid" v-for="blok in blok.col3" :blok="blok" :is="blok.component"></component> 
        </div>
    </div>
  </section>
</template>

<script>
  import backgroundImage from '../mixins/shared'
  export default {
    mixins: [backgroundImage],
    props: ['blok']
  }
</script>

<style lang="scss" scoped>
@import "~/assets/styles.scss";
.xy-section.section-gamma {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column; // mobile first
  text-align: center;
  @media (min-width: $breakMD) {
    flex-direction: row;
    .section-column {
      flex: 0 0 33.33333%;
    }
  }
  .section-column {
    @include container($container);
  }
}
</style>
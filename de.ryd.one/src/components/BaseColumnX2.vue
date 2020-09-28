<template>
  <section class="xy-section section-beta">
      <div class="section-column">
        <div class="section-container" v-editable="blok"> 
          <component :key="blok._uid" v-for="blok in blok.col1" :blok="blok" :is="blok.component"></component>
        </div>
            <!-- (option: no container)
              // section ID
              // FOR EACH COLUMN:
                // background image + drop-down select options
                // optional no container
                // choice of nested blocks -->
      </div>
      <div class="section-column">
          <div class="section-container">
            <component :key="blok._uid" v-for="blok in blok.col2" :blok="blok" :is="blok.component"></component>
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
  .section-column {
    @include container($container);
  }
}
</style>
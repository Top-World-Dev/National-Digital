<template>
  <section class="xy-section section-gamma">
    <div class="section-column">
        <div class="section-container">
          <component :key="blok._uid" v-for="blok in blok.Col1" :blok="blok" :is="blok.component"></component>
            <!-- // section ID
            // background image + drop-down select options
            // optional no container
            FOR EACH COLUMN:
              // choice of nested blocks -->
        </div>
    </div>
    <div class="section-column">
        <div class="section-container">
          <component :key="blok._uid" v-for="blok in blok.Col2" :blok="blok" :is="blok.component"></component>
        </div>
    </div>
    <div class="section-column">
        <div class="section-container">
          <component :key="blok._uid" v-for="blok in blok.Col3" :blok="blok" :is="blok.component"></component> 
        </div>
    </div>
  </section>
</template>

<script>
  export default {
    props: ['blok']
  }
</script>

<style lang="scss" scoped>
.xy-section {
  >div:nth-of-type(1) {
    background-color: red;
  }
  >div:nth-of-type(2) {
    background-color: blue;
  }
  >div:nth-of-type(3) {
    background-color: green;
  }
}
</style>
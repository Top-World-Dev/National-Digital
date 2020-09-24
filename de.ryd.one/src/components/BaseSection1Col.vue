<template>
  <section class="xy-section section-alpha">
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
    props: ['blok']
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
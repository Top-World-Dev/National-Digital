<template>
  <div class="v-slider" :class="blok.style" v-editable="blok">
    <template>
    <div>
      <VueSlickCarousel v-bind="carouselSettings">
        <div v-for="slide in blok.slide" :key="blok._uid">
          <h3>{{ slide.content }}</h3>
          <p>{{ slide.content }}</p>
        </div>
      </VueSlickCarousel>
    </div>
  </template>
  </div>
</template>
<script>
  import 'vue-slick-carousel/dist/vue-slick-carousel.css'
  
  // optional style for arrows & dots
  import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
  export default {
    props: ['blok'],
    components: {
    VueSlickCarousel: () =>
      import("vue-slick-carousel")
      .then((component) => component)
      .catch(),
    },
    data() {
      return {
        carouselSettings: {
          "centerMode": true,
          "centerPadding": "20px",
          "focusOnSelect": true,
          "infinite": true,
          "slidesToShow": 3,
          "speed": 500,
          "dots": true,
          "arrows": false
        }
      }
    }
  }
</script>
<style lang="scss">
@import '~/assets/styles.scss';
.v-slider {
  padding: 2em;
  text-align: center;
  color: white;
  overflow: hidden;  
  .slick-list {
    width: 90vw!important;
  }
}
</style>
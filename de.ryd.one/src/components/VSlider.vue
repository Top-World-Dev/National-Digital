<template>
  <div class="v-slider" :class="blok.style" v-editable="blok">
      <VueSlickCarousel v-bind="carouselSettings">
        <div v-for="slide in blok.slide" :key="blok._uid">
          <component :key="blok._uid" v-for="blok in slide.block" :blok="blok" :is="blok.component"></component>
        </div>
      </VueSlickCarousel>
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
          centerMode: true,
          focusOnSelect: true,
          infinite: true,
          slidesToShow: 3,
          slidesToScroll: 1,
          speed: 500,
          dots: false,
          dotsClass: "slick-dots",
          arrows: true,
          responsive: [
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
              },
            }
          ],
        }
      }
    }
  }
</script>
<style lang="scss">
@import '~/assets/styles.scss';
.v-slider {
}
</style>
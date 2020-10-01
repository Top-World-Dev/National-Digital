<template>
  <div class="v-reviewslider" :class="blok.style" v-editable="blok">
    <template>
    <div>
      <VueSlickCarousel v-bind="carouselSettings">
        <div v-for="slide in blok.slide" :key="blok._uid">
          <div class="reviewslider-wrapper">
            <div class="reviewslider-source"><div>Google Play Store</div><div>⭐⭐⭐⭐⭐</div></div>
            <div class="reviewslider-content">
              <h5>{{ slide.author }}</h5>
              <div>&quot;{{ slide.content }}&quot;</div>
            </div>
          </div>
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
          "centerPadding": "1rem",
          "focusOnSelect": true,
          "infinite": true,
          "slidesToShow": 5,
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
.v-reviewslider {
  padding: 2em;
  text-align: center;
  color: white;
  overflow: hidden;
  /* Slick Slider styles */
  .slick-list {
    width: 90vw!important;
    margin-left: auto;
    margin-right: auto;
  }
  .reviewslider-wrapper {
    color: $black;
    background-color: $white;
    border-radius: .5rem;
    margin: 0 1.5rem 3rem;
    width: 20rem;
    display: flex;
    flex-direction: column;
    position: relative;
    padding: 0.5em 1em 1em 1em;
  }
  .reviewslider-source {
    display: flex;
    justify-content: space-between;
  }
  .reviewslider-content {
    text-align: left;
    margin-top: 1rem;
  }
}
</style>
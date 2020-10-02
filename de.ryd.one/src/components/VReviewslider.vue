<template>
  <div class="v-reviewslider" :class="blok.style" v-editable="blok">
    <div class="reviewslider-overlay"></div>
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
          "centerPadding": "2rem",
          "focusOnSelect": true,
          "infinite": true,
          "slidesToShow": 3,
          "speed": 500,
          "dots": true,
          "dotsClass": "slick-dots reviewslider-content-dot",
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
  position: relative;

  .reviewslider-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, rgba($white,0) 28%, rgba($brand,1) 75%, rgba($brand,1) 86%);
    z-index:10;

  }

  /* Slick Slider styles */
  .slick-list {
    width: 75vw!important;
    margin-left: auto;
    margin-right: auto;
  }
  .reviewslider-wrapper {
    color: $black;
    background-color: $white;
    border-radius: .5rem .5rem 0.5rem 0;
    margin: 0 auto 3rem;
    width: 20rem;
    min-height: 200px;
    display: flex;
    flex-direction: column;
    position: relative;
    padding: 0.5em 1em 1em 1em;
    &:after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 0;
      height: 0;
      border: 32px solid transparent;
      border-right-color: #ffffff;
      border-left: 0;
      border-bottom: 0;
      margin-bottom: -4px;
      margin-left: -26px;
        transform: skewY(-20deg);
    }
  }
  .reviewslider-source {
    display: flex;
    justify-content: space-between;
    color: $grey;
  }
  .reviewslider-content {
    text-align: left;
    margin-top: 1rem;
    color: $veryDarkGrey;
  }

  .slick-dots.reviewslider-content-dot li {
    z-index: 11;
    &.slick-active {
      button:before {
        color: $accent;
      }
    }
    button:before {
      font-size: 0.5rem;
    }
  }
}
</style>
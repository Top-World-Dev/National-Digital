<template>
  <div class="v-slider" :class="blok.style" v-editable="blok">
      <VueSlickCarousel v-bind="carouselSettings">
        <div v-for="slide in blok.slide" :key="blok._uid">
          {{ slide }}
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
          centerPadding: "2rem",
          focusOnSelect: true,
          infinite: true,
          slidesToShow: 3,
          slidesToScroll: 3,
          speed: 500,
          dots: true,
          dotsClass: "slick-dots slider-content-dot",
          arrows: false,
          responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 1440,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
              },
            },
          ],
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
  position: relative;

  .slider-overlay {
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
    margin-left: auto;
    margin-right: auto;
    @media (min-width: $breakMD ) {
      width: 75vw!important;
    }
  }
  .slider-wrapper {
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
  .slider-source {
    display: flex;
    justify-content: space-between;
    color: $grey;
  }
  .slider-content {
    text-align: left;
    margin-top: 1rem;
    color: $veryDarkGrey;
  }

  .slick-dots.slider-content-dot li {
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
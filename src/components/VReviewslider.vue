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
          accessibility: true,
          adaptiveHeight: false,
          arrows: false,
          asNavFor: null,
          autoplay: false,
          autoplaySpeed: 5000,
          centerMode: true,
          centerPadding: "0px",
          cssEase: "ease",
          customPaging: undefined,
          dots: true,
          dotsClass: "slick-dots reviewslider-content-dot",
          draggable: true,
          edgeFriction: 0.35,
          fade: false,
          focusOnSelect: false,
          infinite: true,
          initialSlide: 0,
          lazyLoad: null,
          pauseOnDotsHover: false,
          pauseOnFocus: false,
          pauseOnHover: true,
          rows: 1,
          rtl: false,
          slidesPerRow: 1,
          slidesToScroll: 1,
          slidesToShow: 3,
          speed: 500,
          swipe: true,
          swipeToSlide: false,
          touchMove: true,
          touchThreshold: 5,
          useCSS: true,
          useTransform: true,
          variableWidth: false,
          vertical: false,
          waitForAnimate: true,
          responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
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
.v-reviewslider {
  text-align: center;
  color: white;
  overflow: hidden;
  position: relative;

  .reviewslider-overlay {
    pointer-events: none;
    background: transparent;
    z-index:10;
    @media (min-width: 1024px) {
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: radial-gradient(circle, rgba(46, 50, 131, 0) 34%, rgba(46, 50, 131,0.65) 34%, rgba(46, 50, 131, 1) 66%);
    }
  }

  /* Slick Slider styles */
  .slick-list {
    margin-left: auto;
    margin-right: auto;
    @media (min-width: $breakColumns ) {
      width: 75vw;
    }
    @media (min-width: $breakColumns ) {
      width: 98vw;
    }
  }
  .reviewslider-wrapper {
    color: $black;
    background-color: $white;
    border-radius: .5rem .5rem 0.5rem 0;
    margin: 0 auto 3rem auto;
    height: 100%;
    min-height: 200px;
    max-width:80%;
    display: flex;
    flex-direction: column;
    position: relative;
    padding: 0.5em 1em 1em 1em;
    @media (min-width: $breakColumns ) {
      margin: 0 2rem 3rem 2rem;

    }
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
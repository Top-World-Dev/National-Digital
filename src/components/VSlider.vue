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
import "vue-slick-carousel/dist/vue-slick-carousel.css";
// optional style for arrows & dots
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
export default {
  props: ["blok"],
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
        arrows: true,
        asNavFor: null,
        autoplay: false,
        autoplaySpeed: 5000,
        centerMode: true,
        centerPadding: "0px",
        cssEase: "ease",
        customPaging: undefined,
        dots: false,
        dotsClass: "slick-dots",
        draggable: true,
        edgeFriction: 0.35,
        fade: false,
        focusOnSelect: true,
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
              slidesToScroll: 2,
            },
          },
        ],
      },
    };
  },
};
</script>
<style lang="scss">
@import '~/assets/styles.scss';
.v-slider {
  overflow-x: hidden;
  width: auto;
  .slick-arrow {
    &::before {
      color: $accent;
    }
    &.slick-prev {
      left: 0rem;
    }
    &.slick-next {
      right: 0rem;
    }
  }
  .slick-slide {
    div {
      outline: none;
      border: 0;
      border-color: transparent;
      &::focus {
        outline: none;
        border: 0;
        border-color: transparent;
      }
    }
  }
}
</style>
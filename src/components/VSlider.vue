<template>
  <div class="v-slider" :class="blok.style" v-editable="blok" :id="blok._uid">
    <div class="slider-wrapper">
      <div class="slider-overlay"></div>
      <VueSlickCarousel v-bind="carouselSettings" ref="carousel">
        <div v-for="slide in blok.slide" :key="blok._uid" @click="goTo($event)">
          <component
            :key="blok._uid"
            v-for="blok in slide.block"
            :blok="blok"
            :is="blok.component"
          ></component>
        </div>
      </VueSlickCarousel>
    </div>
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
  mounted() {
    this.carouselSettings.autoplaySpeed = Number(this.blok.duration) * 1000;

    if (process.isClient) {
      window.addEventListener('scroll', (event) => {
        if (document.getElementById(this.blok._uid) && this.isInViewport(document.getElementById(this.blok._uid))) {
          this.carouselSettings.autoplay = true;
        } else {
           this.carouselSettings.autoplay = false;
        }
      }, false);
    }
  },
  data() {
    return {
      carouselSettings: {
        accessibility: true,
        adaptiveHeight: false,
        arrows: true,
        asNavFor: null,
        autoplay: false,
        autoplaySpeed: 2000,
        centerMode: true,
        centerPadding: "0px",
        cssEase: "ease",
        customPaging: undefined,
        dots: true,
        dotsClass: "slick-dots",
        draggable: true,
        edgeFriction:   0.35,
        fade: false,
        focusOnSelect: true,
        infinite: true,
        initialSlide: 0,
        lazyLoad: null,
        pauseOnDotsHover: true,
        pauseOnFocus: true,
        pauseOnHover: true,
        rows: 1,
        rtl: false,
        slidesPerRow: 1,
        slidesToScroll: 1,
        slidesToShow: 5,
        speed: 500,
        swipe: true,
        swipeToSlide: true,
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
              slidesToShow: 3,
              slidesToScroll: 2,
            },
          },
        ],
      },
    };
  },
  methods: {
    goTo(e) {

      this.$refs.carousel.goTo(e.currentTarget.parentNode.parentNode.dataset.index)
    },
    isInViewport(elem) {
      let distance = elem.getBoundingClientRect();
      return (
        (distance.top >= -elem.offsetHeight) ||  (distance.top >= 0) &&
        distance.bottom <= (window.innerHeight || document.documentElement.clientHeight)

      );
    },
  }
};
</script>
<style lang="scss">
@import "~/assets/styles.scss";
.v-slider {
  overflow: hidden;
  padding-bottom: 2em;
  width: auto;
  position: relative;
  .slider-wrapper {
    @media (min-width: 1024px) {
      margin-left: -12%;
      margin-right: -10%;
      overflow: hidden;
    }
  }
  .slider-overlay {
    pointer-events: none;
    background: transparent;
    z-index: 10;
    @media (min-width: 1024px) {
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: radial-gradient(
        circle,
        rgba(219, 220, 230, 0) 26%,
        rgba(255, 255, 255, 0.5) 45%,
        rgba(255, 255, 255, 0.9) 80%
      );
    }
  }
  .slick-arrow {
    &::before {
      color: $accent;
    }
    &.slick-prev {
      display: none;
      @media (max-width: 769px) {
        left: 12%;
        z-index: 10;
      }
    }
    &.slick-next {
      display: none;
      @media (max-width: 769px) {
        right: 10%;
        z-index: 10;
      }
    }
  }
  .slick-slide {
    div {
      outline-color: transparent !important;
      outline-style: none !important;
      outline-width: 0px !important;
      border: 0;
      border-color: transparent;
      margin-left: 1rem;
      margin-right: 1rem;
      &:focus {
        outline-color: transparent !important;
        outline-style: none !important;
        outline-width: 0px !important;
        border: 0;
        border-color: transparent;
      }
    }
  }
  .slick-slide>div>div {
    margin-left: auto;
    margin-right: auto;
  }
  .slick-dots {
    bottom: 0 !important;
    li {
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
  a {
    outline: 0px solid transparent !important;
    &:focus {
      outline: 0px solid transparent !important;
    }
  }
}
</style>

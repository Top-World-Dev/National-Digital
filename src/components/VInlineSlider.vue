<template>
  <div class="v-inlineSlider">
    <div class="inlineSlider-content" :class="blok.style" v-editable="blok" :id="blok._uid">
      
      <VueSlickCarousel v-bind="carouselSettings">
        <div v-for="slide in blok.slide" :key="blok._uid" @click="goTo($event)">
          <component
            :key="blok._uid"
            v-for="blok in slide.block"
            :blok="blok"
            :is="blok.component"
          ></component>
        </div>
      </VueSlickCarousel>

      <div class="inlineSlider-overlay"></div>
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

    if (this.blok.autoplay) {
      this.carouselSettings.autoplay = true;
    } else {
      this.carouselSettings.autoplay = false;
    }
  },
  data() {
    return {
      carouselSettings: {
        accessibility: true,
        adaptiveHeight: false,
        arrows: false,
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
        slidesToShow: 1,
        speed: 500,
        swipe: true,
        swipeToSlide: true,
        touchMove: true,
        touchThreshold: 1,
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
              slidesToShow: 1,
              slidesToScroll: 1,
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
.v-inlineSlider{
  width: 212px;
  position: relative;
  margin: 0 auto;

  .inlineSlider-content {
    overflow-x: hidden;
    height:460px;

    .slick-slider.slick-initialized{
      height:440px;
      overflow: hidden;
    }

    .inlineSlider-overlay{
      width: 212px;
      height: 415px;
      background: url("../assets/ryd_payment_mockup.svg") no-repeat center;
      position: absolute;
      top:0;
    }

    .slick-list{
      margin-top: 12px;
      margin-left: 13px;
      height: 391px;
      background: #2e3283;
      width: 185px;
      margin-bottom: 12px;
    }

    img{
      height: 391px!important;
      width: 185px!important;

    }

    .slick-arrow {
      &::before {
        color: $accent;
      }
      &.slick-prev {
        left: 7rem;
        z-index: 10;
      }
      &.slick-next {
        right: 5rem;
        z-index: 10;
      }
    }

    .slick-dots {
      bottom: 0 !important;
      position: relative;
      li {
        z-index: 11;
        position: relative;
        margin: 0 2px!important;
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

}
</style>
<template>
  <div>
    <slot />
  </div>
</template>
<script>
import TheFooter from '~/components/TheFooter.vue'
import TheHeader from '~/components/TheHeader.vue'
import TheHeaderSection from '~/components/TheHeaderSection.vue'

import BaseSection from '~/components/BaseSection.vue'
import BaseSectionColumn from '~/components/BaseSectionColumn.vue'

import VButton from '~/components/VButton.vue'
import VBlurbicon from '~/components/VBlurbicon.vue'
import VGap from '~/components/VGap.vue'
import VHeading from '~/components/VHeading.vue'
import VIframe from '~/components/VIframe.vue'
import VImageblock from '~/components/VImageblock.vue'
import VImageoverlay from '~/components/VImageoverlay.vue'
import VJobs from '~/components/VJobs.vue'
import VLinklist from '~/components/VLinklist.vue'
import VList from '~/components/VList.vue'
import VMap from '~/components/VMap.vue'
import VReviewslider from '~/components/VReviewslider.vue'
import VReconsent from '~/components/VReconsent.vue'
import VRule from '~/components/VRule.vue'
import VSlider from '~/components/VSlider.vue'
import VTestimonial from '~/components/VTestimonial.vue'
import VText from '~/components/VText.vue'
import VForm from '~/components/VForm.vue'
import VVideo from '~/components/VVideo.vue'
import VRichtext from '~/components/VRichtext.vue'
import VImage from '~/components/VImage.vue'
import VPricing from '~/components/VPricing.vue'
import VAccordion from '~/components/VAccordion.vue'
import VInlineSlider from '~/components/VInlineSlider.vue'

export default {
  components: {
    TheFooter,
    TheHeader,
    TheHeaderSection,
    BaseSection,
    BaseSectionColumn,
    VButton,
    VBlurbicon,
    VHeading,
    VGap,
    VIframe,
    VImageblock,
    VImageoverlay,
    VJobs,
    VLinklist,
    VList,
    VMap,
    VReconsent,
    VReviewslider,
    VRule,
    VSlider,
    VTestimonial,
    VText,
    VVideo,
    VAccordion,
    VPricing,
    VInlineSlider,
    VImage,
    VRichtext
  }
}
</script>


<style lang="scss">
@import "~/assets/styles.scss";

/* Resets */

html {
  height: 100%;
  max-width: 100%;
}

html {
  font-size: $baseSize;
  font-feature-settings: "liga" 1;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

html {
  box-sizing: border-box;
  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }
}

body {
  font-size: 1rem;
  font-family: $baseFont;
  color: $black;
  background-color: $trueWhite;
  max-width: 100%;
  height: 100%;
}

img {
  max-width: 100%;
  height: auto;
}

a, button, [role="button"] {
  position: relative;
  cursor: pointer;
}

a {
  color: inherit;
  border-color: transparent;
  border-bottom-width: 0.1em;
  border-bottom-style: solid;
  text-decoration: none;
}

:focus {
  outline-color: transparent !important;
  outline-style: none !important;
  outline-width: 0px !important;
}



/* Font sizes */

body {
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.6em;
}

p {
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
}

h1, h2, h3, h4, h5, h6 {
  line-height: 1.4em;
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
}

h1 {
  font-size: 2rem;
  font-weight: 700;
  @media (min-width: $breakColumns) {
    font-size: 3.25rem;
  }
}

h2 {
  font-size: 2rem;
  font-weight: 700;
}

h3 {
  font-size: 2rem;
  font-weight: 400;
}

h4 {
  font-size: 1.5rem;
  font-weight: 700;
}

h5 {
  font-size: 1rem;
  font-weight: 700;
  @media (min-width: $breakColumns) {
    font-size: 1.25rem;
  }
}

h6 {
  font-size: 1rem;
  font-weight: 400;
  @media (min-width: $breakColumns) {
    font-size: 1.25rem;
  }
}


</style>

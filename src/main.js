// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

require('typeface-fira-sans');
import 'normalize.css/normalize.css'

import DefaultLayout from '~/layouts/Default.vue'

import Page from '~/components/Page.vue'

import TheFooter from '~/components/TheFooter.vue'
import TheHeader from '~/components/TheHeader.vue'
import TheHeaderSection from '~/components/TheHeaderSection.vue'

import BaseSection from '~/components/BaseSection.vue'
import BaseSectionColumn from '~/components/BaseSectionColumn.vue'

import VButton from '~/components/VButton.vue'
import VBlurbicon from '~/components/VBlurbicon.vue'
import VGap from '~/components/VGap.vue'
import VHeading from '~/components/VHeading.vue'
import VImageblock from '~/components/VImageblock.vue'
import VImageoverlay from '~/components/VImageoverlay.vue'
import VLinklist from '~/components/VLinklist.vue'
import VList from '~/components/VList.vue'
import VMap from '~/components/VMap.vue'
import VReviewslider from '~/components/VReviewslider.vue'
import VRule from '~/components/VRule.vue'
import VSlider from '~/components/VSlider.vue'
import VTestimonial from '~/components/VTestimonial.vue'
import VText from '~/components/VText.vue'
import VForm from '~/components/VForm.vue'

import VRichtext from '~/components/VRichtext.vue'
import VImage from '~/components/VImage.vue'

// mapping
import Vue from 'vue';
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';


export default function (Vue, { router, head, isClient }) {
  // Add a meta tag
  head.meta.push({
    name: 'keywords',
    content: 'global from the main.js'
  })

  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)

  // register components
  Vue.component('Page', Page)

  // global elements
  Vue.component('TheFooter', TheFooter)
  Vue.component('TheHeader', TheHeader)
  Vue.component('TheHeaderSection', TheHeaderSection)

  // base layouts
  Vue.component('BaseSection', BaseSection)
  Vue.component('BaseSectionColumn', BaseSectionColumn)

  // block modules
  Vue.component('VButton', VButton)
  Vue.component('VBlurbicon', VBlurbicon)
  Vue.component('VHeading', VHeading)
  Vue.component('VGap', VGap)
  Vue.component('VImageblock', VImageblock)
  Vue.component('VImageoverlay', VImageoverlay)
  Vue.component('VLinklist', VLinklist)
  Vue.component('VList', VList)
  Vue.component('VMap', VMap)
  Vue.component('VReviewslider', VReviewslider)
  Vue.component('VRule', VRule)
  Vue.component('VSlider', VSlider)
  Vue.component('VTestimonial', VTestimonial)
  Vue.component('VText', VText)
  Vue.component('VForm', VForm)

  // global components
  Vue.component('v-image', VImage)
  Vue.component('v-richtext', VRichtext)

  // mapping components
  Vue.component('l-map', LMap);
  Vue.component('l-tile-layer', LTileLayer);
  Vue.component('l-marker', LMarker);
}


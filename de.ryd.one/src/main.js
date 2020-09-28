// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import 'normalize.css/normalize.css'

import DefaultLayout from '~/layouts/Default.vue'


import Page from '~/components/Page.vue'

import BaseSectionColX1 from '~/components/BaseSectionColX1.vue'
import BaseSectionColX2 from '~/components/BaseSectionColX2.vue'
import BaseSectionColX3 from '~/components/BaseSectionColX3.vue'
import VButton from '~/components/VButton.vue'


export default function (Vue, { router, head, isClient }) {
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)


  // register components
  Vue.component('Page', Page)

  Vue.component('BaseSectionColX1', BaseSectionColX1)
  Vue.component('BaseSectionColX2', BaseSectionColX2)
  Vue.component('BaseSectionColX3', BaseSectionColX3)
  Vue.component('VButton', VButton)
}
// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import 'normalize.css/normalize.css'

import DefaultLayout from '~/layouts/Default.vue'

import Page from '~/components/Page.vue'

import BaseSection1Col from '~/components/BaseSection1Col.vue'
import BaseSection2Col from '~/components/BaseSection2Col.vue'
import BaseSection3Col from '~/components/BaseSection3Col.vue'
import VButton from '~/components/VButton.vue'


export default function (Vue, { router, head, isClient }) {
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)

  // register components
  Vue.component('Page', Page)

  Vue.component('BaseSection1Col', BaseSection1Col)
  Vue.component('BaseSection2Col', BaseSection2Col)
  Vue.component('BaseSection3Col', BaseSection3Col)
  Vue.component('VButton', VButton)
}
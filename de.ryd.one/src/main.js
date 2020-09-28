// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import 'normalize.css/normalize.css'

import DefaultLayout from '~/layouts/Default.vue'


import Page from '~/components/Page.vue'

import BaseColumnX1 from '~/components/BaseColumnX1.vue'
import BaseColumnX2 from '~/components/BaseColumnX2.vue'
import BaseColumnX3 from '~/components/BaseColumnX3.vue'
import VButton from '~/components/VButton.vue'
import VBlurbicon from '~/components/VBlurbicon.vue'
import VHeading from '~/components/VHeading.vue'
import VList from '~/components/VList.vue'
import VRule from '~/components/VRule.vue'


export default function (Vue, { router, head, isClient }) {
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)


  // register components
  Vue.component('Page', Page)

  Vue.component('BaseColumnX1', BaseColumnX1)
  Vue.component('BaseColumnX2', BaseColumnX2)
  Vue.component('BaseColumnX3', BaseColumnX3)
  Vue.component('VButton', VButton)
  Vue.component('VBlurbicon', VBlurbicon)
  Vue.component('VHeading', VHeading)
  Vue.component('VList', VList)
  Vue.component('VRule', VRule)
}
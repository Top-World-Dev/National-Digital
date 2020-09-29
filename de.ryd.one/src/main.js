// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import 'normalize.css/normalize.css'

import DefaultLayout from '~/layouts/Default.vue'

import Page from '~/components/Page.vue'

import TheFooter from '~/components/TheFooter.vue'

import BaseSection from '~/components/BaseSection.vue'
import BaseSectionColumn from '~/components/BaseSectionColumn.vue'

import VButton from '~/components/VButton.vue'
import VBlurbicon from '~/components/VBlurbicon.vue'
import VGap from '~/components/VGap.vue'
import VHeading from '~/components/VHeading.vue'
import VImageblock from '~/components/VImageblock.vue'
import VLinklist from '~/components/VLinklist.vue'
import VList from '~/components/VList.vue'
import VRichtext from '~/components/VRichtext.vue'
import VRule from '~/components/VRule.vue'
import VText from '~/components/VText.vue'


export default function (Vue, { router, head, isClient }) {
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)

  // register components
  Vue.component('Page', Page)

  // global elements
  Vue.component('TheFooter', TheFooter)

  // base layouts
  Vue.component('BaseSection', BaseSection)
  Vue.component('BaseSectionColumn', BaseSectionColumn)

  // block modules
  Vue.component('VButton', VButton)
  Vue.component('VBlurbicon', VBlurbicon)
  Vue.component('VHeading', VHeading)
  Vue.component('VGap', VGap)
  Vue.component('VImageblock', VImageblock)
  Vue.component('VLinklist', VLinklist)
  Vue.component('VList', VList)
  Vue.component('VRule', VRule)
  Vue.component('VText', VText)

  // global components
  Vue.component('richtext', VRichtext)
}
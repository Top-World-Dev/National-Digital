// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import firaSans400 from "typeface-fira-sans/files/fira-sans-latin-400.woff2"
import firaSans600 from "typeface-fira-sans/files/fira-sans-latin-600.woff2"
import firaSans700 from "typeface-fira-sans/files/fira-sans-latin-700.woff2"

import 'normalize.css/normalize.css'

import DefaultLayout from '~/layouts/Default.vue'

import Page from '~/components/Page.vue'

import TheFooter from '~/components/TheFooter.vue'
import TheHeader from '~/components/TheHeader.vue'
import TheHeaderSection from '~/components/TheHeaderSection.vue'

import BaseSection from '~/components/BaseSection.vue'
import BaseSectionColumn from '~/components/BaseSectionColumn.vue'

import VRichtext from '~/components/VRichtext.vue'
import VImage from '~/components/VImage.vue'


import VImageblock from '~/components/VImageblock.vue'


export default function (Vue, { router, head, isClient }) {
  
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

  Vue.component('VImageblock', VImageblock)

  // global components
  Vue.component('v-image', VImage)
  Vue.component('v-richtext', VRichtext)


  head.link.push( { rel: "preload", href: firaSans400, as: "font" } )
  head.link.push( { rel: "preload", href: firaSans600, as: "font" } )
  head.link.push( { rel: "preload", href: firaSans700, as: "font" } )

  head.script.push({ src: "https://static.zdassets.com/ekr/snippet.js?key=fc8cd222-ab2d-4b9b-8bdf-5ac260a1ace1", id: "ze-snippet", async: true, defer: true })

}


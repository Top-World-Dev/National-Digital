const c1 = () => import(/* webpackChunkName: "page--src-templates-storyblok-entry-vue" */ "C:\\Projects\\ryd.one\\de.ryd.one\\src\\templates\\StoryblokEntry.vue")
const c2 = () => import(/* webpackChunkName: "page--src-pages-editor-vue" */ "C:\\Projects\\ryd.one\\de.ryd.one\\src\\pages\\Editor.vue")

export default [
  {
    path: "/en/global/header/",
    component: c1
  },
  {
    path: "/en/global/footer/",
    component: c1
  },
  {
    path: "/en/terms/",
    component: c1
  },
  {
    path: "/en/partner/",
    component: c1
  },
  {
    path: "/en/mobile-payment/",
    component: c1
  },
  {
    path: "/global/header/",
    component: c1
  },
  {
    path: "/global/footer/",
    component: c1
  },
  {
    name: "404",
    path: "/en/404/",
    component: c1
  },
  {
    path: "/terms/",
    component: c1
  },
  {
    path: "/partner/",
    component: c1
  },
  {
    path: "/mobile-payment/",
    component: c1
  },
  {
    path: "/editor/",
    component: c2
  },
  {
    name: "404",
    path: "/404/",
    component: c1
  },
  {
    name: "*",
    path: "*",
    component: c1
  }
]

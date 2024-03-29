<template>
  <Layout>
    <component
      v-if="story.content.component && loaded"
      :key="story.content._uid"
      :blok="story.content"
      :is="story.content.component"
      :class="[size, showNavigation]"
    />
  </Layout>
</template>

<script>
import EventBus from '../eventbus';
export default {
  name: "StoryblokEntryTemplate",
  data() {
    return {
      showNavigation: false,
      size: "",
      loaded: false
    };
  },
  metaInfo() {
    let data = (this.$page.storyblokEntry.content.meta) ? this.$page.storyblokEntry.content.meta[0] : null;

    if(data == null) {
      return false
    } 
    else {
      let description = data.description ? this.$storyapi.richTextResolver.render(data.description) : '';
      let image = (data.feature.filename.length == 0) ? this.$static.metadata.fallbackImage : (typeof data.feature == 'object') ? require(`!!assets-loader!@storyblok/${data.feature.filename.filename}`).src : require(`!!assets-loader!@storyblok/${data.feature.filename}`).src;

      let links = [];

      links.push({ rel: 'canonical', href: `${this.$static.metadata.siteUrl}${this.$route.fullPath}` });
      links.push({ rel: 'alternate', href: `${this.$static.metadata.siteUrl}${this.$route.fullPath}`, hreflang: `${this.$static.metadata.translations.default}`});
      if(this.$static.metadata.translations.languages) {
        this.$static.metadata.translations.languages.forEach(lang => {
          links.push({ rel: 'alternate', href: `${this.$static.metadata.siteUrl}/${lang}${this.$route.fullPath}`, hreflang: `${lang}`})
        })
      }


      return {
        title: `${this.$context.title}`,
        titleTemplate: `%s | ${this.$static.metadata.siteName}`,
        htmlAttrs: { lang: this.$static.metadata.translations.default },
        meta: [
          { name: 'description', content: description.replace('<p>', '').replace('</p>', '')},
          { name: 'robots', content: (data.noindex) ? 'noindex' : 'index' },
          { name: "twitter:card", content: "summary" },
          { name: 'og:url', content: `${this.$static.metadata.siteUrl}${this.$route.fullPath}` },
          { name: 'og:title', content: `${this.$static.metadata.siteName} - ${data.title}` },
          { name: 'og:description', content: description.replace('<p>', '').replace('</p>', '') },
          { name: 'og:image', content: image },
        ],
        link: links,
        script: [
          {
            type: "application/ld+json",
            json: {
              "@context": "https://schema.org",
              "@type": "Organization",
              "url": this.$static.metadata.siteUrl,
              "logo": this.$static.metadata.siteLogo,
            }
          },
        ]
      }
    }
  },
  mounted() {
    window.addEventListener("resize", this.handleResize(window.innerWidth));
    this.handleResize(window.innerWidth);
    EventBus.$on('showNavigation', (action) => {
      this.showNavigation = action
    });

    // let components = this.blok.block.map(item => item.component);
    const components = this.$page.storyblokEntry.content.body.map(item => item.columns).flat().map(item => {
      if(item) {
        return item.block
      }
    }).flat().map(item => {
      if(item) {
        return item.component
      }
    }).map(item => {
      if(item) {
        return item
      }
    }).filter(item => item)

    let uniqueComponents = [...new Set(components)];

    for(let component of components) {
      this.$options.components[`${component}`] = require(`../components/${component}`).default
    }
    this.loaded = true;
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize(window.innerWidth));
  },
  methods: {
    handleResize(width) {
      switch (true) {
        case width < 640:
          this.size = "viewport-xs";
          break;
        case width >= 640 && width < 768:
          this.size = "viewport-sm";
          break;
        case width >= 768 && width < 1024:
          this.size = "viewport-md";
          break;
        case width >= 1024 && width < 1280:
          this.size = "viewport-lg";
          break;
        case width > 1280:
          this.size = "viewport-xl";
          break;
      }
    },
  },
  computed: {
    story() {
      return this.$page.storyblokEntry;
    },
  }
};
</script>

<page-query>
query StoryblokEntry ($id: ID) {
  storyblokEntry (id: $id) {
    id
    slug
    content
  }
}
</page-query>
<static-query>
query {
  metadata {
    fallbackImage
    siteName
    siteTwitter
    siteUrl
    translations {
      default
    }
  }
}
</static-query>

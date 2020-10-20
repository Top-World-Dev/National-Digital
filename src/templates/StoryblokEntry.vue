<template>
  <Layout>
    <component
      v-if="story.content.component"
      :key="story.content._uid"
      :blok="story.content"
      :size="size"
      :is="story.content.component"
      :class="size"
    />
  </Layout>
</template>

<script>
export default {
  name: "StoryblokEntryTemplate",
  data() {
    return {
      size: "",
    };
  },
  metaInfo() {
    let data = (this.$page.storyblokEntry.content.meta) ? this.$page.storyblokEntry.content.meta[0] : null;

    if(data == null) {
      return false
    } 
    else {
      let description = data.description ? this.$storyapi.richTextResolver.render(data.description) : '';
      let language = this.$page.storyblokEntry.id.split('-').pop();
      let image = (data.feature.filename.length == 0) ? this.$static.metadata.fallbackImage : (typeof data.feature == 'object') ? require(`!!assets-loader!@media/${data.feature.filename.filename}`).src : require(`!!assets-loader!@media/${data.feature.filename}`).src;
      return {
        title: `${data.title}`,
        titleTemplate: `%s - ${this.$static.metadata.siteName}`,
        htmlAttrs: { lang: (language) == 'default' ? 'de' :  language },
        meta: [
          { name:  'description', content: description.replace('<p>', '').replace('</p>', '')},
          { name: 'robots', content: (data.noindex) ? 'noindex' : 'index' },
          { name: "twitter:card", content: "summary" },
          { name: 'og:url', content: `${this.$static.metadata.siteUrl}${this.$route.fullPath}` },
          { name: 'og:title', content: `${this.$static.metadata.siteName} - ${data.title}` },
          { name: 'og:description', content: description.replace('<p>', '').replace('</p>', '') },
          { name: 'og:image', content: image },
        ],
        link: [
          { rel: 'canonical', href: `${this.$static.metadata.siteUrl}/${this.$route.fullPath}` },
        ],
        script: [
          {
            type: "application/ld+json",
            json: {
              "@context": "https://schema.org",
              "@type": "Organization",
              "url": this.$static.metadata.siteUrl,
              "logo": this.$static.metadata.siteLogo,
            }
          }
        ]
      }
    }
  },
  mounted() {
    window.addEventListener("resize", this.handleResize(window.innerWidth));
    this.handleResize(window.innerWidth);
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
  },
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
    siteLogo
  }
}
</static-query>

<template>
  <Layout>
    <component
      v-if="story.content.component"
      :key="story.content._uid"
      :blok="story.content"
      :is="story.content.component"
    />
  </Layout>
</template>

<script>
export default {
  name: 'StoryblokEntryTemplate',
 metaInfo() {
    return {
      title: this.story.content.meta_information.title,
      meta: [
        {
          name: "description",
          content: this.story.content.meta_information.description
        }
      ]
    }
  },
  data() {
    return {
      size: ''
    }
  },
  mounted() {
    window.addEventListener('resize', this.handleResize(window.innerWidth));
    this.handleResize(window.innerWidth);
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize(window.innerWidth));
  },
  methods: {
    handleResize(width) {
      switch(true) {
        case (width < 640):
        this.size = 'viewport-xs';
        break;
        case (width >= 640 && width < 768):
        this.size = 'viewport-sm';
        break;
        case (width >= 768 && width < 1024):
        this.size = 'viewport-md';
        break;
        case (width >= 1024 && width < 1280):
        this.size = 'viewport-lg';
        break;
        case (width > 1280):
        this.size = 'viewport-xl';
        break;
      }
    }
  },
  computed: {
    story () {
      return this.$page.storyblokEntry
    }
  }
}
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
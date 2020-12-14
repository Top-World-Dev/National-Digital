<template>
  <div v-if="image">
    <img v-if="src == 'img'" :src="image" :style="{width: source.width + 'px', height: source.height + 'px'}" :width="source.width" :height="source.height">
    <g-image v-else :src="image"></g-image>
  </div>
</template>

<script>
export default {
  props: ["source"],
  data() {
    return {
      src: ''
    }
  },
  methods: {
    processImage(ele) {
        // check if it's an svg 
        if(typeof ele.image.filename == 'string') {
          this.src = "img";
          return ele.image.filename;
        } else {
          let image = (typeof ele.image.filename == 'object') ? require(`!!assets-loader!@storyblok/${ele.image.filename.filename}`) : require(`!!assets-loader!@storyblok/${ele.image.filename}`);

          image.alt = this.source.title;
          image.size.height = parseInt(this.source.height);
          image.size.width = parseInt(this.source.width);
          return image;
        }
    }
  },
  computed: {
    image() {
      return this.source ? this.processImage(this.source) : '';
    },
  },
};
</script>
<template>
  <div>
    <img v-if="src == 'img'" :src="image" :style="{width: source.width + 'px', height: source.height + 'px'}">
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
  computed: {
    image() {
      // check if it's an svg 
      if(typeof this.source.image.filename == 'string') {
        let filetype = this.source.image.filename.split('.').pop();
        if(filetype == 'svg') {
          this.src = "img";
          return this.source.image.filename;
        }
      } else {
        let imageName = this.source.image.filename.filename;
        let image = require(`!!assets-loader!@media/${imageName}`);
        image.alt = this.source.title;
        image.size.height = parseInt(this.source.height);
        image.size.width = parseInt(this.source.width);
        return image;
      }
    },
  },
};
</script>
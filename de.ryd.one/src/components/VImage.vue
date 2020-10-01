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
        let filetype = this.source.image.filename.split('.').pop().toLowerCase();
        if(filetype == 'svg') {
          this.src = "img";
          return this.source.image.filename;
        }
      } else {
        let image = (typeof this.source.image.filename == 'object') ? require(`!!assets-loader!@media/${this.source.image.filename.filename}`) : require(`!!assets-loader!@media/${this.source.image.filename}`);

        image.alt = this.source.title;
        image.size.height = parseInt(this.source.height);
        image.size.width = parseInt(this.source.width);
        return image;
      }
    },
  },
};
</script>
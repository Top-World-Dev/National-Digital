<template>
  <div>
    <g-image :src="image"></g-image>
  </div>
</template>

<script>
export default {
  props: ["source"],
  computed: {
    image() {
      // check if it's an svg 
      if(typeof this.source.image.filename == 'string') {
        let filetype = this.source.image.filename.split('.').pop();
        if(filetype == 'svg') {
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
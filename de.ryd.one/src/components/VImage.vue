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
      console.log(this.source)
      let imageName = (typeof this.source.image == 'object') ? this.source.image.filename.filename : this.source.image.split("/").pop();
      let image = require(`!!assets-loader!@media/${imageName}`);
      image.size.height = parseInt(this.source.height);
      image.size.width = parseInt(this.source.width);
      image.alt = this.source.title;
      return image;
    },
  },
};
</script>
export default {
  methods: {
    getFile (image, width, height, alt) {
      if(typeof image == 'object') {
        // check to see if its been cached
        return (image.filename) ? require(`!!assets-loader?width=${width}&height=${height}&alt=${alt}!@media/${image.filename}`) : image;
      }
      if(typeof image == 'string') {
        var file = image.split("/").pop(); 
        return require(`!!assets-loader?width=${width}&height=${height}&alt=${alt}!@media/${file}`)
      }
    }
  }
};
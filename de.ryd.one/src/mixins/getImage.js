export default {
  methods: {
    getFile (image) {
      console.log('hello')
      if(typeof image == 'object') {
        console.log(image)
        // // check to see if its been cached
        // return (image.filename) ? require(`!!assets-loader?width=${width}&height=${height}&alt=${alt}!@media/${image.filename}`) : image;
      }
      if(typeof image == 'string') {
        console.log(image)
        // var file = image.split("/").pop(); 
        // return require(`!!assets-loader?width=${width}&height=${height}&alt=${alt}!@media/${file}`)
      }
    }
  }
};
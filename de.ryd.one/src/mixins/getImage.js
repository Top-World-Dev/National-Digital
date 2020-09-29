export default {
  computed: {
    getImage () {
      return this.blok.item.map(item => {
        if(typeof item.icon == 'object') {
          item.imageUrl = require(`!!assets-loader?width=100&height=100!@media/${item.icon.filename.filename}`);
        } else {
          let image = item.icon.split("/").pop(); 
          item.imageUrl = require(`!!assets-loader?width=100&height=100!@media/${file}`)
        }
        return item
      });
    }
  }
};
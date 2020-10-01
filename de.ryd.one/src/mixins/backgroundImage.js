export default {
  methods: {
    assignColors(color) {
      switch (color) {
        case 'section-background-brandgradient':
          return `linear-gradient(90deg, rgba(46, 50, 131, 1) 45%, rgba(58, 147, 191, 0.67) 90%)`
          break;
        case 'section-background-brandblock':
          return `linear-gradient(0deg, rgba(46, 50, 131, 1) 0%, 0deg, rgba(46, 50, 131, 1) 100%)`
          break;
        case 'section-background-white':
          return `linear-gradient(0deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 1) 100%)`
          break;
        case 'section-background-transparent':
          return `linear-gradient(0deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0) 100%)`
          break;
        default:
          return `linear-gradient(0deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0) 100%)`
      }
    },
    getImage(asset) {
      let image = require(`!!assets-loader!@media/${this.blok.backgroundImage.filename.filename}`);
      return image.src;
    }
  },
  computed: {
    backgroundStyle() {
      if(typeof this.blok.backgroundImage.filename == 'object') {
        let filename = this.blok.backgroundImage.filename.filename
      }

      let color = this.assignColors(this.blok.backgroundColor);
      return (typeof this.blok.backgroundImage.filename == 'object') ? `${color}, url('${this.getImage(this.blok.backgroundImage.filename.filename)}')` : `${color}`
    
    },
  }
};
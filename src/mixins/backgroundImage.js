export default {
  data() { return { windowWidth: window.innerWidth } },
  mounted() {
    window.addEventListener('resize', () => {
      this.windowWidth = window.innerWidth
      console.log(this.isMobile)
    })
  },
  methods: {
    assignColors(color) {
      switch (true) {
        case (color == 'section-background-brandgradient' && this.isMobile):
        return `linear-gradient(90deg, rgba(46, 50, 131, 0.97) 0%, rgba(34, 107, 172, 0.67) 100%)`
        break;
        case (color == 'section-background-brandgradient' && !this.isMobile):
        return `linear-gradient(90deg, rgba(46, 50, 131, 0.97) 38%, rgba(34, 107, 172, 0.67) 89%)`
        break;
        case (color = 'section-background-brandblock'):
          return `linear-gradient(0deg, rgba(46, 50, 131, 1) 0%, 0deg, rgba(46, 50, 131, 1) 100%)`
          break;
        case (color = 'section-background-white'):
          return `linear-gradient(0deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 1) 100%)`
          break;
        case (color = 'section-background-transparent'):
          return `linear-gradient(0deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0) 100%)`
          break;
        default:
          return `linear-gradient(0deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0) 100%)`
      }
    },
    getImage(asset) {
      let image = require(`!!assets-loader!@media/${this.blok.backgroundImage.filename.filename}`);
      return image.src;
    },

  },
  computed: {
    isMobile() {
      return this.windowWidth <= 1024
    },
    backgroundStyle() {
      if(typeof this.blok.backgroundImage.filename == 'object') {
        let filename = this.blok.backgroundImage.filename.filename
      }
   
      let color = this.assignColors(this.blok.backgroundColor, window.innerWidth);

      return (typeof this.blok.backgroundImage.filename == 'object') ? `${color}, url('${this.getImage(this.blok.backgroundImage.filename.filename)}')` : `${color}`
    
    },
  },
  
};
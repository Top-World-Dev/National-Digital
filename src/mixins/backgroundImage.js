export default {
  data() { return { windowWidth: 1024 } },
  mounted() {
    window.addEventListener('resize', this.handleResize(window.innerWidth));
    this.handleResize(window.innerWidth);
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize(window.innerWidth));
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
        default:
          return false
      }
    },
    getImage(asset) {
      let image = require(`!!assets-loader!@media/${this.blok.backgroundImage.filename.filename}`);
      return image.src;
    },
    handleResize(width) {
      this.windowWidth = width;
    }

  },
  computed: {
    isMobile() {
      return this.windowWidth <= 1024
    },
    backgroundStyle() {
      if(typeof this.blok.backgroundImage.filename == 'object') {
        let filename = this.blok.backgroundImage.filename.filename
      }
   
      let color = this.assignColors(this.blok.backgroundColor);

      return (typeof this.blok.backgroundImage.filename == 'object') ? `${color}, url('${this.getImage(this.blok.backgroundImage.filename.filename)}')` : `${color}`
    
    },
  },
  
};
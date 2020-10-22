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
      return (typeof asset  == 'object') ? require(`!!assets-loader!@storyblok/${asset.filename}`).src : asset;
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
      let color = this.assignColors(this.blok.backgroundColor);
      return (!this.blok.backgroundImage.filename) ? `${color}` : `${color}, url('${this.getImage(this.blok.backgroundImage.filename)}')`;
    },
  },
  
};
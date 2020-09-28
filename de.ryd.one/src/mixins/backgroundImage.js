export default {
  methods: {
    assignColors(color) {
      switch (color) {
        case 'is-primary-horizontal':
          return `linear-gradient(to right, #2e3283 38%, rgba(34, 107, 172, 0.67) 89%)`
          break;
        case 'is-secondary-horizontal':
          return `linear-gradient(to left, #226bac, #2e3283 0%)`
          break;
        case 'is-primary-vertical':
          return `linear-gradient(to bottom, rgba(46, 50, 131, 0) 47%, #0d0e36 91%)`
          break;
        default:
          return `linear-gradient(to right, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 1) 100%)`
      } 
    }
  },
  computed: {
    backgroundStyle() {
      let color = this.assignColors(this.blok.backgroundColor);
      return (!this.blok.backgroundImage.filename) ? `${color}` : `${color}`;
    }
  }
};

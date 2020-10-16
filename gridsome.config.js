// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const path = require('path')

module.exports = {
  siteName: 'de.ryd.one',
  plugins: [
    {
      use: 'gridsome-source-storyblok',
      options: {
        client: {
          accessToken: 'xBrVBUizNcw9o7tmRIQclAtt' // you must be replace with your token
        },
        types: {
          story: {
            name: 'StoryblokEntry', // The name of Story template and type (default StoryblokEntry)
            params: {
              resolve_relations: 'TheFooter.section,TheHeader.section'
            } // Additional query parameters
          }
        },
        downloadImages: true, // Optional. default false,
        imageDirectory: 'storyblok_images', // Optional. Folder to put the downloaded images
      },
    },
    {
      use: 'gridsome-plugin-gtm',
      options: {
        id: 'GTM-N9T3W2D',
        enabled: true,
        debug: true
      }
    }
  ],
  chainWebpack(config) {
    config.resolve.alias.set('@media', '@/storyblok_images')
    config.mode('development')
    // Load variables for all vue-files
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
  }
}
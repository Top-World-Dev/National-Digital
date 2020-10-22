// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const path = require('path');
const spaces = require('./ryd-config.json');

module.exports = {
  siteName: 'de.ryd.one',
  plugins: [
    {
      use: 'gridsome-source-storyblok',
      options: {
        client: {
          accessToken: spaces.accessToken[process.env.npm_config_site] // you must be replace with your token
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
        imageDirectory: 'media-storyblok', // Optional. Folder to put the downloaded images
      },
    },
    {
      use: 'gridsome-plugin-gtm',
      options: {
        id: spaces.gtm[process.env.npm_config_site],
        enabled: true,
        debug: true
      }
    }
  ],
  chainWebpack(config) {
    config.resolve.alias.set('@media', '@/media-global')
    config.resolve.alias.set('@storyblok', '@/media-storyblok')
    config.mode('development')
    // Load variables for all vue-files
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
  }
}
// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`


module.exports = {
  siteName: 'de.ryd.one',
    plugins: [{
      use: 'gridsome-source-storyblok',
      options: {
        client: {
          accessToken: 'xBrVBUizNcw9o7tmRIQclAtt' // you must be replace with your token
        },
        types: {
          story: {
            name: 'StoryblokEntry', // The name of Story template and type (default StoryblokEntry)
            params: {
              resolve_relations: 'global_reference.reference'
            }
          },
        }
      }
    }]
  }

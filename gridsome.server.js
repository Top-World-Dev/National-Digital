// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`


const siteData = require('./ryd-meta.json');

module.exports = function (api) {
  api.loadSource(({ addCollection }) => {
    // Use the Data Store API here: https://gridsome.org/docs/data-store-api/
  })

  api.loadSource(async store => {
    store.addMetadata('siteName', siteData.siteName[process.env.npm_config_site] )
    store.addMetadata('siteTwitter', siteData.siteTwitter[process.env.npm_config_site] )
    store.addMetadata('siteUrl', siteData.siteUrl[process.env.npm_config_site] )
    store.addMetadata('fallbackImage', siteData.fallbackImage[process.env.npm_config_site] )
    store.addMetadata('siteLogo', siteData.siteLogo[process.env.npm_config_site] )
  })

  api.createPages(async ({ graphql, createPage }) => {
    // load data from Storyblok API
    const { data } = await graphql(`{
      allStoryblokEntry {
        edges {
          node {
            id
            full_slug
            name
          }
        }
      },
      header: allStoryblokEntry (
        filter: { 
          name: { eq: "Header" }
        }
      ){
        edges {
          node {
            id
            full_slug
            name
          }
        }
      }
    }`)


 
    // for each content found create a page
    data.allStoryblokEntry.edges.forEach(({ node }) => {
      if (node.full_slug === 'home') {
        createPage({
          path: '/',
          component: './src/templates/StoryblokEntry.vue',
          context: {
            id: node.id,
            language: node.language
          }
        })
      }
      createPage({
        path: `/${node.full_slug}`,
        component: './src/templates/StoryblokEntry.vue',
        context: {
          id: node.id
        }
      })
    })
  })
}
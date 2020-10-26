# ryd.one

[Deployment](#deployment) | [Development](#development) | [Content Management](#content-management)

---

This repository contains the source code for all of the ryd.one websites.

The websites are generated using the modern site generator for Vue.js, [Gridsome](https://gridsome.org/) and their content is managed using [Storyblok](https://www.storyblok.com/) CMS.

## Deployment

### Site setup

Each ryd.one website requires an entry in the `ryd-config.json` and `ryd-meta.json` files. The 'site' can be called anything, but best practice is to use the branch OR final subdomain name (e.g. 'staging', 'de', etc.)

`ryd-config.json`: this file contains (1) the Storyblok Access Token for the relevant Storyblok space and (2) the site's Google Tag Manager container ID (e.g. GTM-XXXXX).

`ryd-meta.json`: this file contains site-specific global meta data such as the website url, website name, logo path and default open graph feature image.

### Deploy steps

You can build any site that has been defined above as follows:

```bash
npm ci
npm run build --site=_SITENAME_
```

For example, to build the 'de' site, the build command would be `npm run build --site=de`

The output directory is `dist`

## Development

### New site setup

Before starting, please make sure you have:

- Created a new Storyblok space, noting the space ID
- Created a new GTM container, if desired, noting the container ID

Please refer to the [site setup](#site-setup) deployment information above, which sets out what configuration files must be populated to build a new site.

### Updating map data

To update the gas station map data, simply replace the file `ryd-locations.csv` in the root direction, and re-generate the site. Please note that column headers must remain the same.

This file is re-processed at build.

### Working locally

To work locally:

1. Download the node modules:

`npm ci`

2. Run the project and specify which site variables you wish to load:

`npm run develop --site=_SITENAME_`

### Methodologies &amp; Styles

Vue components that are used once per page should be prefixed with _The_, e.g. `TheHeader`. Sub components take on the parent name, i.e. `TheHeaderSidenav`.

Styles for once-off components should be prefixed with _xy-_, e.g. `xy-header`. All child styles adopt the parent prefix, so `header-container` etc. The parent class should wrap all children, but no further nesting is necessary.

Vue components that are reusable should be prefixed with _V_, e.g. `VButton`. Sub components adopt the parent name, i.e. `VButtonItem`.

Styles for reusable components should be prefixed with _v-_, e.g. `v-button`. All child styles adopt the parent prefix, so `button-primary` etc. The parent class should wrap all children, but no further nesting is necessary.

We use the same naming convention for Vue components in Storyblok.

We use the scss language for stylesheets. Please include the global `styles.scss`. Top level base styles exist in the `Default.vue` and should target elements directly, i.e. `h1` or `a` etc.

## Content Management

Each site is configured to use a specific Storyblok space ID. See the [site setup](#site-setup) above for technical background.

Content is managed within the relevant Storyblok space, and each time the site 'build' command is run, the website will fetch all _Published_ changes.

Storyblok can be configured to re-trigger the 'build' process when new content changes are published. Please refer to the [Storyblok webhooks documentation](https://www.storyblok.com/docs/Guides/using-storyblok-webhooks) for more information.

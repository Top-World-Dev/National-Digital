<template>
  <div>
    <slot />
  </div>
</template>

<style lang="scss">
@import "~/assets/styles.scss";

/* Resets */

html {
  height: 100%;
  max-width: 100%;
}

html {
  font-size: $baseSize;
  font-feature-settings: "liga" 1;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

html {
  box-sizing: border-box;
  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }
}

body {
  font-size: 1rem;
  font-family: $baseFont;
  color: $black;
  background-color: $trueWhite;
  max-width: 100%;
  height: 100%;
}

img {
  max-width: 100%;
  height: auto;
}

a, button, [role="button"] {
  position: relative;
  cursor: pointer;
}

a {
  color: inherit;
}

/* Font sizes */

body {
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.6em;
}

h1, h2, h3, h4, h5, h6 {
  margin-top: 1em;
  margin-bottom: 1em;
}

h1 {
  font-size: 3.25rem;
  font-weight: 700;
}

h2 {
  font-size: 2rem;
  font-weight: 700;
}

h3 {
  font-size: 2rem;
  font-weight: 400;
}

h4 {
  font-size: 1.5rem;
  font-weight: 700;
}

h5 {
  font-size: 1.25rem;
  font-weight: 700;
}

h6 {
  font-size: 1.25rem;
  font-weight: 400;
}

</style>

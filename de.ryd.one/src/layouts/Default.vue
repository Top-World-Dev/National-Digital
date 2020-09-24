<template>
  <div>
    <header>
      <strong>
        <g-link to="/">{{ $static.metadata.siteName }}</g-link>
      </strong>
      <na>
        <g-link to="/">Home</g-link>
        <g-link to="/en/home">English</g-link>
        <g-link to="/about/">About</g-link>
      </na>
    </header>
    <slot />
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

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
  height: 100%;
  max-width: 100%;
  font-family: $baseFont;
  font-weight: 400;
  line-height: 1.5;
  color: $black;
  background-color: $trueWhite;
  margin: 0;
  font-size: 1rem;
}

img {
  max-width: 100%;
  height: auto;
}

button, [role="button"] {
  cursor: pointer;
}

a {
  color: inherit;
  text-decoration: underline;
}

a, button, [role="button"] {
  position: relative;
  cursor: pointer;
}

</style>

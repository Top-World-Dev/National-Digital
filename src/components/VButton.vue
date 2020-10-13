<template>
  <div class="v-button" v-editable="blok" :class="blok.style">
    <g-link v-if="blok.link.linktype == 'story'" :to="blok.link.url">{{ blok.text }}</g-link>
    <a v-else :href="blok.link.url" rel="noopener noreferrer">{{ blok.text }}</a>
  </div>
</template>
<script>
  export default {
    props: ['blok']
  }
</script>
<style lang="scss">
@import '~/assets/styles.scss';
.v-button {
  // layout
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 1em;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  margin-right: 0.25rem;
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  padding-left: 1.5em;
  padding-right: 1.5em;
  min-height: 3.5rem;
  min-width: 10.5rem;
  max-width: 100%;
  // style
  cursor: pointer;
  font-weight: 600;
  border-style: solid;
  border-width: 0.05em;    
  border-radius: 2rem;
  transition: all 0.2s;
  &.button-primary {
      border-color: $brand;
      background-color: $brand;
      &:hover {
          border-color: $brand;
          background-color: lighten($brand,10%);
          a {
              border-color: $white;
          }
      }
      &:active {
          border-color: $brand;
          background-color: darken($brand,5%);
      }
      a, button, [role="button"] {
        color: $white;
      }
  }
  &.button-accent {
      border-color: $accent;
      background-color: $accent;
      &:hover {
          border-color: $accent;
          background-color: lighten($accent,10%);
          a {
              border-color: $brand;
          }
      }
      &:active {
          border-color: $accent;
          background-color: darken($accent,5%);
      }
      a, button, [role="button"] {
        color: $brand;
      }
  }
  &.button-outline {
      border-color: $brand;
      background-color: transparent;
      &:hover {
          border-color: $brand;
          background-color: rgba($brand,0.1);
          a {
              border-color: $brand;
          }
      }
      &:active {
          border-color: $accent;
          background-color: rgba($brand,0.2);
      }
      a, button, [role="button"] {
        color: $brand;
      }
  }
}
</style>
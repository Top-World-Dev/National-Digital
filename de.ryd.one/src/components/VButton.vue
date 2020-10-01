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
  font-size: 1rem;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  padding-left: 2.5em;
  padding-right: 2.5em;
  min-height: 3.5rem;
  min-width: 21.5rem;
  // style
  cursor: pointer;
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
      }
      &:active {
          border-color: $brand;
          background-color: darken($brand,5%);
      }
      a, button, [role="button"] {
        color: $white;
        text-decoration: none;
      }
  }
  &.button-accent {
      border-color: $accent;
      background-color: $accent;
      &:hover {
          border-color: $accent;
          background-color: lighten($accent,10%);
      }
      &:active {
          border-color: $accent;
          background-color: darken($accent,5%);
      }
      a, button, [role="button"] {
        color: $brand;
        text-decoration: none;
      }
  }
}
</style>
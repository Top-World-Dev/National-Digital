<template>
  <div class="v-button" v-editable="blok" :class="blok.style" >
    <a :href="blok.link.url" :target="blok.linktype != 'url' ? '_blank' : '_self'" :rel="blok.linktype != 'url' ? 'noopener noreferrer' : ''">{{ blok.text }}</a>
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
  font-size: 0.8em;
  font-weight: 600;
  text-decoration: none;
  letter-spacing: 0.09em;
  transition: all 0.2s;
  text-transform: uppercase;
  &.button-primary {
      color: $white;
      border-color: $brand;
      background-color: $brand;
      &:hover {
          color: $white;
          border-color: $brand;
          background-color: lighten($brand,10%);
      }
      &:active {
          color: $white;
          border-color: $brand;
          background-color: darken($brand,5%);
      }
  }
  &.button-accent {
      color: $white;
      border-color: $accent;
      background-color: $accent;
      &:hover {
          color: $white;
          border-color: $accent;
          background-color: lighten($accent,10%);
      }
      &:active {
          color: $white;
          border-color: $accent;
          background-color: darken($accent,5%);
      }
  }
}
</style>
<template>
  <div class="v-rule" v-editable="blok">
    <hr/>
  </div>
</template>
<script>
  export default {
    props: ['blok']
  }
</script>
<style lang="scss">
@import '~/assets/styles.scss';
.v-rule hr {
  display: block;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  margin-left: auto;
  margin-right: auto;
  border-width: 0.25rem;
  border-style: solid;
  border-color: $accent;
}
</style>
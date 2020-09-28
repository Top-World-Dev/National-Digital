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
  border-top-width: 0.25rem;
  border-right-width: 2.5rem;
  border-bottom-width: 0;  
  border-left-width: 0;
  border-style: solid;
  border-color: $accent;
}
</style>
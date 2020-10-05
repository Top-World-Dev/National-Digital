<template>
  <div class="v-text" v-editable="blok">
    <v-richtext :text="blok.content" :class="blok.size"></v-richtext>
  </div>
</template>
<script>
  export default {
    props: ['blok']
  }
</script>
<style lang="scss">
@import '~/assets/styles.scss';

.v-text {
	.text-small {
		font-size: 0.75rem;
	}
	.text-regular {
		font-size: 0.875rem;
	}
	.text-large {
		font-size: 1rem;
	}
}
</style>

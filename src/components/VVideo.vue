<template>
  <div class="v-video">
   <iframe :src="blok.link.url" width="720" height="405" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>
  </div>
</template>
<script>
  export default {
	props: ['blok']
  }
</script>
<style lang="scss">
@import '~/assets/styles.scss';

.v-video {
	display: block;

	iframe{
		background: black;
	}
}

@media (max-width: $breakColumns) {
	 iframe{
		 width: 100%;
	 }
}

</style>
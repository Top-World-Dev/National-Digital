<template>
  <div class="v-testiomonial" v-editable="blok">
    <div class="testimonial-profile">
      <v-image class="testimonial-profile-logo" :source="blok.logo[0]"></v-image>
      <v-image class="testimonial-profile-avatar" :source="blok.profile[0]"></v-image>
    </div>
    <div class="testimonial-quote">&quot;{{ blok.content }}&quot;</div>
    <div class="testimonial-byline"><span>{{ blok.author }}</span><span>{{ blok.position }}</span></div>
  </div>
</template>
<script>
  export default {
    props: ['blok']
  }
</script>
<style lang="scss">
@import '~/assets/styles.scss';
.v-testiomonial {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  @include container($containerInner);
  .testimonial-quote {
    font-size: 1.25rem;
    font-weight: 600;
    font-style: italic;
    line-height: 2.5rem;
    margin-top: 1rem;
    margin-bottom: 2rem;
  }
  .testimonial-byline {
    span:nth-of-type(1) {
      display: block;
      font-size: 1.25rem;
      font-weight: 700;
    }
    span:nth-of-type(2) {
      display: block;
      font-size: 0.875rem;
    }
  }
  .testimonial-profile {
    display: flex;
    align-items: center;
  }
  .testimonial-profile-avatar img {
    border-radius: 50%;
    margin: 1rem;
  }
}
</style>

<template>
  <div class="v-testiomonial" v-editable="blok">
    <div class="testimonial-profile">
      <v-image class="testimonial-profile-logo" :source="blok.logo[0]"></v-image>
      <v-image class="testimonial-profile-avatar" :source="blok.profile[0]"></v-image>
    </div>
    <div class="testimonial-quote">{{ blok.content }}</div>
    <div class="testimonial-byline"><span>{{ blok.author }}</span><span>{{ blok.role }}</span></div>
  </div>
</template>
<script>
  export default {
    props: ['blok']
  }
</script>
<style lang="scss">
@import '~/assets/styles.scss';
.v-testimonial {
  .testimonial-quote {
    font-size: 1.75rem;
    font-weight: 400;
    font-style: italic;
  }
  .testimonial-byline {
    span:nth-of-type(1) {
      font-size: 1.25rem;
      font-weight: 700;
    }
    span:nth-of-type(2) {
      font-size: 0.875rem;
    }
  }
  .testimonial-profile {
    display: flex;
  }
  .testimonial-profile-avatar {
    border-radius: 50%;
  }
}
</style>

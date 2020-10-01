<template>
  <form class="v-form" method="post" action-xhr="#" target="_blank" v-editable="blok">
    <div class="form-row">
      <input class="form-field" type="text" name="name" :placeholder="blok.name" required autocomplete="name" :aria-label="blok.name" />
    </div>
    <div class="form-row">
      <input class="form-field" type="text" name="email" :placeholder="blok.email" required autocomplete="email" :aria-label="blok.email" />
    </div>
    <div class="form-row">
      <input class="form-field" type="tel" name="phone" :placeholder="blok.phone" autocomplete="tel" :aria-label="blok.phone" />
    </div>
    <div class="form-row">
      <div class="form-submit v-button button-primary"><input type="submit" :value="blok.submit" role="button" /></div>
    </div>
    <div class="form-row">
      <!-- <div submit-success>{{ blok.success }}</div> -->
      <!-- <div submit-error>{{ blok.error }}</div> -->
    </div>
  </form>
</template>

<script>
  export default {
    props: ['blok']
  }
</script>

<style lang="scss">
@import '~/assets/styles.scss';
.v-form {

  width: 90%;
  display: flex;
  flex-direction: column;
  margin-top: 2rem;

  .form-row {
    flex: 0 1 auto;
    display: flex;
    flex-direction: column;
    margin-bottom: 0.5rem;
    @media (min-width: $breakSM) {
      flex-direction: row;
      >* {
        flex: 0 1 100%;
      }
    }
  }

  textarea.form-field {
    min-height: 30vh;
  }

  .form-field {
    font-size: 0.9rem;
    line-height: 2.5em;
    background-color: transparent;
    border: 0.05em solid $lightGrey;
    border-radius: 2rem;
    color: $darkGrey;
    height: 50px;
    line-height: 2em;
    padding: 1em;
    width: 100%;
    &:focus {
      border-color: $brand;
    }
  }

  ::placeholder {
    color: $darkGrey;
    padding-left: 0.5em;
  }


  &.v-form.submit-success {
    .form-field, .form-submit {
      display: none;
    }
  }

}

</style>

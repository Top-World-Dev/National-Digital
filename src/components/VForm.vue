<template>
  <form class="v-form" method="post" :action="blok.endpoint.url" v-editable="blok">
    <div v-for="input in blok.input" :key="input._uid" class="form-row">
      <input class="form-field" :type="input.type" :name="input.label" :placeholder="input.label" :aria-label="input.label" :autocomplete="input.autocomplete" :required="input.required" :aria-required="input.required" />
    </div>
    <div class="form-row">
      <button type="submit" class="form-submit v-button button-primary"><a>{{ blok.submit }}</a></button>
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
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  margin-top: 2rem;

  .form-row {
    flex: 0 1 auto;
    display: flex;
    flex-direction: column;
    margin-bottom: 0.5rem;
    @media (min-width: $breakColumns) {
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

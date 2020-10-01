<template>
  <form class="v-form" method="post" action-xhr="#" target="_blank" v-editable="blok">
    <div class="form-row">
      <input class="form-field" type="text" name="name" placeholder="{{ blok.name }}" required autocomplete="name" aria-label="{{ blok.name }}" />
    </div>
    <div class="form-row">
      <input class="form-field" type="text" name="email" placeholder="{{ blok.email }}" required autocomplete="email" aria-label="{{ blok.email }}" />
    </div>
    <div class="form-row">
      <input class="form-field" type="tel" name="phone" placeholder="{{ blok.phone }}" autocomplete="tel" aria-label="{{ blok.phone }}" />
    </div>

    <div class="form-row">
      <textarea class="form-field" name="message" rows="20" maxlength="65535" placeholder="{{ blok.message }}" aria-label="{{ blok.message }}" required></textarea>
    </div>
    <div class="v-padding">
      <div class="padding-x1"></div>
    </div>
    <div class="form-row">
      <div class="form-submit v-button button-primary"><input type="submit" value="{{ blok.submit }}" /></div>
    </div>
    <div class="form-row">
      <div submit-success>{{ blok.success }}</div>
      <div submit-error>{{ blok.error }}</div>
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

  width: 100%;
  display: flex;
  flex-direction: column;

  .form-container {
    display: flex;
    flex-direction: column;
    flex-basis: 100%;
    flex: 1;
  }

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
    line-height: 2.5;
    padding-left: 0.25em;
    background-color: rgba($lightGrey, 0.5);
    border: 1px solid transparent;
    color: $darkGrey;
    font-size: 16px;
    font-weight: 500;
    height: 60px;
    letter-spacing: 0.1em;
    line-height: 24px;
    padding-bottom: 11px;
    padding-left: 28px;
    padding-right: 30px;
    padding-top: 10px;
    width: 100%;
  }

  ::placeholder {
    color: rgba($darkGrey, 0.5);
  }


  &.v-form.submit-success {
    .form-field, .form-submit {
      display: none;
    }
  }

  &.form-subscribe {
    .form-field {
      height: auto;
      font-size: 0.9rem;
      line-height: 0.9rem;
      padding: 0 0.5em;
      margin-right: 0.25rem;
      border-radius: 2px;
      
      @media (max-width: $breakSM) {
        width: 50%;
        margin: auto;
        margin-bottom:0.25rem;
        line-height: 1.8rem;
      }
    }
    .button-layout.button-default {
      @media (max-width: $breakSM) {
        width: 50%;
        min-height:1.8rem;
      }
    }
  }
}

</style>

<template>
  <aside class="xy-consent">
    <div class="consent-container">
      <div class="consent-wrapper">
        <h5>{{ content.consent_title }}</h5>
        <p>{{ content.consent_notice }}</p>
        <form class="consent-form">
          <div>
            <input type="checkbox" id="consentsToMinimum" name="consentsToMinimum" value="consentsToMinimum" checked disabled>
            <label for="consentsToMinimum">{{ content.term_minimum }}</label>
          </div>
          <div>
            <input type="checkbox" id="consentsToMarketing" name="consentsToMarketing" value="consentsToMarketing" @change="addLocalStorage($event)" checked>
            <label for="consentsToMarketing">{{ content.term_marketing }}</label>
            <input type="checkbox" id="consentsToAnalytics" name="consentsToAnalytics" value="consentsToAnalytics" @change="addLocalStorage($event)" checked>
            <label for="consentsToAnalytics">{{ content.term_analytics }}</label>
            <input type="checkbox" id="consentsToMedia" name="consentsToMedia" value="consentsToMedia" @change="addLocalStorage($event)" checked>
            <label for="consentsToMedia">{{ content.term_media }}</label>
          </div>
          <div>
            <button type="button" class="form-submit v-button button-primary" @click="consentAll"><a>{{ content.term_acceptall }}</a></button>
            <button type="submit" class="form-submit v-button button-outline" @click="closeConsent"><a>{{ content.term_acceptselect }}</a></button>
          </div>
        </form>
        <ul class="consent-linklist v-linklist" :class="content.privacy_links[0].style">
          <li class="linklist-item" v-for="item in content.privacy_links[0].item" :key="item._uid">
            <v-image v-if="item.image['0']" class="linklist-icon" :source="item.image['0']"></v-image>
            <g-link v-if="item.link.linktype == 'story'" :to="item.link.url">{{ item.title }}</g-link>
            <a v-else :href="item.link.url" rel="noopener noreferrer">{{ item.title }}</a>
          </li>
        </ul>
      </div>
    </div>
  </aside>
</template>

<script>
export default {
  props: ["content"],
  mounted() {
    localStorage.setItem('consentsToMinimum',true);
    localStorage.setItem('consentsToMarketing',true);
    localStorage.setItem('consentsToAnalytics',true);
    localStorage.setItem('consentsToMedia',true);
  },
  methods: {
    addLocalStorage(event) {
      localStorage.setItem(event.target.value,event.target.checked);
    },
    consentAll() {
      let checkboxes = document.querySelectorAll('.xy-consent .consent-form input[type=checkbox]');
      for (let checkbox of checkboxes) {
        checkbox.checked = true;
      }
      this.closeConsent();
    },
    closeConsent() {
      localStorage.setItem('consentGiven',true);
      this.$emit('askConsent',false);
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/styles.scss";

.xy-consent {
  font-size: 0.75rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: rgba($black,0.8);
  z-index: 100;
  .consent-container {
    margin-top: 1rem;
    margin-bottom: 2rem;
    @include container(480px);
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .consent-wrapper {
    background-color: $white;
    padding: 2rem 2rem;
    margin-bottom: 2rem;
  }
  input[type='checkbox'] {
    margin-right: 0.125rem;
  }
  label {
    margin-right: 0.5rem;
  }
  .consent-linklist.v-linklist { // override defaults
    font-size: 0.75rem;
    // li::before {
    //   content: "";
    // }
    // li:not(:last-of-type)::after {
    //   content: "   | ";
    // }
  }
}
</style>

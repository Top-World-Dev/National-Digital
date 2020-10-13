<template>
  <aside class="xy-consent">
    <div class="consent-container">
      <h4>{{ content.consent_title }}</h4>
      <p>{{ content.consent_notice }}</p>
      <form class="consent-form">
        <div>
          <input type="checkbox" id="consentsToRequired" name="consentsToRequired" value="consentsToRequired" checked disabled>
          <label for="consentsToRequired">{{ content.term_required }}</label>
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
      <ul class="v-linklist" :class="[content.style]">
        <li class="linklist-item" v-for="item in content.item" :key="item._uid">
          <v-image v-if="item.image['0']" class="linklist-icon" :source="item.image['0']"></v-image>
          <g-link v-if="item.link.linktype == 'story'" :to="item.link.url">{{ item.title }}</g-link>
          <a v-else :href="item.link.url" rel="noopener noreferrer">{{ item.title }}</a>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script>
export default {
  props: ["content"],
  mounted() {
    localStorage.setItem('consentsToRequired',true)
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
      this.$emit('askConsent',false);
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/styles.scss";
</style>

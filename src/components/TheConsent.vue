<template>
  <aside class="xy-consent">
    <div class="consent-container">
      <div class="consent-wrapper">
        <div id="consentOptions">
          <h5>{{ content.consent_title }}</h5>
          <v-richtext :text="content.consent_notice"></v-richtext>
          <form class="consent-form">
            <div>
              <input type="checkbox" id="consentsToMinimum" name="consentsToMinimum" value="consentsToMinimum" checked disabled>
              <label for="consentsToMinimum">{{ content.term_minimum }}</label>
            </div>
            <div>
              <input type="checkbox" id="consentsToMarketing" name="consentsToMarketing" value="consentsToMarketing" @change="addLocalStorage($event)">
              <label for="consentsToMarketing">{{ content.term_marketing }}</label>
              <input type="checkbox" id="consentsToAnalytics" name="consentsToAnalytics" value="consentsToAnalytics" @change="addLocalStorage($event)">
              <label for="consentsToAnalytics">{{ content.term_analytics }}</label>
              <input type="checkbox" id="consentsToMedia" name="consentsToMedia" value="consentsToMedia" @change="addLocalStorage($event)">
              <label for="consentsToMedia">{{ content.term_media }}</label>
            </div>
            <div>
              <button type="button" class="form-submit v-button button-primary" @click="consentAll"><a>{{ content.term_acceptall }}</a></button>
              <button type="submit" class="form-submit v-button button-outline" @click="closeConsent"><a>{{ content.term_acceptselect }}</a></button>
            </div>
            <div>
              <a role="button" tabindex="0" @click="toggleSettings">{{ content.term_settings }}</a>
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
        <div id="consentSettings" class="is-hidden">
          <a class="consent-back" role="button" tabindex="0" @click="toggleSettings">←</a>
          <h5>{{ content.term_settings }}</h5>
          <v-richtext :text="content.blurb_settings"></v-richtext>
              <div class="consent-more">
                <a>{{ content.term_information }}</a>
              </div>
          <div>
            <button type="button" class="form-submit v-button button-primary" @click="consentAll"><a>{{ content.term_acceptall }}</a></button>
            <button type="submit" class="form-submit v-button button-outline" @click="closeConsent"><a>{{ content.term_acceptselect }}</a></button>
          </div>
          <div class="consent-section">
            <div class="consent-opt">
              <div class="consent-optcheck">
                <label for="consentsToMinimumOpt">{{ content.term_minimum }}</label>
                <input type="checkbox" id="consentsToMinimumOpt" name="consentsToMinimumOpt" value="consentsToMinimum" checked disabled>
              </div>
              <v-richtext :text="content.blurb_minimum"></v-richtext>
              <div class="consent-more">
                <a>{{ content.term_information }}</a>
              </div>
            </div>
            <div class="consent-opt">
              <div class="consent-optcheck">
                <label for="consentsToMarketingOpt">{{ content.term_marketing }}</label>
                <input type="checkbox" id="consentsToMarketingOpt" name="consentsToMarketingOpt" value="consentsToMarketing" @change="addLocalStorage($event)">
              </div>
              <v-richtext :text="content.blurb_marketing"></v-richtext>
              <div class="consent-more">
                <a>{{ content.term_information }}</a>
              </div>
            </div>
            <div class="consent-opt">
              <div class="consent-optcheck">
                <label for="consentsToAnalyticsOpt">{{ content.term_analytics }}</label>
                <input type="checkbox" id="consentsToAnalyticsOpt" name="consentsToAnalyticsOpt" value="consentsToAnalytics" @change="addLocalStorage($event)">
              </div>
              <v-richtext :text="content.blurb_analytics"></v-richtext>
              <div class="consent-more">
                <a>{{ content.term_information }}</a>
              </div>
            </div>
            <div class="consent-opt">
              <div class="consent-optcheck">
                <label for="consentsToMediaOpt">{{ content.term_media }}</label>
                <input type="checkbox" id="consentsToMediaOpt" name="consentsToMediaOpt" value="consentsToMedia" @change="addLocalStorage($event)">
              </div>
              <v-richtext :text="content.blurb_media"></v-richtext>
              <div class="consent-more">
                <a>{{ content.term_information }}</a>
              </div>
            </div>
          </div>
          <ul class="consent-linklist v-linklist" :class="content.privacy_links[0].style">
            <li class="linklist-item" v-for="item in content.privacy_links[0].item" :key="item._uid">
              <v-image v-if="item.image['0']" class="linklist-icon" :source="item.image['0']"></v-image>
              <g-link v-if="item.link.linktype == 'story'" :to="item.link.url">{{ item.title }}</g-link>
              <a v-else :href="item.link.url" rel="noopener noreferrer">{{ item.title }}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </aside>
</template>

<script>
export default {
  props: ["content"],
  created() {
    if (process.isClient) {
      localStorage.setItem('consentsToMinimum',true);
      localStorage.setItem('consentsToMarketing',false);
      localStorage.setItem('consentsToAnalytics',false);
      localStorage.setItem('consentsToMedia',false);
    }
  },
  methods: {
    addLocalStorage(event) {
      localStorage.setItem(event.target.value,event.target.checked);
    },
    consentAll() {
      document.getElementById('consentsToMarketing').checked = true;
      localStorage.setItem('consentsToMarketing',true);
      document.getElementById('consentsToAnalytics').checked = true;
      localStorage.setItem('consentsToAnalytics',true);
      document.getElementById('consentsToMedia').checked = true;
      localStorage.setItem('consentsToMedia',true);
      this.closeConsent();
    },
    closeConsent() {
      localStorage.setItem('consentGiven',true);
      this.$emit('askConsent',false);
    },
    toggleSettings() {
      document.getElementById('consentOptions').classList.toggle('is-hidden');
      document.getElementById('consentSettings').classList.toggle('is-hidden');
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
  .is-hidden {
    display: none;
  }
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
  .consent-back {
    font-size: 1.5rem;
    color: $accent;
  }
  .consent-form {
    input[type='checkbox'] {
      margin-right: 0.25rem;
    }
    label {
      margin-right: 0.5rem;
    }
  }
  .consent-opt {
    border-bottom: 0.05em solid $grey;
  }
  .consent-optcheck {
    font-size: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    label {
      margin-top: 0.5rem;
      width: 100%;
    }
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

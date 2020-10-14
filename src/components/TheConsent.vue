<template>
  <aside class="xy-consent">
    <div class="consent-container">
      <div class="consent-wrapper">
        <div v-if="!consentSettings">
          <h5>{{ content.main_title }}</h5>
          <v-richtext :text="content.main_blurb"></v-richtext>
          <form class="consent-form">
            <div :key="type._uid" v-for="type of content.types">
              <input type="checkbox" :name="type.variable" v-model="checks[type.variable]" @change="addLocalStorage($event, type.variable)">
              <label :for="type.variable">{{ type.title }}</label>
            </div>
            <!-- <div>
              <input type="checkbox" id="consentsToMinimum" name="consentsToMinimum" value="consentsToMinimum" checked disabled>
              <label for="consentsToMinimum">{{ content.term_minimum }}</label>
            </div>
            <div>
              <input type="checkbox" id="consentsToMarketing" name="consentsToMarketing" v-model="checks.marketing" @change="addLocalStorage($event, 'marketing')">
              <label for="consentsToMarketing">{{ content.term_marketing }}</label>
              <input type="checkbox" id="consentsToAnalytics" name="consentsToAnalytics" v-model="checks.analytics" @change="addLocalStorage($event, 'analytics')">
              <label for="consentsToAnalytics">{{ content.term_analytics }}</label>
              <input type="checkbox" id="consentsToMedia" name="consentsToMedia" v-model="checks.media" @change="addLocalStorage($event, 'media')">
              <label for="consentsToMedia">{{ content.term_media }}</label>
            </div> -->
            <div>
              <button type="submit" class="form-submit v-button button-primary" @click="consentAll"><a>{{ content.term_acceptall }}</a></button>
              <button type="button" class="form-submit v-button button-outline" @click="closeConsent"><a>{{ content.term_acceptselect }}</a></button>
            </div>
            <div>
              <a role="button" tabindex="0" @click="consentSettings = true">{{ content.term_settings }}</a>
            </div>
          </form>
          <ul class="consent-linklist v-linklist" :class="content.links[0].style">
            <li class="linklist-item" v-for="item in content.links[0].item" :key="item._uid">
              <v-image v-if="item.image['0']" class="linklist-icon" :source="item.image['0']"></v-image>
              <g-link v-if="item.link.linktype == 'story'" :to="item.link.url">{{ item.title }}</g-link>
              <a v-else :href="item.link.url" rel="noopener noreferrer">{{ item.title }}</a>
            </li>
          </ul>
        </div>
        <!-- <!-- <div v-else>
          <a class="consent-back" role="button" tabindex="0" @click="consentSettings = false">←</a>
          <h5>{{ content.term_settings }}</h5>
          <v-richtext :text="content.blurb_settings"></v-richtext>
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
                <a role="button" tabindex="0" @click="tableMinimum = true">{{ content.term_information }}</a>
                <table class="consent-table" v-if="tableMinimum">
                  <th><td :key="item.uid" v-for="item in content.settings_minimum.thead">{{ item.value }}</td></th>
                  <tr :key="row.uid" v-for="row in content.settings_minimum.tbody"><td :key="cell.uid" v-for="cell in row.body">{{ cell.value }}</td></tr>
                </table>  
              </div>
            </div>
            <div class="consent-opt">
              <div class="consent-optcheck">
                <label for="consentsToMarketingOpt">{{ content.term_marketing }}</label>
                <input type="checkbox" id="consentsToMarketingOpt" name="consentsToMarketingOpt" v-model="checks.marketing" @change="addLocalStorage($event, 'marketing')">
              </div>
              <v-richtext :text="content.blurb_marketing"></v-richtext>
              <div class="consent-more">
                <a role="button" tabindex="0" @click="tableMarketing = true">{{ content.term_information }}</a>
                <table class="consent-table" v-if="tableMarketing">
                  <th><td :key="item.uid" v-for="item in content.settings_marketing.thead">{{ item.value }}</td></th>
                  <tr :key="row.uid" v-for="row in content.settings_marketing.tbody"><td :key="cell.uid" v-for="cell in row.body">{{ cell.value }}</td></tr>
                </table>
              </div>
            </div>
            <div class="consent-opt">
              <div class="consent-optcheck">
                <label for="consentsToAnalyticsOpt">{{ content.term_analytics }}</label>
                <input type="checkbox" id="consentsToAnalyticsOpt" name="consentsToAnalyticsOpt" v-model="checks.analytics" @change="addLocalStorage($event, 'analytics')">
              </div>
              <v-richtext :text="content.blurb_analytics"></v-richtext>
              <div class="consent-more">
                <a role="button" tabindex="0" @click="tableAnalytics = true">{{ content.term_information }}</a>
                <table class="consent-table" v-if="tableAnalytics">
                  <th><td :key="item.uid" v-for="item in content.settings_analytics.thead">{{ item.value }}</td></th>
                  <tr :key="row.uid" v-for="row in content.settings_analytics.tbody"><td :key="cell.uid" v-for="cell in row.body">{{ cell.value }}</td></tr>
                </table>
              </div>
            </div>
            <div class="consent-opt">
              <div class="consent-optcheck">
                <label for="consentsToMediaOpt">{{ content.term_media }}</label>
                <input type="checkbox" id="consentsToMediaOpt" name="consentsToMediaOpt" v-model="checks.media" @change="addLocalStorage($event, 'media')">
              </div>
              <v-richtext :text="content.blurb_media"></v-richtext>
              <div class="consent-more">
                <a role="button" tabindex="0" @click="tableMedia = true">{{ content.term_information }}</a>
                <table class="consent-table" v-if="tableMedia">
                  <th><td :key="item.uid" v-for="item in content.settings_media.thead">{{ item.value }}</td></th>
                  <tr :key="row.uid" v-for="row in content.settings_media.tbody"><td :key="cell.uid" v-for="cell in row.body">{{ cell.value }}</td></tr>
                </table>
              </div>
            </div>
          </div>
          <ul class="consent-linklist v-linklist" :class="content.links[0].style">
            <li class="linklist-item" v-for="item in content.links[0].item" :key="item._uid">
              <v-image v-if="item.image['0']" class="linklist-icon" :source="item.image['0']"></v-image>
              <g-link v-if="item.link.linktype == 'story'" :to="item.link.url">{{ item.title }}</g-link>
              <a v-else :href="item.link.url" rel="noopener noreferrer">{{ item.title }}</a>
            </li>
          </ul>
        </div> -->
      </div> 
    </div>
  </aside>
</template>

<script>
export default {
  props: ["content"],
  data() {
    return {
      consentSettings: false,
      tableMinimum: false,
      tableMarketing: false,
      tableAnalytics: false,
      tableMedia: false,
      checks: {},
    }
  },
  created() {
    if (process.isClient) {
      localStorage.setItem(`consentsToMinimum`,true);
      for (const key of Object.keys(this.checks)) {
        localStorage.setItem(`consentsTo${key}`, false);
      }
    }
  },
  methods: {
    addLocalStorage(event, value) {
      localStorage.setItem(`consentsTo${value}`, event.target.checked);
    },
    consentAll() {
      if (process.isClient) {
        for (const key of Object.keys(this.checks)) {
          this.checks[key] = true;
          localStorage.setItem(`consentsTo${key}`, true);
        }
        this.closeConsent();
      }
    },
    closeConsent() {
      if (process.isClient) {
        localStorage.setItem('consentGiven',true);
        this.$emit('askConsent',false);
      }
    }
  },
  computed: {
    checkedItems() {
      let obj = {};
      this.content.types.forEach(item => {
        (item.variable == 'consentsToMinimum') ? obj[item.variable] = true : obj[item.variable] = false;
      });
      this.checks = obj;
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
    max-height: 90vh;
    overflow-y: auto;
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
  table.consent-table {
    width: 100%;
    margin-bottom: 0.5rem;
    tr, th {
      width: 100%;
      display: flex;
    }
    tr {
      border-top: 0.05em solid $lightGrey;
    }
    td {
      flex: 0 0 50%;
      text-align: left;
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

<template>
  <aside class="xy-consent">
    <div class="consent-container">
      <div class="consent-wrapper">
        <div v-if="!consentSettings">
          <h5>{{ content.main_title }}</h5>
          <v-richtext :text="content.main_blurb"></v-richtext>
          <form class="consent-form">
            <div :key="type._uid" v-for="type of content.types">
              <label v-if="type.variable == 'consentsToMinimum'">
                <input type="checkbox" :name="type.variable" v-model="checks[type.variable]" disabled checked @change="addLocalStorage($event, type.variable)"><span>{{ type.title }}</span>
              </label>
              <label v-else><input type="checkbox" :name="type.variable" v-model="checks[type.variable]" :disabled="type.variable == 'consentsToMinimum'" @change="addLocalStorage($event, type.variable)"><span>{{ type.title }}</span></label>
            </div>
            <div class="consent-center">
              <button type="button" class="form-submit v-button button-primary" @click="consentAll"><a>{{ content.button_selectall }}</a></button>
              <button type="submit" class="form-submit v-button button-outline" @click="closeConsent"><a>{{ content.button_continue }}</a></button>
            </div>
            <div class="consent-center">
              <a class="consent-next" role="button" tabindex="0" @click="consentSettings = !consentSettings">{{ content.button_expand }}</a>
            </div>
          </form>
          <ul class="consent-center consent-linklist v-linklist" :class="content.links[0].style">
            <li class="linklist-item" v-for="item in content.links[0].item" :key="item._uid">
              <v-image v-if="item.image['0']" class="linklist-icon" :source="item.image['0']"></v-image>
              <g-link v-if="item.link.linktype == 'story'" :to="item.link.url">{{ item.title }}</g-link>
              <a v-else :href="item.link.url" rel="noopener noreferrer">{{ item.title }}</a>
            </li>
          </ul>
        </div>
        <div v-else>
          <a class="consent-prev" role="button" tabindex="0" @click="consentSettings = !consentSettings">←</a>
          <h5>{{ content.settings_title }}</h5>
          <v-richtext :text="content.settings_blurb"></v-richtext>
          <div class="consent-center">
            <button type="button" class="form-submit v-button button-primary" @click="consentAll"><a>{{ content.button_selectall }}</a></button>
            <button type="submit" class="form-submit v-button button-outline" @click="closeConsent"><a>{{ content.button_continue }}</a></button>
          </div>
          <div class="consent-section" :key="type._uid" v-for="type of content.types">
            <div class="consent-opt">
              <div class="consent-optcheck">
                <label v-if="type.variable == 'consentsToMinimum'"><span>{{ type.title }}</span><input type="checkbox" checked disabled :name="type.variable" v-model="checks[type.variable]" @change="addLocalStorage($event, type.variable)"></label>
                <label v-else><span>{{ type.title }}</span><input type="checkbox" :name="type.variable" v-model="checks[type.variable]" @change="addLocalStorage($event, type.variable)"></label>
              </div>
              <v-richtext :text="type.blurb"></v-richtext>
              <div class="consent-more">
                <a role="button" tabindex="0" @click="showTable(type.variable)">{{ content.button_expand }}</a>
                <table class="consent-table" v-if="tables[`${type.variable}`]">
                  <th><td :key="item.uid" v-for="item in type.details">{{ item.value }}</td></th>
                  <tr :key="row.uid" v-for="row in type.details.tbody"><td :key="cell.uid" v-for="cell in row.body">{{ cell.value }}</td></tr>
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
        </div>
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
      tables: {},
      checks: {},
    }
  },
  created() {
    if (process.isClient) {
      localStorage.setItem(`consentsToMinimum`,true);
      for (const key of Object.keys(this.checks)) {
        localStorage.setItem(key, false);
      }
    }
  },
  methods: {
    addLocalStorage(event, value) {
      localStorage.setItem(value, event.target.checked);
    },
    consentAll() {
      for (const key of Object.keys(this.checkedItems)) {
        this.checks[key] = true;
        localStorage.setItem(key, true);
      }
      this.closeConsent();
    },
    closeConsent() {
      if (process.isClient) {
        localStorage.setItem('consentGiven',true);
        this.$emit('askConsent',false);
      }
    },
    showTable(value) {
      this.tables[value] = !this.tables[value];
    }
  },
  computed: {
    checkedItems() {
      let obj = {};
      this.content.types.forEach(item => {
        (item.variable == 'consentsToMinimum') ? obj[item.variable] = true : obj[item.variable] = false;
      });
      this.checks = obj;
      return obj;
    },
    tableItems() {
      let obj = {};
      this.content.types.forEach(item => obj[item.variable] = false );
      this.tables = obj;
      return obj;
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
  .consent-next {
    color: $accent;
  }
  .consent-prev {
    font-size: 1.5rem;
    color: $accent;
  }
  .consent-center {
    text-align: center;
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
    label {
      display: flex;
      justify-content: space-between;
      align-items: center;
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

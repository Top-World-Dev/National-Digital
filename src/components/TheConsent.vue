<template>
  <aside>
    <div v-if="showModal" class="xy-consent">
      <div class="consent-container">
        <div class="consent-wrapper">
          <div v-if="!consentSettings && showModal">

            <h5>{{ content.main_title }}</h5>
            <v-richtext :text="content.main_blurb"></v-richtext>
            <div class="consent-form">
              <div :key="type._uid" v-for="type of content.types">
                <label v-if="type.variable == 'consentsToMinimum'"><span>{{ type.title }}</span><span class="consent-toggle"><input type="checkbox" checked disabled :name="type.variable" v-model="checks[type.variable]" @change="addLocalStorage($event, type.variable)"><span class="consent-switch"></span></span></label>
                <label v-else><span>{{ type.title }}</span><span class="consent-toggle"><input type="checkbox" :name="type.variable" v-model="checks[type.variable]" @change="addLocalStorage($event, type.variable)"><span class="consent-switch"></span></span></label>
              </div>
              <div class="consent-center">
                <button type="button" class="form-submit v-button button-primary" @click="consentAll"><a>{{ content.button_selectall }}</a></button>
                <button type="button" class="form-submit v-button button-outline" @click="closeConsent"><a>{{ content.button_continue }}</a></button>
              </div>
              <div class="consent-center">
                <a class="consent-next" role="button" tabindex="0" @click="consentSettings = !consentSettings">{{ content.button_expand }}</a>
              </div>
            </div>
            <v-richtext :text="content.footer_blurb"></v-richtext>
            <ul class="consent-center consent-linklist v-linklist" :class="content.links[0].style">
              <li class="linklist-item" v-for="item in content.links[0].item" :key="item._uid" @click="checkRoute(item.link.cached_url)">
                <v-image v-if="item.image['0']" class="linklist-icon" :source="item.image['0']"></v-image>
                <g-link v-if="item.link.linktype == 'story'" :to="item.link.cached_url">{{ item.title }}</g-link>
                <a v-else :href="item.link.url" rel="noopener noreferrer">{{ item.title }}</a>
              </li>
            </ul>
          </div>
          <div v-if="consentSettings && showModal">
            <a class="consent-prev" role="button" tabindex="0" @click="consentSettings = !consentSettings">←</a>
            <h5>{{ content.settings_title }}</h5>
            <v-richtext :text="content.settings_blurb"></v-richtext>
            <div class="consent-center">
              <button type="button" class="form-submit v-button button-primary" @click="consentAll"><a>{{ content.button_selectall }}</a></button>
              <button type="button" class="form-submit v-button button-outline" @click="closeConsent"><a>{{ content.button_continue }}</a></button>
            </div>
            <div class="consent-section" :key="type._uid" v-for="type of content.types">
              <div class="consent-opt">
                <div class="consent-optcheck">
                  <label v-if="type.variable == 'consentsToMinimum'"><span>{{ type.title }}</span><span class="consent-toggle"><input type="checkbox" checked disabled :name="type.variable" v-model="checks[type.variable]" @change="addLocalStorage($event, type.variable)"><span class="consent-switch"></span></span></label>
                  <label v-else><span>{{ type.title }}</span><span class="consent-toggle"><input type="checkbox" :name="type.variable" v-model="checks[type.variable]" @change="addLocalStorage($event, type.variable)"><span class="consent-switch"></span></span></label>
                </div>
                <v-richtext :text="type.blurb"></v-richtext>
                <div class="consent-more">
                  <a class="consent-expand" role="button" tabindex="0" @click="showTable(type.variable)">{{ content.button_expand }}</a>
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
                <g-link v-if="item.link.linktype == 'story'" :to="item.link.cached_url">{{ item.title }}</g-link>
                <a v-else :href="item.link.url" rel="noopener noreferrer">{{ item.title }}</a>
              </li>
            </ul>
          </div>
        </div> 
      </div>
    </div>
  </aside>
</template>

<script>
import EventBus from '../eventbus';
export default {
  props: ["content"], 
  data() {
    return {
      consentSettings: false,
      tables: {}, 
      showModal: false,
      ignoreConsent: false,   
    }
  },
  mounted() {
    EventBus.$on('toggleModal', (action = !this.showModal) => {
      this.showModal = action;
    });
    if (process.isClient) {
      setTimeout(() => {
        if(JSON.parse(localStorage.getItem('consentGiven')) == null && this.ignoreConsent) {
          localStorage.setItem(`consentsToMinimum`, JSON.stringify(false));
        } else {
          // if the modal hasn't ever displayed then set the defaults
          if (!JSON.parse(localStorage.getItem('consentGiven')) && !this.ignoreConsent) {
            this.showModal = true;
            for (const key of Object.keys(this.checks)) {
              localStorage.setItem(key, JSON.stringify(false));
            }
            localStorage.setItem(`consentsToMinimum`, JSON.stringify(true));
          };
        }
      }, 200);
    }
  },
  methods: {
    addLocalStorage(event, value) {
      localStorage.setItem(value, JSON.stringify(event.target.checked));
    },
    consentAll() {
      for (const key of Object.keys(this.checks)) {
        this.checks[key] = true;
        localStorage.setItem(key, JSON.stringify(true));
      }
      setTimeout(function(){ 
        this.closeConsent() 
      }.bind(this), 300);

    },
    checkRoute(page) {
      if(this.$route.path.replace('/', '') == page) {
        if(this.$page.storyblokEntry.content.meta[0].exconsent) {
          this.ignoreConsent = true;
          this.showModal = false;
        }
      }
    },
    closeConsent() {
      if (process.isClient) {
        localStorage.setItem('consentGiven', JSON.stringify(true));
        this.showModal = !this.showModal
      }
    },
    showTable(value) {
     this.tables[value] = !this.tables[value];
    }
  },
  computed: {
    checks() {
      let obj = {};
      if(localStorage && Object.keys(localStorage).some(x => x.startsWith('consent'))) {
        Object.keys(localStorage).forEach(item => {
          if(item.startsWith('consent')) {
            obj[item] = JSON.parse(localStorage.getItem(item));
          }
        })
      }
      else {
        this.content.types.forEach(item => {
          (item.variable == 'consentsToMinimum') ? obj[item.variable] = true : obj[item.variable] = false;
        });
      }

      return obj;  
    }
  },
  watch: {
    consentSettings: function (oldVal, newVal) {
      if(!newVal) {
        let obj = {};
        this.content.types.forEach(item => obj[item.variable] = false );
        this.tables = obj;
      }
    },
    '$route': {
      handler(newVal, oldVal) {
        if(this.$page.storyblokEntry.content.meta[0].exconsent) {
          this.ignoreConsent = true;
        }
      },
      immediate: true
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
  z-index: 999999;
  &.is-hidden {
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
    &:hover {
      border-color: $accent;
    }
  }
  .consent-prev {
    font-size: 1.5rem;
    color: $accent;
    &:hover {
      border-color: $accent;
    }
  }
  .consent-expand {
    color: $accent;
    &:hover {
      border-color: $accent;
    }
  }
  .consent-center {
    text-align: center;
  }
  .consent-form {
    label {
      font-size: 0.875rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 0.5rem;
      width: 100%;
    }
  }
  .consent-opt {
    border-bottom: 0.1em solid $grey;
  }
  .consent-optcheck {
    label {
      font-size: 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 0.5rem;
      width: 100%;
    }
  }
  .consent-table {
    width: 100%;
    margin-bottom: 0.5rem;
    tr, th {
      width: 100%;
      display: flex;
    }
    tr {
      border-top: 0.1em solid $lightGrey;
    }
    td {
      flex: 0 0 50%;
      text-align: left;
    }  
  }

  .consent-toggle {
    position: relative;
    display: inline-block;
    width: 3.5em;
    height: 2em;
    input {
      opacity: 0;
      width: 0;
      height: 0;
    }
  }

  .consent-switch:before {
    position: absolute;
    content: "";
    height: 1.5em;
    width: 1.5em;
    left: 0.2em;
    bottom: 0.25em;
    background-color: $white;
    transition: .4s;
    border-radius: 50%;
  }

  .consent-switch {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: $lightGrey;
    transition: .4s;
    border-radius: 2em;
  }

  input:checked + .consent-switch {
    background-color: $accent;
  }

  input:focus + .consent-switch {
    box-shadow: 0 0 0.05em $accent;
  }

  input:disabled + .consent-switch {
    background-color: rgba($accent,0.25);
  }

  input:checked + .consent-switch:before {
    transform: translateX(1.6em);
  }

  .consent-linklist.v-linklist { // override defaults
    font-size: 0.75rem;
    color: $black;
    a:hover {
      border-color: $black;
    }
  }
}
</style>

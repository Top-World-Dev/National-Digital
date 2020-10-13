<template>
  <aside class="xy-consent">
    <div class="consent-container">
      <h4>{{ content.consent_title }}</h4>
      <p>{{ content.consent_notice }}</p>
      <form class="consent-form">
        <div>
          <input type="checkbox" id="consent_required" name="consent_required" value="consent_required" disabled>
          <label for="consent_required">{{ content.term_required }}</label>
        </div>
        <div>
          <input type="checkbox" id="consent_marketing" name="consent_marketing" value="consent_marketing" disabled>
          <label for="consent_marketing">{{ content.term_marketing }}</label>
          <input type="checkbox" id="consent_analytics" name="consent_analytics" value="consent_analytics" disabled>
          <label for="consent_analytics">{{ content.term_analytics }}</label>
          <input type="checkbox" id="consent_media" name="consent_media" value="consent_media" disabled>
          <label for="consent_media">{{ content.term_media }}</label>
        </div>
        <div>
          <button type="button" class="form-submit v-button button-primary"><a>{{ content.term_aceptall }}</a></button>
          <button type="submit" class="form-submit v-button button-outline"><a>{{ content.term_aceptselect }}</a></button>
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
};
</script>

<style lang="scss">
@import "~/assets/styles.scss";
</style>

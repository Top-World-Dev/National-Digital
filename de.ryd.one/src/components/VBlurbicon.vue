<template>
  <div class="v-blurbicon" v-editable="blok" :class="blok.orientation">
    <div class="blurbicon-item" v-for="item in blok.item" :key="item._uid">
      <v-image :source="item.image['0']"></v-image>
      <div class="blurbicon-content">
        <h6 v-if="item.title">{{ item.title }}</h6>
        <v-richtext v-if="item.content" :text="item.content"></v-richtext>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["blok"],
};
</script>
<style lang="scss">
@import "~/assets/styles.scss";
.v-blurbicon {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  &.blurbicon-vertical {
    .blurbicon-item {
      flex: 0 0 320px;
      margin: 1.5rem;
      display: flex;
      flex-direction: column;
    }
  }
  &.blurbicon-horizontal {
    .blurbicon-item {
      flex: 0 0 460px;
      margin: 1.5rem;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
    }
    .blurbicon-content {
      text-align: left;
      margin-left: 1.5rem;
    }
  }
}
</style>
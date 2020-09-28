<template>
  <div class="v-blurbicon" v-editable="blok">
    <div class="blurbicon-item" v-for="item in blok.item">
      <div>image here</div>
      <h5 v-if="item.title">{{ item.title }}</h5>
      <div v-if="item.content">{{ item.content }}</div>
    </div>
</div>
</template>
<script>
  export default {
    props: ['blok']
  }
</script>
<style lang="scss">
@import '~/assets/styles.scss';
.v-blurbicon {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
  .blurbicon-item {
    flex: 0 0 320px;
    margin: 1rem;
  }
}
</style>
<template>
  <div class="v-accordion" v-editable="blok" :class="blok.align">
    <div v-for="item in blok.item" :key="item._uid">
      <div class="accordion-item">
        <div class="accordion-title" :class="{ 'is-active': isActive == item._uid }" @click="openAccordion(item)">
          {{ item.title }}
          </div>
        <v-richtext class="accordion-content" :text="item.content"></v-richtext>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['blok'],
    data() {
      return {
        isActive: false
      }
    },
    methods: {
      openAccordion(item) {
        if(this.isActive != item._uid){
          this.isActive = item._uid
        }else{
          this.isActive = false;
        }
      }
    }
  }
</script>
<style lang="scss">
@import '~/assets/styles.scss';

.v-accordion {
  font-size: 0.875rem;
  @include no-list;

  .accordion-item{
    text-align: left;
    position: relative;
    overflow: hidden;

    .accordion-title{
      position: relative;
      width: 100%;
      background: $purple;
      color: $white;
      padding: 20px;
      margin: 0;
      cursor: pointer;
      z-index: 2;
      font-size: 20px;
      font-weight: bold;
      text-transform: uppercase;

      &::after{
        content: " ";
        display: block;
        position: absolute;
        right: 20px;
        top: 28px;
        border-left: 6px solid $green;
        border-bottom: 6px solid transparent;
        border-right: 6px solid transparent;
        border-top: 6px solid transparent;
      }

      &.is-active{
        + .accordion-content{
          min-height: 1px;
          max-height: 2000px;
          transition: all 0.5s ease-in-out;
        }

        &::after{
          top: 24px;
          border-left: 6px solid transparent;
          border-bottom: 6px solid $green;
          border-right: 6px solid transparent;
          border-top: 6px solid transparent;
        }
      }
    }

    .accordion-content{
      position: relative;
      background: $white;
      border: 1px solid $lightGrey;
      border-top:none;
      -webkit-border-bottom-right-radius: 8px;
      -webkit-border-bottom-left-radius: 8px;
      -moz-border-radius-bottomright: 8px;
      -moz-border-radius-bottomleft: 8px;
      border-bottom-right-radius: 8px;
      border-bottom-left-radius: 8px;
      max-height: 0;
      overflow: hidden;
      margin-bottom: 20px;
      transition: all 0.5s ease-in-out;
      z-index: 1;
      
      > div{
        padding: 40px 20px;
      }
    }


  }
  
  // align
  &.accordion-align-left{
    justify-content: flex-start;
  }
  &.accordion-align-center{
    justify-content: center;
  }
  &.accordion-align-right{
    justify-content: flex-end;
  }
}
</style>
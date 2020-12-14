<template>
  <div class="v-pricing" v-editable="blok" :class="blok.align">
    <div v-for="item in blok.item" :key="item._uid">
      <div class="pricing-item" :class="{ 'isMain': item.isFeatured }" >
       
        <span class="pricing-title">
          {{ item.title }}
          <span v-if="item.isFeatured" class="pricing-featured">
            {{item.featuredTitle}}
          </span>
        </span>
        <div class="pricing-main">
          <div class="pricing-content">
            <span class="currency">{{item.currency}}</span>
            <span class="price">{{item.price}}</span>
            <span class="split">
              <span class="fractional">{{item.fractional}}</span>
              <span class="period">/{{item.period}}</span>
            </span>
          </div>
          <div class="pricing-details" >
            <span>{{item.pricingDetails}}</span>
            <div v-for="btn in item.btn" :key="btn._uid" >
                <a class="pricing-btn" :href="btn.link.url" rel="noopener noreferrer">{{ btn.text }}</a>
            </div>
          </div>
        </div>
        <span class="pricing-info" @click="openAccordion(item)" >{{item.infoLabel}}</span>
        <div class="info-box" :class="{ 'is-active': isActive == item._uid }">
          <span class="info-box-title">{{item.infoTitle}} <span class="close-info" @click="openAccordion(item)">X</span></span>
          <v-richtext class="info-box-content" :text="item.infoContent"></v-richtext>
        </div>
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

.v-pricing {
  font-size: 0.875rem;
  @include no-list;
  display: flex;
  justify-content:center;
  align-items: center;


  &>div{
    width: 30%;
    margin: 0 6px;
  }

  .pricing-item{
    text-align: center;
    position: relative;
    width:100%;
    height:auto;
    margin:0px 10px;
    overflow: hidden;

       .pricing-featured{
        background: $orange;
        font-size: 0.8rem;
        color: $white;
        font-weight: bold;
        text-transform: uppercase;
        text-align-last: center;
        padding: 4px 0px;
        width: 160px;
        position: absolute;
        right: -40px;
        top:24px;
        transform: rotate(45deg);
      }

    .pricing-title{
      background:$purple;
      color:$white;
      text-transform: uppercase;
      font-weight: bold;
      font-size: 1.5rem;
      line-height: 1.8rem;
      padding: 12px 0px;
      width: 100%;
      text-align: center;
      display: block;
    }

    .pricing-main{
      border:1px solid #ccc;
      border-top: 0;
      color: $purple;
      background:$veryLightGrey;
      padding: 40px 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      -webkit-border-bottom-right-radius: 8px;
      -webkit-border-bottom-left-radius: 8px;
      -moz-border-radius-bottomright: 8px;
      -moz-border-radius-bottomleft: 8px;
      border-bottom-right-radius: 8px;
      border-bottom-left-radius: 8px;
    }

    .pricing-content{
     
      .split{
        display: inline-block;
        margin-left: 4px;
      }

      .currency, .price{
        font-size: 2.4rem;
        font-weight: bold;
      }

      .price{
        margin-left: 8px;
      }

      .fractional{
        display: block;
        font-size: 1rem;
        font-weight: bold;
        line-height: 1rem;
        text-align: left;
      }

      .period{
        display: block;
        font-size: 0.9rem;
        line-height: 0.9rem;
      }
    }

    .pricing-details{
      margin-top: 32px;
      width: 100%;


      &>div{
        width:100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .pricing-btn{
        display: block;
        border:none;
        width: 60%;
        padding: 8px;
        border-radius: 20px;
        margin-top: 24px;
        color: $purple;
        background: $green;
        font-weight: bold;
        text-decoration: none;


        &:hover{
          border: none;
          background: lighten($green,10%);
          color: $purple;
        }


      }
    }

    &.isMain{
      
      .pricing-main{
        padding: 60px 20px;
        background: $purple;
        color: $white;
      }
      
      .pricing-btn{
        background: $green;
        color: $purple;

        &:hover{
          border: none;
          background: lighten($green,10%);
          color: $purple;
        }
      }
    }

    .pricing-info{
      cursor: pointer;
      color: $darkGreen;
      font-weight: normal;
      margin-top:12px;
      display: inline-block;

      &:hover{
        text-decoration: underline;
      }
    }

    .info-box{
      width: 600px;
      z-index: 1000;
      background: $white;
      display: none;
      transition: all 0.3s ease-in-out;
      top: 0;

      &::before{
        opacity: 0;
      }

      &.is-active{
        display: block;
        position: fixed;
        top: 20%;
        left: 50%;
        margin-left: -300px;
        transition: all 0.3s ease-in-out;

        &::before{
          content: "";
          display: block;
          background: rgba(0,0,0, 0.8);
          position: fixed;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          width: 100%;
          height: 100%;
          z-index: 999;
          opacity: 1;
        }

        .info-box-title{
          display: block;
          background: $purple;
          color: $white;
          font-size: 1.4rem;
          font-weight: bold;
          padding: 20px 32px;
          position: relative;
          z-index: 9999;
          width: 100%;
          text-align: left;
          
          .close-info{
            font-size: 1rem;
            font-weight: normal;
            position: absolute;
            right: 16px;
            top: 12px;
            cursor: pointer;
            font-family: Arial;
          }

        }

        .info-box-content{
          display: block;
          background: $white;
          color: $veryDarkGrey;
          font-size: 1rem;
          line-height: 1.6rem;
          text-align: left;
          padding: 24px 32px;
          position: relative;
          z-index: 9999;
          width: 100%;

          ul{
            padding: 0;
            margin: 0;
            li{
              list-style: none;
            }
          }
        }
      }
    }
  }
}

@media (max-width: $breakColumns) {
	 .v-pricing{
     flex-direction: column;
     
    &>div{
        width: 100%;
        margin: 0;
    }
     
     .pricing-item{
       margin: 0;
       margin-bottom: 32px;

       .info-box{
        width: 100%;

        &.is-active{
          display: block;
          position: fixed;
          top: 10%;
          left: 0;
          margin-left: 0px;
          transition: all 0.3s ease-in-out;
        }
      }
     }

      
	 }
}
</style>
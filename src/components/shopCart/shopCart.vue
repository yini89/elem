<template>
  <div class="shop-cart">
    <div class="content">
      <div class="content-left">
        <div class="logo-wrapper" :class="{highLight: totalCount > 0}">
          <div class="logo">
            <i class="icon-shopping_cart"></i>
          </div>
          <div class="num" v-if="totalCount > 0">{{totalCount}}</div>
        </div>
        <div class="price" :class="{highLight: totalCount > 0}">￥{{totalPrice}}</div>
        <div class="desc">另需配送费￥4元</div>
      </div>
      <div class="content-right" :class="{highLight: totalPrice > minPrice}">
        <div class="pay">{{payText}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      selectFood: {
        type: Array,
        default() {
          return [
            {
              count: 1,
              price: 10
            }
          ];
        }
      },
      deliveryPrice: {
        type: Number
      },
      minPrice: {
        type: Number
      }
    },
    computed: {
      totalPrice() {
        let total = 0;
        for (let i = 0; i < this.selectFood.length; i++) {
          total += this.selectFood[i].price * this.selectFood[i].count;
        }
        return total;
      },
      totalCount() {
        let total = 0;
        for (let i = 0; i < this.selectFood.length; i++) {
          total += this.selectFood[i].count;
        }
        return total;
      },
      payText() {
        if (this.totalPrice === 0) {
          return '￥20元起送';
        } else if (this.totalPrice < this.minPrice) {
          let num = this.minPrice - this.totalPrice;
          return `还差￥${num}起送`;
        } else {
          return '去支付';
        }
      }
    }
  };
</script>

<style scoped lang="stylus">
  .shop-cart
    position: fixed
    left: 0
    bottom: 0
    height: 48px
    width: 100%
    background-color: #141d27
    z-index: 50
    .content
      position: relative
      display: flex
      width: 100%
      height: 100%
      color: rgba(255, 255, 255, 0.4)
      z-index: 60
      .content-left
        flex: 1
        .logo-wrapper
          position: relative
          display: inline-block
          top: -10px
          width: 56px
          height: 56px
          border-radius: 50%
          margin: 0 12px
          padding: 6px
          box-sizing: border-box
          text-align: center
          background-color: #141d27
          &.highLight
            .logo
              background-color: rgb(0, 160, 220)
              .icon-shopping_cart
                color: #fff
          .logo
            width: 44px
            height: 44px
            border-radius: 50%
            background-color: #141d27
            box-sizing: border-box
            background: rgba(255, 255, 255, 0.1)
            .icon-shopping_cart
              display: inline-block
              line-height: 44px
              font-size: 24px
              color: rgba(255, 255, 255, 0.4)
          .num
            position: absolute
            right: 0
            top: 0
            width: 24px
            height: 16px
            line-height: 16px
            border-radius: 16px
            color: #fff
            background: rgb(240, 20, 20)
            text-align: center
        .price
          display: inline-block
          vertical-align: top
          margin-top: 12px
          line-height: 24px
          font-size: 16px
          font-weight: 700
          padding-right: 12px
          border-right: 1px solid rgba(255, 255, 255, 0.1)
          &.highLight
            color: #fff
        .desc
          display: inline-block
          vertical-align: top
          margin: 12px 0 0 12px
          line-height: 24px
          font-size: 10px
      .content-right
        flex: 0 0 105px
        width: 105px
        line-height: 48px
        text-align: center
        font-size: 12px
        font-weight: 700
        background: rgba(255, 255, 255, 0.2)
        &.highLight
          background-color: rgb(0, 160, 220)
          color: #fff
</style>

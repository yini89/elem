<template>
  <div class="shop-cart">
    <div class="content">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo">
            <i class="icon-shopping_cart"></i>
          </div>
          <div class="num"></div>
        </div>
        <div class="price"></div>
        <div class="desc">另需配送费￥4元</div>
      </div>
      <div class="content-right">
        <div class="pay">￥20元起送</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      food: {
        type: Object,
        default() {
          return {
            count: 1,
            price: 10
          };
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
    .content
      display: flex
      .content-left
        flex: 1
        .logo-wrapper
          .logo
            position: absolute
            left: 18px
            bottom: 8px
            width: 53px
            height: 53px
            border-radius: 50%
            background-color: #141d27
            text-align: center
            border-box: box-sizing
            .icon-shopping_cart
              display: inline-block
              width: 44px
              height: 44px
              margin: 6px auto 8px auto
              border-radius: 50%
              line-height: 44px
              font-size: 24px
              color: rgba(255, 255, 255, 0.4)
              background: rgba(255, 255, 255, 0.1)
</style>

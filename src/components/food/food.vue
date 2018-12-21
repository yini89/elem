<template>
  <transition name="move">
    <div class="food" v-show="foodShow" ref="food">
      <div class="img-header">
        <img :src="food.image" alt="">
        <div class="back" @click="back">
          <span class="icon-arrow_lift"></span>
        </div>
      </div>
      <div class="content">
        <h1 class="name">{{food.name}}</h1>
        <div class="desc">
          <span class="sell-count">月售{{food.sellCount}}份</span>
          <span class="rating">好评率{{food.rating}}%</span>
        </div>
        <div class="price">
          <span class="now"><span class="uom">￥</span>{{food.price}}</span>
          <span class="old" v-if="food.oldPrice"><span class="uom">￥</span>{{food.oldPrice}}</span>
        </div>
        <div class="addToCart" @click="addFirst" v-if="!food.count || food.count === 0">加入购物车</div>
        <div class="cart-control-wrapper" v-if="food.count && food.count !== 0">
          <cartControl :food="food"></cartControl>
        </div>
      </div>
      <split v-if="food.info"></split>
      <div class="info">
        <h2 class="title">商品介绍</h2>
        <p class="text">{{food.info}}</p>
      </div>
      <split></split>
      <div class="rating-wrapper">
        <h2 class="title">商品评价</h2>
      </div>
    </div>
  </transition>
</template>

<script>
  import cartControl from '../cartControl/cartControl';
  import BScroll from 'better-scroll';
  import split from '../split/split';
  export default {
    props: {
      food: {
        type: Object
      }
    },
    components: {
      cartControl,
      split
    },
    data() {
      return {
        foodShow: false
      };
    },
    methods: {
      show() {
        this.foodShow = true;
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.food, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        });
      },
      addFirst() {
        if (!this.food.count) {
          this.$set(this.food, 'count', 1);
        } else {
          this.food.count++;
        }
      },
      back() {
        this.foodShow = false;
      }
    }
  };
</script>

<style scoped lang="stylus">
  .food
    position: fixed
    left: 0
    top: 0
    bottom: 48px
    width: 100%
    background-color: #fff
    &.move-enter-active, &.move-leave-active
      transition: all 0.4s linear
      transform: translate3d(0, 0, 0)
    &.move-enter, &.move-leave-to
      transform: translate3d(100%, 0, 0)
    .img-header
      position: relative
      width: 100%
      height: 0
      padding-bottom: 100%
      img
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
      .back
        position: absolute
        top: 10px
        left: 10px
        padding: 10px
        color: #fff
    .content
      position: relative
      padding: 18px
      background: #fff
      .name
        line-height: 14px
        font-size: 14px
        font-weight: 700
        color: rgb(7, 17, 27)
      .desc
        margin: 8px 0 18px 0
        line-height: 10px
        font-size: 0
        color: rgb(147, 153, 159)
        .sell-count
          margin-right: 12px
          font-size: 10px
        .rating
          font-size: 10px
      .price
        font-size: 0
        .now
          line-height: 24px
          font-size: 14px
          font-weight: 700
          color: rgb(240, 20, 20)
          .uom
            font-size: 10px
            font-weight: normal
        .old
          margin-left: 12px
          line-height: 24px
          font-size: 10px
          font-weight: 700
          color: rgb(147, 153, 159)
          text-decoration: line-through
          .uom
            font-weight: normal
      .addToCart
        position: absolute
        right: 18px
        bottom: 18px
        line-height: 12px
        padding: 6px 12px
        font-size: 10px
        border-radius: 12px
        color: #fff
        background: rgb(0, 160, 220)
      .cart-control-wrapper
        position: absolute
        right: 18px
        bottom: 18px
    .info
      padding: 18px
      background-color: #fff
      .title
        line-height: 14px
        font-size: 14px
        color: rgb(7, 17, 27)
      .text
        margin-top: 6px
        padding: 0 8px
        line-height: 24px
        font-size: 12px
        color: rgb(77, 85, 93)
</style>

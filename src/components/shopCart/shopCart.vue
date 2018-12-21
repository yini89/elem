<template>
  <div class="shop-cart">
    <div class="content" @click="toggleList">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{highLight: totalCount > 0}">
            <i class="icon-shopping_cart" :class="{highLight: totalCount > 0}"></i>
          </div>
          <div class="num" v-if="totalCount > 0">{{totalCount}}</div>
        </div>
        <div class="price" :class="{highLight: totalCount > 0}">￥{{totalPrice}}</div>
        <div class="desc">另需配送费￥4元</div>
      </div>
      <div class="content-right" :class="{highLight: totalPrice > minPrice}" @click.stop.prevent="goPay">
        <div class="pay">{{payText}}</div>
      </div>
    </div>
    <div class="ball-container">
      <transition-group
        name="drop"
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter">
        <div v-for="(ball) in balls" :key="ball.code" v-show="ball.show" class="ball">
          <div class="inner inner-hook"></div>
        </div>
      </transition-group>
    </div>
    <transition name="fold">
      <div class="cart-list" v-show="listShow">
        <div class="list-header">
          <span class="title">购物车</span>
          <span class="empty" @click="empty">清空</span>
        </div>
        <div class="list-content" ref="listContent">
          <ul>
            <li class="list-item border-1px" v-for="(item, index) in selectFood" :key="index">
              <div class="name">{{item.name}}</div>
              <div class="price">
                <span class="uom">￥</span>{{item.price}}
              </div>
              <div class="cart-control-wrapper">
                <cartControl :food="item"></cartControl>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div class="list-mask" v-show="listShow"></div>
    </transition>
  </div>
</template>

<script>
  import cartControl from '../cartControl/cartControl';
  import BScroll from 'better-scroll';
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
    components: {
      cartControl
    },
    data() {
      return {
        balls: [
          {show: false, code: 0},
          {show: false, code: 1},
          {show: false, code: 2},
          {show: false, code: 3},
          {show: false, code: 4}
        ],
        dropBalls: [],
        fold: true
      };
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
      },
      listShow() {
        if (this.totalPrice === 0) {
          return false;
        }
        let show = !this.fold;
        return show;
      }
    },
    methods: {
      toggleList() {
        if (!this.totalCount) {
          return;
        }
        this.fold = !this.fold;
        if (!this.fold) {
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.listContent, {
                click: true
              });
            } else {
              this.scroll.refresh();
            }
          });
        }
      },
      empty() {
        this.selectFood.forEach((item) => {
          item.count = 0;
        });
      },
      goPay() {
        if (!this.totalCount || this.totalPrice < this.minPrice) {
          return;
        }
        window.alert(`一共${this.totalPrice}元`);
      },
      drop(el) {
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i];
          if (!ball.show) {
            ball.show = true;
            ball.el = el;
            this.dropBalls.push(ball);
            return;
          }
        }
      },
      beforeEnter(el, done) {
        let count = this.balls.length;
        while (count--) {
          let ball = this.balls[count];
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect();
            let x = rect.left - 32;
            let y = -(window.innerHeight - rect.top - 22);
            el.style.display = '';
            el.style.webkitTransform = `translate3d(0, ${y}px, 0)`;
            el.style.transform = `translate3d(0, ${y}px, 0)`;
            let inner = el.querySelector('.inner-hook');
            inner.style.webkitTransform = `translate3d(${x}px, 0, 0)`;
            inner.style.transform = `translate3d(${x}px, 0, 0)`;
          }
        }
      },
      enter(el, done) {
        /* eslint-disable no-unused-vars */
        let rf = el.offsetHeight;
        this.$nextTick(() => {
          el.style.webkitTransform = 'translate3d(0, 0, 0)';
          el.style.transform = 'translate3d(0, 0, 0)';
          let inner = el.querySelector('.inner-hook');
          inner.style.webkitTransform = 'translate3d(0, 0, 0)';
          inner.style.transform = 'translate3d(0, 0, 0)';
          el.addEventListener('transitionend', done);
        });
      },
      afterEnter(el) {
        let ball = this.dropBalls.shift();
        if (ball) {
          ball.show = false;
          el.style.display = 'none';
        }
      }
    }
  };
</script>

<style scoped lang="stylus">
  @import "../../common/styl/mixin.styl";
  .shop-cart
    position: fixed
    left: 0
    bottom: 0
    height: 48px
    width: 100%
    z-index: 50
    .content
      position: relative
      display: flex
      width: 100%
      height: 100%
      color: rgba(255, 255, 255, 0.4)
      background-color: #141d27
      z-index: 60
      .content-left
        flex: 1
        background-color: #141d27
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
          .logo
            width: 44px
            height: 44px
            border-radius: 50%
            background: rgba(255, 255, 255, 0.2)
            &.highLight
              background-color: rgb(0, 160, 220)
            .icon-shopping_cart
              line-height: 44px
              font-size: 24px
              color: rgba(255, 255, 255, 0.4)
              &.highLight
                color: #fff
          .num
            position: absolute
            right: 0
            top: 0
            width: 24px
            height: 16px
            line-height: 16px
            border-radius: 16px
            font-size: 10px
            font-weight: 700
            color: #fff
            background: rgb(240, 20, 20)
            text-align: center
            -webkit-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)
            -moz-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)
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
    .ball-container
      .ball
        position: fixed
        left: 32px
        bottom: 22px
        z-index: 200
        &.drop-enter-active
          transition: all 0.5s cubic-bezier(0.49, -0.29, 0.75, 0.41)
          .inner
            width: 16px
            height: 16px
            border-radius: 50%
            background: rgb(0, 160, 220)
            transition: all 0.5s linear
    .cart-list
      position: fixed
      left: 0
      bottom: 48px
      width: 100%
      z-index: 30
      &.fold-enter-active, &.fold-leave-active
        transition: all 0.2s linear
        transform: translate3d(0, 0, 0)
      &.fold-enter, &.fold-leave-to
        transform: translate3d(0, 100%, 0)
      .list-header
        height: 40px
        line-height: 40px
        padding: 0 18px
        background-color: #f3f5f7
        border-bottom: 1px solid rgba(7, 17, 27, 0.1)
        .title
          float: left
          font-size: 14px
          color: rgb(7, 17, 27)
        .empty
          float: right
          font-size: 12px
          color: rgb(0, 160, 220)
      .list-content
        width: 100%
        max-height: 215px
        overflow: hidden
        background: #fff
        .list-item
          position: relative
          padding: 12px 0
          margin: 0 18px
          border-1px(rgba(7, 17, 27, 0.1))
          .name
            line-height: 24px
            font-size: 14px
            color: rgb(7, 17, 27)
          .price
            position: absolute
            bottom: 12px
            right: 96px
            line-height: 24px
            font-size: 14px
            font-weight: 700
            color: rgb(240, 20, 20)
            .uom
              font-size: 10px
              font-weight: normal
          .cart-control-wrapper
            position: absolute
            right: 0
            bottom: 12px
    .list-mask
      position: fixed
      z-index: -2
      left: 0
      top: 0
      width: 100%
      height: 100%
      background-color: rgba(7, 17, 27, 0.6)
      backdrop-filter: blur(10px)
      &.fade-enter-active, &.fade-leave-active
        transition: all 0.3s linear
        opacity: 1
      &.fade-enter, &.fade-leave-to
        opacity: 0
</style>

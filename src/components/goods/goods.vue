<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li class="menu-item" v-for="(item, index) in goods" :key="index" :class="{active: currentIndex === index}" @click="selectMenu(index, $event)">
          <span class="text border-1px">
            <span v-if="item.type > 0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="food-wrapper" ref="foodWrapper">
      <ul>
        <li class="food-list food-list-hook" v-for="(good, index) in goods" :key="index">
          <h2 class="title">{{good.name}}</h2>
          <ul>
            <li class="food-item" v-for="(food, idx) in good.foods" :key="idx">
              <div class="icon">
                <img :src="food.icon" width="57" height="57">
              </div>
              <div class="content">
                <div class="name">{{food.name}}</div>
                <div class="desc" v-if="food.description">{{food.description}}</div>
                <div class="detail">
                  <span class="sell-count">月售{{food.sellCount}}份</span>
                  <span class="rating">好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="new"><span class="uom">￥</span>{{food.price}}</span>
                  <span class="old" v-show="food.oldPrice"><span class="uom">￥</span>{{food.oldPrice}}</span>
                </div>
                <div class="cart-control-wrapper">
                  <cartControl></cartControl>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopCart></shopCart>
  </div>
</template>

<script>
  import BScroll from 'better-scroll';
  import cartControl from '../cartControl/cartControl';
  import shopCart from '../shopCart/shopCart';
  export default {
    data() {
      return {
        goods: [],
        classMap: ['decrease', 'discount', 'guarantee', 'invoice', 'special'],
        heightList: [],
        scrollY: 0
      };
    },
    components: {
      cartControl,
      shopCart
    },
    created() {
      this.getGoodsData();
    },
    computed: {
      currentIndex() {
        for (let i = 0; i < this.heightList.length; i++) {
          let height1 = this.heightList[i];
          let height2 = this.heightList[i + 1];
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i;
          }
        }
        return 0;
      }
    },
    methods: {
      getGoodsData() {
        this.$axios.get('/api/goods').then((res) => {
          this.goods = res.data.data;
          this.$nextTick(() => {
            this._initScroll();
            this._initHeight();
          });
        });
      },
      _initScroll() {
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {
          click: true
        });
        this.foodScroll = new BScroll(this.$refs.foodWrapper, {
          click: true,
          probeType: 3
        });
        this.foodScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.floor(pos.y));
        });
      },
      _initHeight() {
        let foodList = this.$refs.foodWrapper.querySelectorAll('.food-list-hook');
        let height = 0;
        this.heightList.push(height);
        for (let i = 0; i < foodList.length; i++) {
          height += foodList[i].clientHeight;
          this.heightList.push(height);
        }
      },
      selectMenu(idx, event) {
        if (!event._constructed) {
          return;
        }
        let foodList = this.$refs.foodWrapper.querySelectorAll('.food-list-hook');
        this.foodScroll.scrollToElement(foodList[idx], 500);
      }
    }
  };
</script>

<style scoped lang="stylus">
  @import "../../common/styl/mixin.styl";
  .goods
    display: flex
    position: absolute
    width: 100%
    top: 181px
    left: 0
    bottom: 48px
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background-color: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        font-size: 12px
        &.active
          background-color: #fff
          color: rgb(7, 17, 27)
          .text
            border-none()
        .text
          display: table-cell
          vertical-align: middle
          border-1px(rgba(7, 17, 27, 0.1))
          .icon
            display: inline-block
            vertical-align: top
            margin-right: 2px
            width: 12px
            height: 12px
            -webkit-background-size: 12px 12px
            background-size: 12px 12px
            background-repeat: no-repeat
            &.decrease
              bg-img('decrease_3')
            &.discount
              bg-img('discount_3')
            &.guarantee
              bg-img('guarantee_3')
            &.invoice
              bg-img('invoice_3')
            &.special
              bg-img('special_3')
    .food-wrapper
      flex: 1
      .food-list
        .title
          width: 100%
          height: 26px
          line-height: 26px
          padding: 0 14px
          font-size: 12px
          color: rgb(147, 153, 159)
          border-left: 2px solid #d9dde1
          background: #f3f5f7
        .food-item
          position: relative
          display: flex
          margin: 18px
          padding-bottom: 10px
          border-1px(rgba(7, 17, 27, 0.1))
          &:last-child
            border-none()
            margin-bottom: 0
          .icon
            flex: 0 0 57px
            width: 57px
            margin-right: 10px
            border-radius: 2px
          .content
            flex: 1
            .name
              line-height: 14px
              margin: 2px 0 8px 0
              font-size: 14px
              color: rgb(7, 17, 27)
            .desc
              line-height: 14px
              font-size: 10px
              color: rgb(147, 153, 159)
            .detail
              margin-top: 8px
              line-height: 10px
              font-size: 0
              color: rgb(147, 153, 159)
              .sell-count, .rating
                font-size: 10px
              .sell-count
                margin-right: 12px
            .price
              line-height: 24px
              font-size: 0
              .new
                color: rgb(240, 20, 20)
                font-size: 14px
                font-weight: 700
                .uom
                  font-size: 10px
                  font-weight: normal
              .old
                margin-left: 8px
                color: rgb(147, 153, 159)
                font-size: 10px
                font-weight: 700
                text-decoration: line-through
                .uom
                  font-weight: normal
            .cart-control-wrapper
              position: absolute
              right: 0
              bottom: 16px
</style>

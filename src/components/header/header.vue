<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar" width="64" height="64">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div class="supports" v-if="seller.supports">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div class="support-count" v-if="seller.supports" @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <span class="icon-keyboard_arrow_right"></span>
      </div>
    </div>
    <div class="bulletin-wrapper">
      <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
      <span class="icon-keyboard_arrow_right"></span>
    </div>
    <div class="background">
      <img :src="seller.avatar" >
    </div>
    <transition name="fade">
      <div class="detail-wrapper" v-show="detailShow">
        <div class="show-wrapper clearfix">
          <div class="detail-content">
            <h1 class="title">{{seller.name}}</h1>
            <div class="star-wrapper">
              <star :size="48" :score="seller.score"></star>
            </div>
          </div>
        </div>
        <div class="close-wrapper" @click="detailShow=false">
          <span class="icon-close"></span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import star from '../star/star';
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        detailShow: false,
        classMap: ['decrease', 'discount', 'guarantee', 'invoice', 'special']
      };
    },
    components: {
      star
    },
    methods: {
      showDetail() {
        this.detailShow = true;
      }
    }
  };
</script>

<style scoped lang="stylus">
  @import "../../common/styl/mixin.styl";
  .header
    position: relative
    color: #fff
    background-color: rgba(7, 17, 27, 0.5)
    .content-wrapper
      position: relative
      padding: 24px
      font-size: 0
      .avatar
        display: inline-block
        vertical-align: top
        margin-right: 16px
        img
          border-radius: 2px
      .content
        display: inline-block
        padding: 2px 0
        font-size: 0
        .title
          margin-bottom: 8px
          .brand
            display: inline-block
            vertical-align: top
            width: 30px
            height: 18px
            margin-right: 6px
            bg-img('brand')
            background-size: 30px 18px
            background-repeat: no-repeat
          .name
            line-height: 18px
            font-size: 16px
            font-weight: 700
        .description
          margin-bottom: 10px
          line-height: 12px
          font-size: 12px
        .supports
          .icon
            display: inline-block
            vertical-align: top
            width: 12px
            height: 12px
            background-size: 12px 12px
            background-repeat: no-repeat
            &.decrease
              bg-img('decrease_1')
            &.discount
              bg-img('discount_1')
            &.guarantee
              bg-img('guarantee_1')
            &.invoice
              bg-img('invoice_1')
            &.special
              bg-img('special_1')
          .text
            margin-left: 4px
            line-height: 12px
            font-size: 10px

      .support-count
        position: absolute
        right: 12px
        bottom: 24px
        line-height: 12px
        padding: 7px 8px
        background: rgba(0, 0, 0, 0.2)
        border-radius: 40px
        font-size: 0
        .count
          display: inline-block
          vertical-align: top
          margin-right: 2px
          font-size: 10px
        .icon-keyboard_arrow_right
          display: inline-block
          vertical-align: top
          font-size: 10px
    .bulletin-wrapper
      position: relative
      height: 28px
      padding: 0 22px 0 12px
      line-height: 28px
      background: rgba(7, 17, 27, 0.2)
      white-space: nowrap
      overflow: hidden
      text-overflow: ellipsis
      .bulletin-title
        display: inline-block
        vertical-align: top
        margin-top: 7px
        width: 22px
        height: 12px
        bg-img('bulletin')
        background-size: 22px 12px
        background-repeat: no-repeat
      .bulletin-text
        vertical-align: top
        margin: 0 4px
        font-size: 10px
      .icon-keyboard_arrow_right
        position: absolute
        vertical-align: top
        right: 12px
        top: 8px
    .background
      position: absolute
      left: 0
      top: 0
      width: 100%
      height: 100%
      z-index: -1
      backdrop-filter: blur(10px)
      img
        width: 100%
        height: 100%
    .detail-wrapper
      position: fixed
      z-index: 100
      width: 100%
      height: 100%
      left: 0
      top: 0
      overflow: auto
      background-color: rgba(7, 17, 27, 0.8)
      backdrop-filter: blur(10px)
      &.fade-enter-active, &.fade-leave-active
        transition: all 0.4s
        opacity: 1
      &.fade-enter, &.fade-leave-to
        opacity: 0
      .show-wrapper
        min-height: 100%
        width: 100%
        .detail-content
          margin-top: 64px
          padding-bottom: 64px
          .title
            line-height: 16px
            font-size: 16px
            font-weight: 700
            color: #fff
            text-align: center
      .close-wrapper
        position: relative
        margin: -64px auto 0 auto
        width: 32px
        height: 32px
        font-size: 32px
        clear: both
        color: rgba(255, 255, 255, 0.5)
</style>

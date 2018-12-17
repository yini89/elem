<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/rating">评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <router-view :seller="seller" />
  </div>
</template>

<script>
  import header from './components/header/header';
  export default {
    data() {
      return {
        seller: {}
      };
    },
    components: {
      'v-header': header
    },
    mounted() {
      this.getSellerData();
    },
    methods: {
      getSellerData() {
        this.$axios.get('/api/seller').then((res) => {
          this.seller = res.data.data;
          // console.log('app this.seller === ' + JSON.stringify(this.seller));
        });
      }
    }
  };
</script>

<style lang="stylus">
  @import "./common/styl/mixin.styl";
  #app
    .tab
      display: flex
      height: 40px
      width: 100%
      border-1px(rgba(7, 17, 27, 0.1))
      .tab-item
        flex: 1
        line-height: 40px
        font-size: 14px
        color: rgb(77, 85, 93)
        text-align: center
        & > a
          display: block
          &.active
            color: rgb(240, 20, 20)
</style>

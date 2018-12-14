<template>
  <div class="goods">
    <div class="menu-wrapper"></div>
    <div class="content-wrapper"></div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        goods: []
      };
    },
    mounted() {
      console.log('this.goods');
      this.getGoodsData();
    },
    methods: {
      getGoodsData() {
        this.$axios.get('/api/goods').then((res) => {
          this.goods = res.data.data;
        });
      }
    }
  };
</script>

<style scoped>

</style>

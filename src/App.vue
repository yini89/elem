<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <router-view/>
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
    created() {
      this.$axios.get('/api/seller').then((res) => {
        this.seller = res.data.data;
      });
    }
  };
</script>

<style>
</style>

import Vue from 'vue';
import Router from 'vue-router';
import goods from '../components/goods/goods';
import seller from '../components/seller/seller';
import rating from '../components/rating/rating';
Vue.use(Router);

export default new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: '/goods',
      component: goods
    },
    {
      path: '/seller',
      component: seller
    },
    {
      path: '/rating',
      component: rating
    }
  ]
});

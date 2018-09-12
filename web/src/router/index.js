import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home/Home';
import Deputy from '@/components/Deputy/Index';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/deputy/:id',
      name: 'Deputy',
      component: Deputy,
    },
  ],
});

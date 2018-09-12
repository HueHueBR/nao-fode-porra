import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home/Home';
import Deputy from '@/components/Deputy/Index';

Vue.use(Router);

const routerConfig = {
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/deputado/:deputyId',
      name: 'Deputy',
      component: Deputy,
    },
  ],
};

export default new Router(routerConfig);

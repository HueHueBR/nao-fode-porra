import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home/Home';
import Deputy from '@/components/Deputy/Index';

Vue.use(Router);

const routerConfig = {
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

if (process.env.NODE_ENV === 'development') {
  routerConfig.mode = 'history';
}

export default new Router(routerConfig);

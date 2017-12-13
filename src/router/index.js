import Vue from 'vue';
import Router from 'vue-router';
import Vuetify from 'vuetify';

import Home from '@/components/Home';
import Login from '@/components/Login';
import Register from '@/components/Register';
import Games from '@/components/Games';
import Game from '@/components/Game';
import Events from '@/components/Events';
import Groups from '@/components/Groups';

Vue.use(Router);
Vue.use(Vuetify);

export default new Router({
  routes: [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/login',
      component: Login,
    },
    {
      path: '/register',
      component: Register,
    },
    {
      path: '/games',
      component: Games,
    },
    {
      path: '/game/:id',
      component: Game,
      props: true,
    },
    {
      path: '/groups',
      component: Groups,
    },
    {
      path: '/events',
      component: Events,
    },
  ],

  mode: 'history',
});

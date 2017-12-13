import Vue from 'vue';
import Router from 'vue-router';

import Home from '@/components/Home';
import Login from '@/components/Login';
import Register from '@/components/Register';
import Games from '@/components/Games';
import Game from '@/components/Game';
import Events from '@/components/Events';
import Groups from '@/components/Groups';
import GamesCheck from '@/components/GamesCheck';
import Logout from '@/components/Logout';

Vue.use(Router);

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
      name: 'games',
      path: '/games/:activeUser/:activePage',
      component: Games,
      props: true,
    },
    {
      path: '/games/:activeUser',
      redirect: '/games/:activeUser/1',
    },
    {
      path: '/games',
      component: GamesCheck,
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
    {
      path: '/logout',
      component: Logout,
    },
  ],

  mode: 'history',
});

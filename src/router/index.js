import Vue from 'vue';
import Router from 'vue-router';

import Home from '@/components/Home';
import Login from '@/components/Login';
import Register from '@/components/Register';
import Games from '@/components/Games';
import GameDetails from '@/components/GameDetails';
import Events from '@/components/Events';
import Groups from '@/components/Groups';
import GamesCheck from '@/components/GamesCheck';
import GamesSearch from '@/components/GamesSearch';
import Logout from '@/components/Logout';
import Group from '@/components/Group';

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
      alias: '/collection/:activeUser/:activePage',
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
      path: '/search',
      props: true,
      component: GamesSearch,
    },
    {
      path: '/game/:id',
      component: GameDetails,
      props: true,
    },
    {
      path: '/groups',
      component: Groups,
    },
    {
      path: '/group/:id',
      component: Group,
      props: true,
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

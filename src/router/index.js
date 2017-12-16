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
      protected: true,
    },
    {
      path: '/login',
      component: Login,
      protected: false,
    },
    {
      path: '/register',
      component: Register,
      protected: false,
    },
    {
      name: 'games',
      path: '/games/:activeUser/:activePage',
      alias: '/collection/:activeUser/:activePage',
      component: Games,
      props: true,
      protected: false,
    },
    {
      path: '/games/:activeUser',
      redirect: '/games/:activeUser/1',
      protected: false,
    },
    {
      path: '/games',
      component: GamesCheck,
      protected: true,
    },
    {
      path: '/search',
      props: true,
      component: GamesSearch,
      protected: true,
    },
    {
      path: '/game/:id',
      component: GameDetails,
      props: true,
      protected: false,
    },
    {
      path: '/groups',
      component: Groups,
      protected: false,
    },
    {
      path: '/group/:id',
      component: Group,
      props: true,
      protected: true,
    },
    {
      path: '/events',
      component: Events,
      protected: true,
    },
    {
      path: '/logout',
      component: Logout,
      protected: false,
    },
  ],

  mode: 'history',
});

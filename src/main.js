// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'font-awesome/css/font-awesome.min.css';
import 'vuetify/dist/vuetify.css';
import * as _ from 'lodash';
import axios from 'axios';

// My components
import GameCard from '@/components/GameCard';

import Vue from 'vue';
import Vuetify from 'vuetify';
import App from './App';
import router from './router';
import { store } from './store/store';


Vue.config.productionTip = true;
Vue.use(Vuetify);
Vue.component('v-game-card', GameCard);

/* eslint-disable no-new */
const v = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
});

// This routes should be protected
const protectedRoutes = [
  '/games',
  '/collection',
  '/groups',
  '/events',
  '/search',
  '/profile',
];

router.beforeEach((to, from, next) => {
  const user = v.$store.state.user;
  if (_.indexOf(protectedRoutes, to.path) !== -1) {
    axios.get(`${process.env.API_BASE}/v1/users/get/${user.bggNick}/information`, {
      headers: {
        authorization: `Bearer ${user.token}`,
      },
    }).then(() => {
      next();
    }).catch(() => {
      v.$store.commit('clearUser');
      next('/login');
    });
  } else {
    next();
  }
});

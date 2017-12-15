import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

// eslint-disable-next-line
export const store = new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    user: {
      token: '',
      email: '',
      bggNick: '',
      forumNick: '',
      bggHandled: true,
    },
  },
  getters: {
    user: state => state.user,
  },
  mutations: {
    clearUser(state) {
      state.user.bggNick = '';
      state.user.token = '';
      state.user.forumNick = '';
      state.user.email = '';
      state.user.bggHandled = true;
    },
    logUser(state, user) {
      state.user = user;
    },
  },
});

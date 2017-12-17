<template>
    <v-app>
      <v-toolbar dense dark class="deep-orange darken-1">
        <v-toolbar-title>
          <v-toolbar-side-icon  @click.native="sideNav = !sideNav"
                                class="hidden-sm-and-up">
          </v-toolbar-side-icon>
          <router-link to="/" tag="span" style="cursor: pointer">
            Jeux sur ma table
          </router-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-xs-only" v-for="item in menuItems" :key="item.title" v-if="item.shouldShow()">
          <v-btn flat router :to="item.link">
            <v-icon left>{{ item.icon }}</v-icon>
            {{ item.title }}
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <v-navigation-drawer dark temporary absolute v-model="sideNav">
        <v-list>
          <v-list-tile v-for="item in menuItems" :key="item.title" router :to="item.link">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              {{ item.title }}
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>

      <router-view></router-view>

    </v-app>
</template>

<script>
import { mapGetters } from 'vuex';
import _ from 'lodash';

export default {
  name: 'app',
  computed: {
    ...mapGetters([
      'user',
    ]),

    menuItems() {
      const items = [];
      if (_.isEmpty(this.user.token)) {
        items.push({ icon: 'face', title: 'Login', link: '/login', shouldShow: () => true });
        items.push({ icon: 'account_circle', title: 'Register', link: '/register', shouldShow: () => true });
      } else {
        items.push({ icon: 'face', title: this.user.bggNick, link: '/profile', shouldShow: () => true });
        items.push({ icon: 'group_work', title: 'Groups', link: '/groups', shouldShow: () => true });
        items.push({ icon: 'search', title: 'Search', link: '/search', shouldShow: () => true });
        items.push({ icon: 'pages', title: 'Your Games', link: '/games', shouldShow: () => true });
        //eslint-disable-next-line
        // items.push({ icon: 'add', title: 'Manage games', link: '/manager', shouldShow: () => !this.user.bggHandled });
        items.push({ icon: 'event', title: 'Events', link: '/events', shouldShow: () => true });
        items.push({ icon: 'lock_open', title: 'Log Off', link: '/logout', shouldShow: () => true });
      }
      return items;
    },
  },
  data() {
    return {
      sideNav: false,
    };
  },
};
</script>

<style>

</style>

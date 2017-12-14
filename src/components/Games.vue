<template>
  <v-container>

      <!-- <v-layout row>
        <v-flex xs12 sm6 offset-sm3 class="mb-3">
          <h1 class="display-2">Your collection</h1>
        </v-flex>
      </v-layout> -->

      <v-layout wrap>
          <v-flex xs12 sm3 v-for="game in games" :key="game.id" class="mb-3 pr-3">
            <v-game-card :game="game"></v-game-card>
          </v-flex>
      </v-layout>

      <v-layout row>
        <v-flex xs12 sm6 offset-sm3>
          <v-pagination :length="pages" v-model="currentPage" v-if="!searchQuery"></v-pagination>
        </v-flex>
      </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios';
import _ from 'lodash';

export default {
  props: ['activeUser', 'activePage'],
  data() {
    return {
      games: [],
      searchQuery: '',
      pages: 0,
    };
  },
  computed: {
    currentPage: {
      get() {
        const n = Number(this.activePage);
        return n > this.pages ? 1 : n;
      },
      set(newValue) {
        this.$router.push({ name: 'games', params: { activeUser: this.activeUser, activePage: newValue } });
      },
    },
  },
  watch: {
    searchQuery: _.debounce(function debounced() {
      if (_.isEmpty(this.searchQuery)) {
        this.totalPages();
        this.retrieveAllGames();
      } else {
        axios.get(`https://staging.massi.rocks/v1/games/search?q=${this.searchQuery}`).then((r) => {
          this.games = r.data.sort((a, b) => {
            if (a.name < b.name) {
              return -1;
            } else if (b.name > a.name) {
              return 1;
            }

            return 0;
          });
        });
      }
    }, 1000),
    currentPage() {
      this.retrieveAllGames();
    },
  },
  created() {
    this.totalPages();
    this.retrieveAllGames();
  },
  methods: {
    retrieveAllGames() {
      axios.get(`https://staging.massi.rocks/v1/collection/get/${this.activeUser}/page/${this.currentPage - 1}`).then((r) => {
        this.games = r.data.sort((a, b) => {
          if (a.name < b.name) {
            return -1;
          } else if (a.name > b.name) {
            return 1;
          }

          return 0;
        });
      });
    },
    totalPages() {
      axios.get(`https://staging.massi.rocks/v1/collection/get/${this.activeUser}/page/total`).then((r) => {
        this.pages = r.data.totalPages;
      });
    },

  },
};
</script>

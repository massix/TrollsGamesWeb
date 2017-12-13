<template>
  <v-container>
      <v-layout row>
        <v-flex xs12 sm6 offset-sm3>
          <v-text-field name="search" prepend-icon="search" label="search" v-model="searchQuery">

          </v-text-field>
        </v-flex>
      </v-layout>

      <v-layout wrap>
          <v-flex xs12 sm3 v-if="games" v-for="game in games" :key="game.id" class="mb-3 pr-3">
              <v-card class="elevation-6">
                  <v-card-media :src="game.thumbnail? game.thumbnail.replace('_t', '') : 'https://geekken.files.wordpress.com/2012/08/massiveboardgamecollection.jpeg'" height="150px"></v-card-media>
                  <v-card-title primary-title><h3>{{ game.name }}</h3></v-card-title>
                  <v-card-text>{{ game.authors }} - {{ game.yearPublished }}</v-card-text>
                  <v-card-actions>
                    <v-btn flat color="orange" router :to="'/game/' + game.id">Details</v-btn>
                    <v-btn flat color="orange">View on BGG</v-btn>
                  </v-card-actions>
              </v-card>
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

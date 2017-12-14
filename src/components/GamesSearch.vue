<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-text-field :rules="searchRules" name="search" prepend-icon="search" label="search" v-model="searchQuery"></v-text-field>
      </v-flex>
    </v-layout>

    <v-layout wrap>
      <v-flex xs12 sm3 v-for="game in games" :key="game.id" class="mb-3 pr-3">
        <v-game-card :game="game"></v-game-card>
      </v-flex>
      <v-flex v-if="noResults" xs12 sm6 offset-sm3>
        <h3 class="display-6">Nothing found :(</h3>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import _ from 'lodash';
import axios from 'axios';

export default {
  data() {
    return {
      searchDone: false,
      searchQuery: '',
      games: [],
      searchRules: [
        v => (v && v.length >= 3) || 'At least 3 characters',
      ],
    };
  },

  computed: {
    noResults() {
      return this.searchQuery && this.games.length === 0 && this.searchDone;
    },
  },

  created() {
    this.searchQuery = this.$route.query.q;
  },

  watch: {
    searchQuery: _.debounce(function db() {
      this.searchDone = false;
      if (!_.isEmpty(this.searchQuery) && this.searchQuery.length >= 3) {
        this.$router.push(`/search?q=${this.searchQuery}`);
        this.searchGame();
      } else {
        this.$router.push('/search');
        this.games = [];
      }
    }, 300),
  },

  methods: {
    searchGame() {
      axios.get(`${process.env.API_BASE}/v1/games/search?q=${this.searchQuery}`).then((r) => {
        this.games = r.data;
        this.searchDone = true;
      });
    },
  },
};
</script>


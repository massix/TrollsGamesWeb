<template>
  <v-container>

      <v-layout wrap>
          <v-flex xs12 sm3 v-for="game in games" :key="game.id" class="mb-3 pr-3">
            <v-game-card :game="game"></v-game-card>
          </v-flex>
      </v-layout>

      <v-layout row>
        <v-flex xs12 sm6 offset-sm3>
          <v-pagination :length="pages" v-model="currentPage"></v-pagination>
        </v-flex>
      </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  props: ['activeUser', 'activePage'],
  data() {
    return {
      games: [],
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
        const ep = this.$route.path.split('/')[1];
        this.$router.push(`/${ep}/${this.activeUser}/${newValue}`);
      },
    },
  },
  watch: {
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
      axios.get(`${process.env.API_BASE}/v1/collection/get/${this.activeUser}/page/${this.currentPage - 1}`).then((r) => {
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
      axios.get(`${process.env.API_BASE}/v1/collection/get/${this.activeUser}/page/total`).then((r) => {
        this.pages = r.data.totalPages;
      });
    },

  },
};
</script>

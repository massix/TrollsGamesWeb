<template>
  <v-container fluid>
      <v-layout row>
          <v-flex xs12 sm8 offset-sm2>
              <v-card v-for="game in games" :key="game.id" class="mb-3">
                  <v-card-media :src="game.thumbnail.replace('_t', '')" height="150px"></v-card-media>
                  <v-card-title primary-title>{{ game.name }}</v-card-title>
                  <v-card-text>{{ game.authors }} - {{ game.yearPublished }}</v-card-text>
                  <v-card-actions>
                      <v-btn flat color="orange" router :to="'/game/' + game.id">Details</v-btn>
                      <v-btn flat color="orange">View on BGG</v-btn>
                  </v-card-actions>
              </v-card>
          </v-flex>
      </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      games: [],
    };
  },
  created() {
    axios.get('https://prod.massi.rocks/v1/collection/get/massi_x').then((r) => {
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
};
</script>

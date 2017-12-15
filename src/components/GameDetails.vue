<template>
  <v-container v-if="game">
    <v-layout wrap>

      <v-flex xs12 sm4>
        <img :src="game.thumbnail.replace('_t', '')" style="max-width: 100%; max-height: 100%"><br />
        <span><span class="fa fa-pencil"></span> {{ game.authors }}</span><br />
        <span><span class="fa fa-clock-o"></span> {{ game.playingTime }} minutes</span><br />
        <span><span class="fa fa-calendar"></span> {{ game.yearPublished }}</span><br />
        <span><span class="fa fa-user"></span> {{ game.minPlayers }} - {{ game.maxPlayers }} players</span>
      </v-flex>

      <v-flex xs12 sm7 offset-sm1>
        <h3 style="text-align: center">{{ game.name }}</h3>
        <span v-html="game.description"></span>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  props: ['id'],
  data() {
    return {
      game: undefined,
    };
  },

  created() {
    axios.get(`${process.env.API_BASE}/v1/games/get/${this.id}`).then((r) => {
      this.game = r.data;
    });
  },
};
</script>

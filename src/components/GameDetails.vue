<template>
  <v-container v-if="game">
    <v-layout wrap>

      <v-flex xs12 sm4>
        <img :src="game.thumbnail.replace('_t', '')" style="max-width: 100%; max-height: 100%"><br />
        <span><span class="fa fa-pencil"></span> {{ game.authors }}</span><br />
        <span><span class="fa fa-clock-o"></span> {{ game.playingTime }} minutes</span><br />
        <span><span class="fa fa-calendar"></span> {{ game.yearPublished }}</span><br />
        <span><span class="fa fa-user users-text"></span> {{ playersText }} players</span><br />
        <v-expansion-panel class="mt-3" popout>
          <v-expansion-panel-content>
            <div slot="header"> {{ ownersText }} this game </div>
            <v-card class="pr-2 pl-2 pb-2">
              <span v-for="owner in owners" :key="owner">
                <span class="fa fa-user-circle"></span> <a class="collection-link" :href="`/collection/${owner}/1`">{{ owner }}</a> <br /></span>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
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
      owners: [],
    };
  },

  computed: {
    playersText() {
      if (this.game.maxPlayers > this.game.minPlayers) {
        return `${this.game.minPlayers} - ${this.game.maxPlayers}`;
      }

      return `${this.game.minPlayers}`;
    },
    ownersText() {
      if (this.owners.length > 1) {
        return `${this.owners.length} members have`;
      } else if (this.owners.length === 1) {
        return `${this.owners.length} member has`;
      }
      return 'No one has';
    },
  },

  created() {
    axios.get(`${process.env.API_BASE}/v1/games/get/${this.id}`).then((r) => {
      this.game = r.data;
    });

    axios.get(`${process.env.API_BASE}/v1/games/owners/${this.id}`).then((r) => {
      this.owners = r.data;
    });
  },
};
</script>

<style lang="stylus" scoped>
a.collection-link
  color black
  text-decoration none
  &:hover
    color blue

</style>

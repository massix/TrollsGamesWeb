<template>
  <v-card class="elevation-6">
    <v-card-media :src="game.thumbnail? game.thumbnail.replace('_t', '') : 'https://geekken.files.wordpress.com/2012/08/massiveboardgamecollection.jpeg'" height="150px"></v-card-media>
    <v-card-title primary-title three-line><h3>{{ game.name }}</h3></v-card-title>
    <v-card-text class="caption">
      <v-layout v-for="display in displayInfo" :key="display.text()" row>
        <v-flex xs1>
          <i :class="`fa ${display.icon}`"></i>
        </v-flex>
        <v-flex xs11>
          <span class="information">{{ display.text() }}</span>
        </v-flex>
      </v-layout>
    </v-card-text>
    <v-card-actions>
      <v-btn flat color="orange" router :to="`/game/${game.id}`" icon><v-icon>search</v-icon></v-btn>
      <v-btn flat color="orange" icon :router="false" :href="`https://www.boardgamegeek.com/boardgame/${game.id}`" target="_blank"><v-icon>extension</v-icon></v-btn>
      <v-btn flat color="orange" v-if="removable" @click="$emit('removeGame', game)" icon><v-icon>delete</v-icon></v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from 'axios';

export default {
  name: 'v-game-card',
  props: ['game', 'removable'],
  created() {
    axios.get(`${process.env.API_BASE}/v1/games/owners/${this.game.id}`).then((r) => {
      this.owners = r.data;
    });
  },
  data() {
    return {
      owners: [],
      displayInfo: [
        { icon: 'fa-pencil', text: () => this.game.authors },
        { icon: 'fa-clock-o', text: () => `${this.game.playingTime} minutes` },
        {
          icon: 'fa-user',
          text: () => {
            if (this.game.minPlayers === 1 && this.game.maxPlayers === 1) {
              return 'solo game';
            }

            const followUp = this.game.maxPlayers > this.game.minPlayers ? `to ${this.game.maxPlayers}` : '';
            return `${this.game.minPlayers} ${followUp} players`;
          },
        },
        {
          icon: 'fa-user-circle',
          text: () => {
            if (this.owners.length > 1) {
              return `${this.owners.length} members`;
            } else if (this.owners.length === 1) {
              return '1 member';
            }
            return 'No one has this game!';
          },
        },
      ],
    };
  },
};
</script>

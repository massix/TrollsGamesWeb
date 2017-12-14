<template>
  <v-card class="elevation-6">
    <v-card-media :src="game.thumbnail? game.thumbnail.replace('_t', '') : 'https://geekken.files.wordpress.com/2012/08/massiveboardgamecollection.jpeg'" height="150px"></v-card-media>
    <v-card-title primary-title><h3>{{ game.name }}</h3></v-card-title>
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
      <v-btn flat color="orange" router :to="'/game/' + game.id">Details</v-btn>
      <v-btn flat color="orange">View on BGG</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'v-game-card',
  props: ['game'],
  data() {
    return {
      displayInfo: [
        { icon: 'fa-pencil', text: () => `Created by ${this.game.authors}` },
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
      ],
    };
  },
};
</script>

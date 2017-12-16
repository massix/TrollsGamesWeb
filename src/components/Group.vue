<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <span class="display-1">{{ group.name }}</span><br />
        <span class="subheading">{{ group.description }}</span>
      </v-flex>
    </v-layout>
    <v-layout wrap>
      <v-flex xs12 sm4 class="pr-3 mb-2" v-for="member in members" :key="member.email">
        <v-card class="elevation-1">
          <v-card-title primary-title>
            <v-icon left>account_circle</v-icon> &nbsp; <strong>{{ member.forumNick | toUpperCase }}</strong>
          </v-card-title>
          <v-card-text class="caption">
            <v-icon left>email</v-icon> &nbsp; {{ member.email }} <br />
            <v-icon left>forum</v-icon> &nbsp; {{ member.bggNick }}
          </v-card-text>
          <v-card-actions>
            <v-btn flat color="orange darken-1" router :to="`/collection/${member.bggNick}/1`">View collection</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios';
import * as _ from 'lodash';

export default {
  props: ['id'],
  filters: {
    toUpperCase(value) {
      if (!_.isEmpty(value)) {
        return value.toUpperCase();
      }

      return value;
    },
  },
  data() {
    return {
      group: { id: 0, name: 'Trolls De Jeux', description: 'Association Trolls De Jeux sur Antibes' },
      members: [],
    };
  },

  created() {
    // Retrieve group's information
    // axios.get ...

    // Retrieve members of the group
    axios.get(`${process.env.API_BASE}/v1/users/get`).then((r) => {
      this.members = r.data;
    });
  },
};
</script>


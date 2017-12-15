<template>
  <v-container>
    <v-layout wrap v-if="canRemoveGame" class="mb-3 pr-3">
      <v-expansion-panel>
        <v-expansion-panel-content>
          <div slot="header">Add games to your collection</div>
          <v-flex xs12>
            <v-card>
              <v-card-title primary-title>
                <v-text-field v-model="searchQuery" append-icon="search" label="Search"></v-text-field>
                <v-spacer/>
              </v-card-title>
              <v-data-table select-all
                            item-key="id"
                            :items="searchResult"
                            :headers="tableHeaders"
                            :rows-per-page-items="[10, 20, { text: 'All', value: -1 }]"
                            :pagination.sync="pagination"
                            v-model="selectedGames">
                <template slot="headerCell" slot-scope="props">
                  <v-tooltip bottom>
                    <span slot="activator">
                      {{ props.header.text }}
                    </span>
                    <span>
                      {{ props.header.text }}
                    </span>
                  </v-tooltip>
                </template>
                <template slot="items" slot-scope="props">
                  <td>
                    <v-checkbox primary hide-details v-model="props.selected" />
                  </td>
                  <td class="text-xs-left">
                    <a target="_blank" :href="`https://www.boardgamegeek.com/boardgame/${props.item.id}`">{{ props.item.id }}</a>
                  </td>
                  <td class="text-xs-left">{{ props.item.name }}</td>
                  <td class="text-xs-left">{{ props.item.yearPublished }}</td>
                </template>
                <template slot="no-data">
                  <v-alert :value="true" color="info" icon="info">
                    Search for a game!
                  </v-alert>
                </template>
                <template slot="no-results">
                  <v-alert :value="true" color="error" icon="warning">
                    No results
                  </v-alert>
                </template>
              </v-data-table>
              <v-card-actions>
                <v-btn @click="addSelectedGames">
                  <v-icon left>add</v-icon> Add selected games
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-layout>

    <v-layout wrap>
        <v-flex xs12 sm3 v-for="game in games" :key="game.id" class="mb-3 pr-3">
          <v-game-card :game="game" :removable="canRemoveGame"></v-game-card>
        </v-flex>
    </v-layout>

    <v-layout row v-if="shouldShowPaginator">
      <v-flex xs12 sm6 offset-sm3>
        <v-pagination :length="pages" v-model="currentPage"></v-pagination>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';
import * as _ from 'lodash';

export default {
  props: ['activeUser', 'activePage'],
  data() {
    return {
      games: [],
      pages: 0,
      searchQuery: '',
      searchResult: [],
      innerSearch: '',
      selectedGames: [],
      pagination: {
        sortBy: 'name',
      },
      tableHeaders: [
        { text: 'Id of game', value: 'id', align: 'left', sortable: true },
        { text: 'Name of game', value: 'name', align: 'left', sortable: true },
        { text: 'Publication year', value: 'yearPublished', align: 'left', sortable: true },
      ],
    };
  },
  computed: {
    ...mapGetters([
      'user',
    ]),
    canRemoveGame() {
      if (this.activeUser === this.user.bggNick) {
        return !this.user.bggHandled;
      }

      return false;
    },
    shouldShowPaginator() {
      return this.games.length > 0;
    },
    shouldShowTable() {
      return this.searchResult.length > 0;
    },
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
    searchQuery() {
      if (this.searchQuery.length >= 3) {
        this.searchOnBgg();
      } else {
        this.searchResult = [];
      }
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
    searchOnBgg: _.debounce(function anon() {
      axios.get(`${process.env.API_BASE}/v1/bggconverter/search?q=${this.searchQuery}`).then((r) => {
        this.searchResult = r.data;
      });
    }, 500),
    addSelectedGames() {
      console.log('adding selected games');
      console.log(this.selectedGames);
      this.selectedGames.forEach((game) => {
        axios.put(`${process.env.API_BASE}/v1/collection/add/${this.user.bggNick}/${game.id}`, undefined, {
          headers: {
            Authorization: `Bearer ${this.user.token}`,
          },
        }).then(() => {
          console.log('games added');
        }).catch((error) => {
          console.log(`${error} occured`);
        });
      });
    },
  },
};
</script>

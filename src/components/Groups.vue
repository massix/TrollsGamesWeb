<template>
  <v-container>

    <v-alert class="warning" icon="priority_high" dismissible v-model="warning">
      The following data is mocked. Nothing you see here is real. No real actions are performed.
    </v-alert>

    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-list three-line>

          <v-subheader>Your groups</v-subheader>
          <v-list-tile avatar v-for="group in memberships" :key="group.id">
            <v-list-tile-avatar>
              <v-icon>3d_rotation</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{ group.name }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ group.description }}</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn icon ripple router :to="`/group/${group.id}`">
                <v-icon>search</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>

          <v-divider></v-divider>

          <v-subheader>Public groups</v-subheader>
          <v-list-tile avatar v-for="group in publicGroups" :key="group.id">
            <v-list-tile-avatar>
              <v-icon>3d_rotation</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{ group.name }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ group.description }}</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn icon ripple router :to="`/group/${group.id}`">
                <v-icon>search</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
          </v-list-tile>

        </v-list>
      </v-flex>
    </v-layout>

  </v-container>
</template>


<script>
export default {
  data() {
    return {
      warning: true,
      publicGroups: [
        { id: 2, name: 'Les amies de la table', description: 'Groupe de jeu pour jeunes filles' },
        { id: 3, name: 'Club de couture', description: 'Pour ceux qui aiment jouer et... autre!' },
      ],
      memberships: [
        { id: 0, name: 'Trolls De Jeux', description: 'Association Trolls De Jeux sur Antibes' },
        { id: 1, name: 'JdS06250', description: 'Groupe de jeu à Orange DFY' },
        { id: 4, name: 'Twilight Imperialists', description: 'We only play a single game. For months.' },
      ],
    };
  },
};
</script>

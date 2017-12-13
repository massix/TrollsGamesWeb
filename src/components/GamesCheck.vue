<template>
</template>

<script>
  import { mapGetters } from 'vuex';
  import _ from 'lodash';

  export default {
    computed: {
      ...mapGetters([
        'user',
      ]),
    },
    created() {
      if (!_.isEmpty(this.user.bggNick)) {
        this.$router.replace(`/games/${this.user.bggNick}`);
      } else {
        this.$router.replace('/login');
      }
    },
  };
</script>

<template>
  <v-container fill-height>
    <v-layout row wrap align-center>
      <v-flex xs10 sm6 offset-sm3 offset-xs1 class="text-xs-center">
        <blockquote>
          <p class="subheading text">{{ quote.quote }}</p>
          <p class="caption author text-xs-right"> -- {{ quote.author }}</p>
        </blockquote>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Home',
  data() {
    return {
      title: 'Home',
      msg: 'Hello World',
      quote: { quote: '', author: '' },
    };
  },

  created() {
    axios.get(`${process.env.API_BASE}/v1/quotes/get/random`).then((resp) => {
      this.quote = resp.data;
    });
  },
};
</script>


<style scoped>
.text {
  color: lightslategray;
}

.author {
  color: gray;
}
</style>



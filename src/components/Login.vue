<template>
  <v-container>
    <v-layout>
      <v-flex xs12 sm6 offset-sm3>
        <v-form v-model="valid" @submit.prevent="submitLogin">
          <v-text-field label="Email" v-model="email" :rules="emailRules" required></v-text-field>
          <v-text-field label="Password"
                        :type="passwordVisible ? 'text' : 'password'"
                        v-model="password"
                        :rules="passwordRules"
                        :append-icon="passwordVisible ? 'visibility' : 'visibility_off'"
                        :append-icon-cb="() => passwordVisible = !passwordVisible"
                        required></v-text-field>
          <v-btn light class="lime lighten-4" type="submit" :disabled="!valid && !loading">
            Login
            <v-icon right dark>lock_outline</v-icon>
          </v-btn>
          <v-btn light class="lime lighten-4" @click="clearForm" :disabled="loading">
            Clear
            <v-icon right dark>clear</v-icon>
          </v-btn>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      valid: false,
      email: '',
      password: '',
      passwordVisible: false,
      loading: false,
      error: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,6})+$/.test(v) || 'E-mail must be valid',
      ],
      passwordRules: [
        v => !!v || 'Password can\'t be empty',
      ],
    };
  },
  methods: {
    submitLogin() {
      //eslint-disable-next-line
      this.loading = true;
      axios.post('https://staging.massi.rocks/v1/users/login', {
        email: this.email,
        password: this.password,
      }).then((r) => {
        if (r.status === 200) {
          this.$store.commit('logUser', {
            bggNick: r.data.bggNick,
            forumNick: r.data.forumNick,
            email: r.data.email,
            token: r.headers.authorization.replace('Bearer ', ''),
          });

          this.$router.push('/');
        } else {
          // Show an error probably ?
        }

        this.loading = false;
      });
    },
    clearForm() {
      this.email = '';
      this.password = '';
    },
  },
};
</script>

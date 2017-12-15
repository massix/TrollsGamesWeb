<template>
  <v-container>
    <v-layout>
      <v-flex xs12 sm6 offset-sm3>
        <v-alert :color="success? 'success' : 'error'" :icon="success? 'check_circle' : 'warning'" :value="submitted">
          {{ requestReturn }}
        </v-alert>
        <v-form v-model="valid" @submit.prevent="submitForm" :disabled="submitted">
          <v-text-field label="Your user on BoardGameGeek" v-model="bggNick" :disabled="!bggHandled"></v-text-field>
          <v-text-field label="Name you want to show to others" v-model="forumNick" required></v-text-field>
          <v-text-field label="Your email address (must be valid)" v-model="email" required></v-text-field>

          <v-text-field label="Password" v-model="password" required :type="passwordVisible? 'text' : 'password'"
                        :rules="passwordRules"
                        :append-icon="passwordVisible ? 'visibility' : 'visibility_off'"
                        :append-icon-cb="() => passwordVisible = !passwordVisible"></v-text-field>

          <v-text-field label="Confirm your password" v-model="confirmPassword" required
                        :type="confirmPasswordVisible? 'text' : 'password'"
                        :rules="confirmPasswordRules"
                        :append-icon="confirmPasswordVisible ? 'visibility' : 'visibility_off'"
                        :append-icon-cb="() => confirmPasswordVisible = !confirmPasswordVisible"></v-text-field>
          <v-checkbox label="I own an account on BoardGameGeek" v-model="bggHandled"></v-checkbox>
          <v-btn light type="submit" class="green lighten-1" :disabled="!valid">
            Submit
          </v-btn>
          <v-btn dark class="red darken-1" @click="resetForm">
            Clear
          </v-btn>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
import axios from 'axios';
import * as _ from 'lodash';

export default {
  data() {
    return {
      submitted: false,
      bggHandled: true,
      valid: true,
      bggNick: '',
      forumNick: '',
      email: '',
      password: '',
      confirmPassword: '',
      passwordVisible: false,
      confirmPasswordVisible: false,
      success: true,
      requestReturn: '',

      passwordRules: [
        p => p.length >= 8 || 'Password must be at least 8 characters long',
      ],

      confirmPasswordRules: [
        p => p === this.password || 'Passwords don\'t match',
      ],
    };
  },

  methods: {
    submitForm() {
      if (_.isEmpty(this.bggNick) && this.bggHandled) {
        //eslint-disable-next-line
        console.error('empty bgg nick and not handled');
        return;
      } else if (_.isEmpty(this.bggNick && !this.bggHandled)) {
        this.bggNick = this.forumNick;
      }

      if (!_.isEqual(this.password, this.confirmPassword)) {
        // Show an error here ?
        //eslint-disable-next-line
        console.error('passwords don\'t match');
        return;
      }

      axios.post(`${this.apiBase}/v1/users/register?redirect=${this.redirectUrl}`, {
        bggNick: this.bggNick,
        forumNick: this.forumNick,
        email: this.email,
        password: this.password,
        bggHandled: this.bggHandled,
      }).then((r) => {
        this.submitted = true;
        if (r.status === 200) {
          this.success = true;
          this.requestReturn = `An email has been sent at ${this.email}, click on the verification link!`;
        }
      }).catch((error) => {
        this.submitted = true;
        this.success = false;
        this.requestReturn = error;
      });
    },
    resetForm() {
      this.bggNick = '';
      this.forumNick = '';
      this.email = '';
      this.password = '';
      this.confirmPassword = '';
    },
  },

  computed: {
    redirectUrl() {
      return process.env.REDIRECT_URL;
    },

    apiBase() {
      return process.env.API_BASE;
    },
  },
};
</script>

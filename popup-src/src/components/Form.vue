<template>
  <div class="form">
    <error-message v-if="errorMessage" :message="errorMessage" />
    <form @submit.prevent="onSubmit">
      <div class="form__input">
        <label>
          Username:
          <input type="text" v-model="username">
        </label>
      </div>
      <div class="form__input">
        <label>
          Password:
          <input type="password" v-model="password">
        </label>
      </div>
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import ErrorMessage from './ErrorMessage.vue';

export default {
  name: 'app-form',
  components: {
    ErrorMessage,
  },
  data() {
    return {
      username: '',
      password: '',
      errorMessage: '',
    };
  },
  methods: {
    onSubmit() {
      const url = 'https://www.ovpn.se/v2/api/client';
      axios.post(url, {
        username: this.username,
        password: this.password
      })
      .then((res) => {
        if(res.status === 200) {
          console.log(res.data);
        }
      })
      .catch((error) => {
        console.log(error.message);
        if (error.response.status === 422) {
          this.errorMessage = error.response.data.message;
        }
      });
    }
  },
}
</script>

<style>
.form__input {
  margin-bottom: 15px;
}
.error {
  background-color: #
}
</style>

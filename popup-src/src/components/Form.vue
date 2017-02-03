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
import api from '../api/ovpn-api';
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
      this.errorMessage = '';
      api.login(this.username, this.password)
        .then((res) => {
          this.$emit('loggedIn', res);
        })
        .catch((err) => {
          this.resetForm();
          this.errorMessage = err.message;
        });
    },
    resetForm() {
      this.username = '';
      this.password = '';
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

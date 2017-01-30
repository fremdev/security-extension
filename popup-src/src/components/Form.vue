<template>
  <div class="form">
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
export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    onSubmit() {
      console.log('Works:' + this.username  + 'pass' + this.password);
    }
  }
}
</script>

<style>
.form__input {
  margin-bottom: 15px;
}
</style>

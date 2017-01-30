<template>
  <div id="app">
    <app-form @loggedIn="onSuccessLogin($event)"></app-form>
  </div>
</template>

<script>
import AppForm from './components/Form.vue';

export default {
  name: 'app',
  components: {
    AppForm,
  },
  methods: {
    onSuccessLogin(data) {
      console.log('Success login from App', data);
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

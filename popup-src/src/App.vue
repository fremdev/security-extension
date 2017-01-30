<template>
  <div id="app">
    <app-form v-if="!user" @loggedIn="onSuccessLogin($event)"></app-form>
    <app-dashboard v-if="user"></app-dashboard>
  </div>
</template>

<script>
import AppForm from './components/Form.vue';
import AppDashboard from './components/Dashboard.vue';

export default {
  name: 'app',
  components: {
    AppForm,
    AppDashboard,
  },
  data() {
    return {
      user: '',
    }
  },
  methods: {
    onSuccessLogin(user) {
      this.user = user;
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

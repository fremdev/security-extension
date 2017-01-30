<template>
  <div id="app">
    <app-form v-if="!user" @loggedIn="onSuccessLogin($event)"></app-form>
    <app-dashboard v-if="user" :user="user"></app-dashboard>
  </div>
</template>

<script>
import axios from 'axios';
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
      blocklist: [],
    }
  },
  methods: {
    onSuccessLogin(user) {
      this.user = user;
      this.getBlocklist(user.filtering);
    },
    getBlocklist(isFiltering) {
      const url = 'https://www.ovpn.se/v2/api/client/blocklist';
      axios.get(url)
        .then((res) => {
          const allDomains = res.data.domains;
          if(isFiltering) {
            this.blocklist = allDomains;
          } else {
            this.blocklist = allDomains.filter((domain) => {
              return domain.type === "tracker";
            });
          }
        })
        .catch((err) => {
          console.log(error);
        });
    },
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

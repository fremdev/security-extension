<template>
  <div id="app">
    <div class="logo">
      <img src="./assets/ovpn-logo.png" alt="OVPN.se" title="OVPN.se">
    </div>
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
  mounted() {
    this.checkChromeStorage();
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
      chrome.storage.local.set({'ovpn_user': user});
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
    checkChromeStorage() {
      chrome.storage.local.get('ovpn_user', (items) => {
        this.user = items.ovpn_user;
        console.log(items);
      });
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
  width: 200px;
}
.logo {
  background-color: #153752;
  margin-bottom: 20px;
}
</style>

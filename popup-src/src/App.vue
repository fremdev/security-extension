<template>
  <div id="app">
    <div class="logo">
      <img src="./assets/ovpn-logo.png" alt="OVPN.se" title="OVPN.se">
    </div>
    <app-form v-if="!user" @loggedIn="onSuccessLogin($event)"></app-form>
    <app-dashboard v-if="user" :user="user" :count="blockCount"></app-dashboard>
    <button v-if="user" @click="onLogout">Logout</button>
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
    this.getBlockedReqCount();
    this.onBlockedReq();
  },
  data() {
    return {
      user: null,
      blocklist: null,
      blockCount: 0,
    }
  },
  methods: {
    onSuccessLogin(user) {
      this.user = user;
      chrome.storage.local.set({'ovpn_user': user});
      this.getBlocklist(user.filtering);
    },
    onLogout() {
      chrome.storage.local.remove(['ovpn_user', 'ovpn_blocklist']);
      this.user = null;
      this.blocklist = null;
      this.blockCount = 0;
      this.sendLogoutToBackground();
    },
    getBlockedReqCount() {
      chrome.runtime.sendMessage({getCount: true}, (res) => {
        this.blockCount = res.count;
      });
    },
    onBlockedReq() {
      chrome.runtime.onMessage.addListener(
        (request, sender, sendResponse) => {
          if(request.blockRequest) {
            this.blockCount = request.blockRequest;
          }
        });
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
          this.sendBlocklistToBackground(this.blocklist);
        })
        .catch((err) => {
          console.log(error);
        });
    },
    sendBlocklistToBackground(blocklist) {
      chrome.runtime.sendMessage({blocklist});
    },
    sendLogoutToBackground() {
      chrome.runtime.sendMessage({'logout': true});
    },
    checkChromeStorage() {
      chrome.storage.local.get('ovpn_user', (items) => {
        this.user = items.ovpn_user;
        if(this.user) {
          this.getBlocklist(this.user.filtering);
        }
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

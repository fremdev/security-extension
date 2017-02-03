import axios from 'axios';
import settings from './settings';

const { baseUrl } = settings;

export default {
  getBlocklist(isFiltering) {
    const url = `${baseUrl}/client/blocklist`;
    return axios.get(url)
      .then((res) => {
        const allDomains = res.data.domains;
        let blocklist = allDomains;
        if(!isFiltering) {
          blocklist = allDomains.filter((domain) => {
            return domain.type === "tracker";
          });
        }
        return blocklist;
      })
      .catch((err) => {
        console.log(error);
      });
  },

  login(username, password) {
    const url = `${baseUrl}/client`;

    return axios.post(url, {
      username,
      password
    })
    .then((res) => {
      if(res.status === 200) {
        return {
          username,
          filtering: res.data.user.addons.filtering.active
        };
      }
    })
    .catch((error) => {
      if(error.response) {
        if (error.response.status === 422) {
          throw new Error(error.response.data.message);
        }
      }
    });
  }
}

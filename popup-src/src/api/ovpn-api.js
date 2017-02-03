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
}

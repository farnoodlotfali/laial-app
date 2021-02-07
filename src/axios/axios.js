import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://laial.7negare.ir/api',
});

const downloader = axios.create({
  baseURL: 'http://downloader.7negare.ir/download',
});
const auth = axios.create({
  baseURL: 'http://laial.7negare.ir/api/account',
});
// eslint-disable-next-line
export default { instance, downloader, auth };

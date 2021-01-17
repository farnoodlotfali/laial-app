import axios from 'axios';

const instance = axios.create({
  // baseURL: 'http://localhost:8001',
  baseURL: 'http://laial.7negare.ir/api',
});
const downloader = axios.create({
  // baseURL: 'http://localhost:8001',
  baseURL: 'http://downloader.7negare.ir/download',
});
// eslint-disable-next-line
export default { instance, downloader };

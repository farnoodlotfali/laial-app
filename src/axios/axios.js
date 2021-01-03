import axios from 'axios';

const instance = axios.create({
  // baseURL: 'http://localhost:8001',
  baseURL: 'http://laial.7negare.ir/api',
});

export default instance;

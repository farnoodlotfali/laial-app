import axios from 'axios';

const instanceApi = axios.create({
  baseURL: 'http://laial.7negare.ir/api',
});
let tryCount = 0;
instanceApi.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // const { logout } = useContext(authContext);
    // console.log(111);
    // console.log(
    //   '**t***',
    //   error.config && error.response && error.response.status === 401,
    //   error,
    //   error.response.status,
    //   error.config
    // );
    if (error.config && error.response && error.response.status === 401) {
      if (tryCount === 1) {
        return Promise.reject(error);
      }

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const form = { refresh: localStorage.getItem('tokenRefresh') };

      tryCount++;
      return instanceApi
        .post('/token/refresh/', form, config)
        .then((response) => {
          // console.log(response);
          localStorage.setItem('tokenAccess', response.data.access);
          error.config.headers.Authorization = response.data.access;
          return axios.request(error.config);
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            localStorage.clear();
            window.location = '/login';
          }
          return Promise.reject(error);
        });
    }

    return Promise.reject(error);
  }
);

const downloader = axios.create({
  baseURL: 'http://downloader.7negare.ir/download',
});
const auth = axios.create({
  baseURL: 'http://laial.7negare.ir/api/account',
});
// eslint-disable-next-line
export default { instanceApi, downloader, auth };

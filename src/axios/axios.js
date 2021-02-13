import axios from 'axios';
import { useHistory } from 'react-router';
let tryCount = 0;

const instanceApi = axios.create({
  baseURL: 'http://laial.7negare.ir/api',
});

instanceApi.interceptors.response.use(
  (response) => {
    return response;
  },

  async (error) => {
    // const { logout } = useContext(authContext);
    // console.log(tryCount);
    // console.log(
    //   '**t***',
    //   error.config && error.response && error.response.status === 401,
    //   error,
    //   error.response.status,
    //   error.config
    // );
    if (error.config && error.response && error.response.status === 401) {
      if (tryCount === 3) {
        console.log(tryCount);
        localStorage.clear();
        window.location = '/login';
        return Promise.reject(error);
      }
      // console.log(error.config);
      // console.log(error.response && error.response.status === 401);
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
          return axios(error.config);
        });
      // .catch((error) => {
      //   if (error.response && error.response.status === 401) {
      //     // localStorage.clear();
      //     // window.location = '/login';
      //     console.log(tryCount);
      //   }
      //   return Promise.reject(error);
      // });
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

import axios from "axios";
let tryCount = 0;
let downloaderTryCount = 0;

const instanceApi = axios.create({
  // baseURL: "http://laial.7negare.ir/api",
  // http://nejat.safine.co/api/page/home/.
  baseURL: "https://nejat.safine.co/api",
});
// instanceApi.interceptors.request.use((request) => {
//   console.log(request);

//   return request;
// });

instanceApi.interceptors.response.use(
  (response) => {
    // console.log(response);

    return response;
  },

  async (error) => {
    console.log(error.config);
    // console.log(error.response);
    // const { logout } = useContext(authContext);
    // console.log(tryCount);
    // console.log(
    //   '**t***',
    //   error.config && error.response && error.response.status === 401,
    //   error,
    //   error.response.status,
    //   error.config
    // );
    if (error.config && error.response && error.response.status === 404) {
      window.location = "/not_found";
      return Promise.reject(error);
      // console.log(111);
    }

    if (error.config && error.response && error.response.status === 401) {
      if (tryCount === 3) {
        // console.log(66);
        const res = JSON.parse(
          localStorage.getItem("logForRefreshTokenExpired")
        );
        if (!res) {
          localStorage.clear();
          window.location = "/login";
          localStorage.setItem("logForRefreshTokenExpired", true);
        }

        return Promise.reject(error);
      }
      // console.log(tryCount);
      // console.log(error.response && error.response.status === 401);
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const form = { refresh: localStorage.getItem("tokenRefresh") };

      tryCount++;
      return instanceApi
        .post("/token/refresh/", form, config)
        .then((response) => {
          if (response.status === 200 || response.status === 201) {
            // console.log(response);
            localStorage.setItem("tokenAccess", response.data.access);
            error.config.headers.Authorization =
              "Bearer " + response.data.access;
            return instanceApi.request(error.config);
          }
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
  // baseURL: "http://downloader.7negare.ir/download",
  baseURL: "https://downloader.safine.co/",
});
// downloader.interceptors.request.use((request) => {
//   console.log(request);

//   return request;
// });

downloader.interceptors.response.use(
  (response) => {
    // console.log(response);
    return response;
  },

  async (error) => {
    console.log(error.config);

    if (error.config && error.response && error.response.status === 503) {
      if (downloaderTryCount === 3) {
        return Promise.reject(error);
      }

      downloaderTryCount++;

      return setTimeout(() => {
        instanceApi.request(error.config);
      }, 3000);
    }

    return Promise.reject(error);
  }
);

// for getting photos
const simpleApi = axios.create({
  baseURL: "https://nejat.safine.co/api",
});

// eslint-disable-next-line
export default {
  instanceApi,
  downloader,
  simpleApi,
  // , auth
};

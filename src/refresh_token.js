var tryCount = 0;
axios.interceptors.response.use(null, (error) => {
  console.log(
    '**t***',
    error.config && error.response && error.response.status === 401,
    error,
    error.response.status,
    error.config
  );
  if (error.config && error.response && error.response.status === 401) {
    if (tryCount === 1) {
      return Promise.reject(error);
    }
    tryCount++;
    return UserApi.refresh_token()
      .then((response) => {
        localStorage.set('tokenAccess', response.Data.token);
        localStorage.set('tokenRefresh', response.Data.refreshToken);
        error.config.headers.Authorization = response.Data.token;
        return axios.request(error.config);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          window.location = '/login';
        }
        return Promise.reject(error);
      });
  }

  return Promise.reject(error);
});

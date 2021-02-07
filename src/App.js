import React, { useContext } from 'react';
import './App.css';
import {
  // BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import Header from './Header';
import AppState from './contexts/AppState';
// eslint-disable-next-line
import Left from './Left';
import Center from './Center';
import Home from './Home';
import Search from './search/Search';
import AboutUs from './AboutUs';
import SearchState from './search/SearchState';
import Playerstate from './player/PlayerState';
import RowItemPage from './RowItemPage';
import PhoneMenu from './PhoneMenu';
import MoreSong from './MoreSong';
import Person from './Person';
import axios from 'axios';
import Foooter from './Foooter';
import Test from './Test';
import Register from './Register';
import Login from './Login';
import AuthState from './auth/AuthState';
import authContext from './auth/authContext';

let tryCount = 0;
axios.interceptors.request.use(null, async (error) => {
  console.log(111);
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

    const config = {
      headers: {
        'Content-Type': 'application/json',
        // Authorization: 'Bearer ' + localStorage.getItem('tokenRefresh'),
      },
    };
    const form = localStorage.getItem('tokenRefresh');
    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });

    tryCount++;
    return axios
      .get('/token/refresh/', form, config)
      .then((response) => {
        localStorage.set('tokenAccess', response.data.access);
        // localStorage.set('tokenRefresh', response.Data.refreshToken);
        error.config.headers.Authorization = response.data.access;
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

const createAxiosResponseInterceptor = () => {
  console.log(1221);
  const interceptor = axios.interceptors.response.use(
    (response) => response,
    (error) => {
      // Reject promise if usual error
      if (error.response.status !== 401) {
        return Promise.reject(error);
      }

      /*
       * When response code is 401, try to refresh the token.
       * Eject the interceptor so it doesn't loop in case
       * token refresh causes the 401 response
       */
      axios.interceptors.response.eject(interceptor);

      return axios
        .post('http://laial.7negare.ir/api/token/refresh/', {
          refresh: localStorage.getItem('tokenRefresh'),
        })
        .then((response) => {
          // saveToken();
          console.log(12);
          error.response.config.headers['Authorization'] =
            'Bearer ' + response.data.access;
          return axios(error.response.config);
        })
        .catch((error) => {
          console.log(33);

          window.location = '/login';

          return Promise.reject(error);
        })
        .finally(createAxiosResponseInterceptor);
    }
  );
};

//   const config = {
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   };

//   const formData = new FormData();
//   Object.keys(form).forEach((key) => {
//     formData.append(key, form[key]);
//   });

//   const res = await axios.post(
//     'http://laial.7negare.ir/api/token/refresh/',
//     form,
//     config
//   );
//   console.log(res.data.access);
// };
// x({
//   refresh:
//     'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTYxMjc3OTk4MywidXNlcl9pZCI6MjMsImp0aSI6ImZhNDQxM2JlNzkxNzQ0NjE4ZDEzYjdmMmE1Y2UwMDc1In0.JSa6CNadqEiJM2Nm5k60NqqVRceGeWQ59iht2weRZQw',
// });

const App = () => {
  return (
    <div className='app '>
      {/* <Test /> */}
      {/* <AuthState>
        <Register />
      </AuthState> */}
      {/* <Login /> */}
      <AppState>
        <Playerstate>
          <SearchState>
            <AuthState>
              <Center />
              <Left />
              <Header />
              <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/register' component={Register} />
                <Route exact path='/login' component={Login} />
                <Route
                  sensitive
                  exact
                  path={`/song/:slug`}
                  component={RowItemPage}
                  exact
                />
                <Route exact path='/search' component={Search} />
                <Route
                  sensitive
                  exact
                  path='/list/:slug'
                  component={MoreSong}
                />

                <Route exact path='/aboutus' component={AboutUs} />
                <Route
                  sensitive
                  exact
                  path='/person/:slug'
                  component={Person}
                />
                <Route exact path='/:slug' component={Home} />
                <Route exact path='/**' component={AboutUs} />
              </Switch>

              <Foooter />

              <PhoneMenu />
            </AuthState>{' '}
          </SearchState>
        </Playerstate>
      </AppState>
    </div>
  );
};

export default App;

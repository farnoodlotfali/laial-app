import React, { useReducer } from 'react';
import axios from '../axios/axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  USER_LOADED,
} from './types';
const AuthState = (props) => {
  const initialState = {
    // tokenAccess: localStorage.getItem('tokenAccess'),
    // tokenRefresh: localStorage.getItem('tokenRefresh'),
    isAuth: false,
    loading: true,
    error: null,
    user: JSON.parse(localStorage.getItem('user')),
  };
  const [state, dispatch] = useReducer(authReducer, initialState);

  //load user
  const loadUser = async () => {
    // console.log(localStorage.tokenAccess);
    if (localStorage.tokenAccess) {
      // axios.instance.defaults.headers.common['auth-token'] = state.tokenAccess;
      dispatch({
        type: USER_LOADED,
      });
    }
  };

  // register user
  const register = async (form) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });

    try {
      const res = await axios.instanceApi.post(
        '/account/register/',
        formData,
        config
      );
      // console.log(res.data);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
      loadUser();
    } catch (error) {
      console.log(error.response.data);
      dispatch({
        type: REGISTER_FAIL,
        payload: error,
      });
    }
  };

  //login
  const login = async (form) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });
    try {
      const res = await axios.instanceApi.post('/account/login/', form, config);
      // console.log(res);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });

      loadUser();
    } catch (error) {
      dispatch({
        type: LOGIN_FAIL,
        payload: error,
      });
    }
  };

  //logout
  const logout = () => {
    dispatch({ type: LOGOUT });
  };

  //test-auth token
  const testAuth = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('tokenAccess'),
      },
    };
    try {
      const res = await axios.instanceApi.get('/test-auth/', config);
      // console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        register,
        loadUser,
        logout,
        login,
        testAuth,
        isAuth: state.isAuth,
        user: state.user,
        // tokenAccess: state.tokenAccess,
        // tokenRefresh: state.tokenRefresh,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
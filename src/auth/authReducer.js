import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  USER_LOADED,
} from './types';

export default (state, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem('tokenAccess', action.payload.token.access);
      localStorage.setItem('tokenRefresh', action.payload.token.refresh);
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      return {
        ...state,
        // ...action.payload,
        isAuth: true,
        loading: false,
        user: action.payload.user,
        tokenAccess: action.payload.token.access,
        tokenRefresh: action.payload.token.refresh,
      };

    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem('tokenAccess');
      localStorage.removeItem('tokenRefresh');
      localStorage.removeItem('user');
      return {
        ...state,
        tokenRefresh: null,
        tokenAccess: null,
        isAuth: false,
        loading: false,
        user: null,
        // error: action.payload,
      };

    case USER_LOADED:
      return {
        ...state,
        isAuth: true,
        loading: false,
      };

    default:
      return {
        ...state,
      };
  }
};

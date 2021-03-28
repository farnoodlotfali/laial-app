import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  USER_LOADED,
  GET_TAGS,
  SAVE_TAGS_SUCCESS,
} from "./types";
// eslint-disable-next-line
export default (state, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      localStorage.setItem("tokenAccess", action.payload.token.access);
      localStorage.setItem("tokenRefresh", action.payload.token.refresh);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      return {
        ...state,
        isAuth: true,
        loading: false,
        isUserChooseTags: true,
        user: action.payload.user,
        tokenAccess: action.payload.token.access,
        tokenRefresh: action.payload.token.refresh,
      };
    case REGISTER_SUCCESS:
      localStorage.setItem("tokenAccess", action.payload.token.access);
      localStorage.setItem("tokenRefresh", action.payload.token.refresh);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      return {
        ...state,
        isAuth: true,
        isUserChooseTags: false,
        loading: false,
        user: action.payload.user,
        tokenAccess: action.payload.token.access,
        tokenRefresh: action.payload.token.refresh,
      };

    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem("tokenAccess");
      localStorage.removeItem("tokenRefresh");
      localStorage.removeItem("user");
      return {
        ...state,
        tokenRefresh: null,
        tokenAccess: null,
        isAuth: false,
        loading: false,
        user: null,
        error: action.payload,
      };

    case USER_LOADED:
      return {
        ...state,
        isAuth: true,
        loading: false,
      };
    case GET_TAGS:
      return {
        ...state,
        tags: action.payload.results,
        tagsUrls: {
          next: action.payload.next,
          previous: action.payload.previous,
        },
      };
    case SAVE_TAGS_SUCCESS:
      return {
        ...state,
        isUserChooseTags: true,
      };
    default:
      return {
        ...state,
      };
  }
};

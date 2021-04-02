import React, { useContext, useReducer } from "react";
import { useHistory } from "react-router";
import axios from "../axios/axios";
import appContext from "../contexts/appContext";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
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
const AuthState = (props) => {
  const history = useHistory();
  const initialState = {
    // tokenAccess: localStorage.getItem('tokenAccess'),
    // tokenRefresh: localStorage.getItem('tokenRefresh'),
    isAuth: false,
    isUserChooseTags: JSON.parse(localStorage.getItem("favorite_items")),
    loading: true,
    error: null,
    user: JSON.parse(localStorage.getItem("user")),
    tags: null,
    tagsUrls: {
      next: null,
      previous: null,
    },
  };

  const [state, dispatch] = useReducer(authReducer, initialState);
  const { getAllPlaylists } = useContext(appContext);
  //load user
  const loadUser = async () => {
    // console.log(localStorage.tokenAccess);
    if (localStorage.tokenAccess) {
      // axios.instance.defaults.headers.common['auth-token'] = state.tokenAccess;
      getAllPlaylists();

      dispatch({
        type: USER_LOADED,
      });
    }
    if (!state.isUserChooseTags && state.user !== null) {
      history.push("/user-interests");
    }
  };

  // register user
  const register = async (form) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });

    try {
      const res = await axios.instanceApi.post(
        "/account/register/",
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
        "Content-Type": "application/json",
      },
    };

    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });
    try {
      const res = await axios.instanceApi.post("/account/login/", form, config);
      console.log(res.data);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });

      loadUser();
      getAllPlaylists();
    } catch (error) {
      console.log(error.response.data);
      dispatch({
        type: LOGIN_FAIL,
        payload: error?.response?.data,
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
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("tokenAccess"),
      },
    };
    try {
      await axios.instanceApi.get("/test-auth/", config);
      // console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getTags = async () => {
    try {
      const res = await axios.simpleApi.get("/tags");
      // console.log(res.data);
      dispatch({
        type: GET_TAGS,
        payload: res.data,
      });
    } catch (error) {}
  };
  const saveChosenTags = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("tokenAccess"),
      },
    };
    // const formData = {
    //   email: email,
    // };

    try {
      const res = await axios.instanceApi.post(
        `/account/tags/`,
        formData,
        config
      );
      console.log(res.status);
      dispatch({
        type: SAVE_TAGS_SUCCESS,
      });
      // return res.status;
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
        getTags,
        saveChosenTags,
        isAuth: state.isAuth,
        user: state.user,
        error: state.error,
        isUserChooseTags: state.isUserChooseTags,
        tags: state.tags,
        tagsUrls: state.tagsUrls,
        // tokenAccess: state.tokenAccess,
        // tokenRefresh: state.tokenRefresh,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;

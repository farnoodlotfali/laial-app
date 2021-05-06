import React, { useContext, useEffect, useReducer } from "react";
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
  FORCE_LOGIN,
  CHANGE_SHOW_LOGIN_MODAL,
} from "./types";
const AuthState = (props) => {
  const history = useHistory();
  const initialState = {
    // tokenAccess: localStorage.getItem('tokenAccess'),
    // tokenRefresh: localStorage.getItem('tokenRefresh'),
    isAuth: false,
    showLoginModal: false,
    isUserChooseTags: JSON.parse(localStorage.getItem("favorite_items")),
    loading: true,
    error: null,
    user: JSON.parse(localStorage.getItem("user")),
    tags: null,
    tagsUrls: {
      next: null,
      previous: null,
    },
    forceToLoginDueTo10SongListened:
      JSON.parse(localStorage.getItem("limitListTo10"))?.length >= 10
        ? true
        : false,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);
  const { getAllPlaylists } = useContext(appContext);

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, [state.user]);
  // console.log(state.forceToLoginDueTo10SongListened);
  //load user
  const loadUser = async () => {
    if (localStorage.tokenAccess) {
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
      // console.log(res.status);
      dispatch({
        type: SAVE_TAGS_SUCCESS,
      });
      // return res.status;
    } catch (error) {
      console.log(error);
    }
  };
  const forceLogin = () => {
    dispatch({
      type: FORCE_LOGIN,
    });
  };
  const changeShowLoginModal = (newValue) => {
    dispatch({
      payload: newValue,
      type: CHANGE_SHOW_LOGIN_MODAL,
    });
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
        forceLogin,
        changeShowLoginModal,
        isAuth: state.isAuth,
        user: state.user,
        error: state.error,
        isUserChooseTags: state.isUserChooseTags,
        tags: state.tags,
        tagsUrls: state.tagsUrls,
        showLoginModal: state.showLoginModal,
        forceToLoginDueTo10SongListened: state.forceToLoginDueTo10SongListened,
        // tokenAccess: state.tokenAccess,
        // tokenRefresh: state.tokenRefresh,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;

import { useEffect, useReducer } from "react";
import axios from "../axios/axios";
import AppContext from "./appContext";
import appReducer from "./appReducer";
import {
  GET_HOME,
  ERROR,
  SET_LOADING,
  GET_BLOCK,
  GET_PERSON,
  GET_SONG_PAGE,
  GET_SONG_PAGE_URL,
  VIEWS_PAGE,
  GET_RECOMMENDER,
  LIKE_SONG,
  GET_PLAYLISTS,
  IS_ADDING_NEW_SONG_TO_PLAYLIST,
  ADD_SONG_SUCCESS,
  CHANGE_SHOW_CENTER,
  SET_SONG_ID,
  CHANGE_SHOW_MUSIC,
  GET_MENU,
  GET_ALL_PERSONS,
  FIND_MAIN_PLAYLIST,
  SET_LOADING_ON_USER_PLAYLIST,
  REMOVE_LOADING_ON_USER_PLAYLIST,
  CHANGE_SHOW_RIGHT,
  CHANGE_SHOW_LEFT,
  CHANGE_HOME_META,
  THIS_SONG_HAS_BEEN_ADD,
  REMOVE_THIS_SONG_HAS_BEEN_ADD,
  CHANGE_MY_PROFILE_MY_SONGLIST_ID,
  CHANGE_SHOW_CREATE_LIST,
  GET_CONFIGS,
  REMOVE_LOADING,
} from "./types";
const AppState = (props) => {
  const initialState = {
    home: null,
    homeMeta: {
      meta_description: null,
      meta_title: null,
      name: null,
      slug: null,
      id: null,
    },
    menu: null,
    pageLoading: false,
    showCenter: true,
    showMusic: false,
    showRight: false,
    showLeft: false,
    showCreateList: false,
    isAddingSong: false,
    loadingOnUserPlaylist: false,
    whichSongToSaveInPlaylist: null,
    block: null,
    BlockListName: "",
    blockSlug: null,
    personkSlug: null,
    homeSlug: null,
    error: null,
    allPersons: null,
    mainPlaylistId: null,
    personList: null,
    personListInfinteList: null,
    personUrls: {
      next: null,
      previous: null,
    },
    AllpersonsUrls: {
      next: null,
      previous: null,
    },
    blockUrls: {
      next: null,
      previous: null,
    },
    dataSongPage: null,
    downloadUrl: null,
    viewsPage: 0,
    like: 0,
    recommender: null,
    userPlaylists: null,
    thisSongHasBeenAddedToRecentlyViwed: false,
    myProfilemySonglistId: null,
    LimitListPlayNonLogin: 10,
  };
  useEffect(() => {
    getMenu();
    getAllPersons();
    getConfig();
  }, []);
  const [state, dispatch] = useReducer(appReducer, initialState);

  const ChangeShowMusic = () => {
    // setShowMusic(!showMusic);

    dispatch({
      type: CHANGE_SHOW_MUSIC,
    });
  };
  const ChangeShowRight = (newValue) => {
    // setShowMusic(!showMusic);

    dispatch({
      type: CHANGE_SHOW_RIGHT,
      payload: newValue,
    });
  };
  const ChangeShowCreateList = (newValue) => {
    // setShowMusic(!showMusic);

    dispatch({
      type: CHANGE_SHOW_CREATE_LIST,
      payload: newValue,
    });
  };

  const ChangeShowLeft = (newShowleft) => {
    dispatch({
      type: CHANGE_SHOW_LEFT,
      payload: newShowleft,
    });
    // setShowLeft(newShowleft);
  };
  const ChangeshowCenter = () => {
    if (state.showLeft) {
      ChangeShowLeft();
    }
    dispatch({
      type: CHANGE_SHOW_CENTER,
    });
    // setShowCenter(!showCenter);
    // console.log(1);
  };

  const viewPage = async (slug) => {
    try {
      // eslint-disable-next-line
      const view = await axios.instanceApi.get(`/post/${slug}/?state=views`);
      // console.log(view.data.data);
      dispatch({
        type: VIEWS_PAGE,
        payload: view.data.data.views,
      });
    } catch (error) {
      // console.log(error);
      dispatch({
        type: ERROR,
        payload: error,
      });
    }
  };

  const likeSong = async (slug) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("tokenAccess"),
      },
    };
    // console.log(config);
    try {
      // eslint-disable-next-line
      const like = await axios.instanceApi.post(`/post/${slug}/`, null, config);
      // console.log(like.data);
      dispatch({
        type: LIKE_SONG,
        payload: like.data.data.likes,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: ERROR,
        payload: error,
      });
    }
  };
  const getSongPage = async (newSlug) => {
    // getMenu();
    dispatch({
      type: SET_LOADING,
    });
    try {
      const res = await axios.instanceApi.get(`post/${newSlug}`);
      // console.log(res?.data?.data?.media?.[0]?.path);
      if (res?.data?.data?.media?.[0]?.path) {
        dispatch({
          type: GET_SONG_PAGE_URL,
          payload: res?.data?.data?.media?.[0]?.path,
        });
      } else {
        getSongPageUrl(res.data.data.media[0].telegram_id);
      }

      dispatch({
        type: GET_SONG_PAGE,
        payload: res.data.data,
      });
    } catch (error) {
      // console.log(error);
      dispatch({
        type: ERROR,
        payload: error,
      });
    }
  };

  const getSongPageUrl = async (telegramId) => {
    try {
      const res = await axios.downloader.get(`/${telegramId}`);
      // console.log(res.data.download_link);
      dispatch({
        type: GET_SONG_PAGE_URL,
        payload: res.data.download_link,
      });
    } catch (error) {
      // console.log(error);
      dispatch({
        type: ERROR,
        payload: error,
      });
    }
  };

  const getHome = async (slug = "home") => {
    dispatch({
      type: SET_LOADING,
    });
    try {
      const res = await axios.instanceApi.get(`page/${slug}`);

      dispatch({
        type: GET_HOME,
        payload: {
          data: res.data.data[0],
          slug: slug === "home" ? undefined : slug,
        },
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error,
      });
    }
    dispatch({
      type: REMOVE_LOADING,
    });
  };

  const getBlock = async (newSlug) => {
    // getMenu();
    dispatch({
      type: SET_LOADING,
    });
    try {
      const res = await axios.instanceApi.get(`block/${newSlug}`);
      // console.log(res.data);
      dispatch({
        type: GET_BLOCK,
        payload: {
          block: res.data.results,
          BlockListName: res.data?.block?.name,
          blockUrls: {
            next: res.data.next,
            previous: res.data.previous,
          },
          blockSlug: newSlug,
        },
      });
      // console.log(res);
    } catch (error) {
      console.log(error);
      dispatch({
        type: ERROR,
        payload: error,
      });
    }
  };

  const getAllPersons = () => {
    axios.instanceApi
      .get("/persons/")
      .then((res) =>
        dispatch({
          type: GET_ALL_PERSONS,
          payload: {
            allPersons: res.data.results,
            AllpersonsUrls: {
              next: res.data.next,
              previous: res.data.previous,
            },
          },
        })
      )
      .catch((err) => dispatch({ type: ERROR, payload: err }));
  };

  const getPerson = async (newSlug) => {
    // getMenu();
    dispatch({
      type: SET_LOADING,
    });
    try {
      const res = await axios.instanceApi.get(`persons/${newSlug}`);
      // console.log(res.data);
      dispatch({
        type: GET_PERSON,
        payload: {
          personList: res.data.results,
          personUrls: {
            next: res.data.next,
            previous: res.data.previous,
          },
          personkSlug: newSlug,
        },
      });
    } catch (error) {
      // console.log(error);
      dispatch({
        type: ERROR,
        payload: error,
      });
    }
  };

  const getRecommender = async () => {
    try {
      const res = await axios.instanceApi.get(`/recommender`);
      // console.log(res.data.data);
      dispatch({
        type: GET_RECOMMENDER,
        payload: res.data.data,
      });
    } catch (error) {
      // console.log(error);
      dispatch({
        type: ERROR,
        payload: error,
      });
    }
  };

  const getAllPlaylists = async () => {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("tokenAccess"),
      },
    };

    try {
      const res = await axios.instanceApi.get("/account/playlist/", config);
      // console.log(res);
      findMainPlaylist(res.data);
      dispatch({
        type: GET_PLAYLISTS,
        payload: res.data,
      });
    } catch (error) {
      // console.log(error);
      dispatch({
        type: ERROR,
        payload: error,
      });
    }
  };
  const findMainPlaylist = (list) => {
    list.map((item) => {
      return (
        item.name === "main playlist" &&
        dispatch({ type: FIND_MAIN_PLAYLIST, payload: item.id })
      );
    });
  };
  const makeNewPlaylist = async (form) => {
    // console.log(form);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("tokenAccess"),
      },
    };

    try {
      await axios.instanceApi.post("/account/playlist/", form, config);
      // console.log(res.data);
      getAllPlaylists();
      return true;
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error,
      });
    }

    return false;
  };

  const removePlaylist = async (form) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("tokenAccess"),
      },
    };
    const formdate = {
      id: form,
      status: "delete",
    };
    try {
      const res = await axios.instanceApi.patch(
        "/account/playlist/update/",
        formdate,
        config
      );
      console.log(res.data);
      getAllPlaylists();
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error,
      });
    }
  };

  const updatePlaylistName = async (id, newName) => {
    // console.log(9090);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("tokenAccess"),
      },
    };
    const formdate = {
      id: id,
      name: newName,
    };
    try {
      const res = await axios.instanceApi.patch(
        "/account/playlist/update/",
        formdate,
        config
      );
      console.log(res.data);
      getAllPlaylists();
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error,
      });
    }
  };

  const removeSongFromPlaylist = async (form) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("tokenAccess"),
      },
    };
    console.log(form);
    const formdate = {
      id: form,
      status: "delete",
    };
    try {
      const res = await axios.simpleApi.patch(
        "/account/playlist/item/",
        formdate,
        config
      );
      console.log(res.data);
      getAllPlaylists();
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error,
      });
    }
  };

  const addToLikedSongPlaylist = async (postId) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("tokenAccess"),
      },
    };
    const form = {
      post: postId,
    };
    try {
      const res = await axios.instanceApi.post("/account/like/", form, config);
      console.log(res.data);
    } catch (error) {
      console.log(error);
      dispatch({
        type: ERROR,
        payload: error,
      });
    }
  };
  const getLikedSongsPlaylist = async () => {
    dispatch({
      type: SET_LOADING_ON_USER_PLAYLIST,
    });
    const config = {
      headers: {
        "Content-Type": "app;ication/json",
        Authorization: "Bearer " + localStorage.getItem("tokenAccess"),
      },
    };

    try {
      const res = await axios.instanceApi.get("/account/like/", config);
      // console.log(res.data);
      dispatch({
        type: REMOVE_LOADING_ON_USER_PLAYLIST,
      });
      return res.data;
    } catch (error) {
      console.log(error);
      dispatch({
        type: ERROR,
        payload: error,
      });
    }
  };
  const addMusicToRecentlyViewed = async (duration, postId) => {
    dispatch({
      type: THIS_SONG_HAS_BEEN_ADD,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("tokenAccess"),
      },
    };
    const form = {
      duration: duration,
      post: postId,
    };
    // console.log(form);

    try {
      // eslint-disable-next-line
      const res = await axios.instanceApi.post(
        "/account/recently-view/",
        form,
        config
      );

      console.log(res.data);
    } catch (error) {
      console.log(error);
      dispatch({
        type: ERROR,
        payload: error,
      });
    }
  };

  const getRecentlyViewedSongsPlaylist = async () => {
    dispatch({
      type: SET_LOADING_ON_USER_PLAYLIST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("tokenAccess"),
      },
    };

    try {
      const res = await axios.instanceApi.get(
        "/account/recently-view/",
        config
      );
      console.log(res.data);
      dispatch({
        type: REMOVE_LOADING_ON_USER_PLAYLIST,
      });
      return res.data;
    } catch (error) {
      console.log(error);
      dispatch({
        type: ERROR,
        payload: error,
      });
    }
  };

  const addMusicToPlaylist = async (form) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("tokenAccess"),
      },
    };
    const formData = {
      playlist: form,
      post: state.whichSongToSaveInPlaylist,
    };
    // console.log(state.whichSongToSaveInPlaylist);
    // console.log(formData);

    try {
      await axios.instanceApi.post("/account/playlist/item/", formData, config);
      // console.log(res.data);
      getAllPlaylists();

      dispatch({
        type: ADD_SONG_SUCCESS,
      });
      // ChangeshowCenter();
      // setTimeout(() => {
      // setShowCenter(false);
      // }, 3000);
      return true;
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error,
      });
    }
    return false;
  };

  const setWhichSongToSaveInPlaylist = (songId) => {
    ChangeshowCenter();

    dispatch({
      type: SET_SONG_ID,
      payload: songId,
    });
    dispatch({
      type: IS_ADDING_NEW_SONG_TO_PLAYLIST,
    });
  };

  const addMusicToMAINPlaylist = async (postId) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("tokenAccess"),
      },
    };

    const formData = {
      playlist: state.mainPlaylistId,
      post: postId,
    };

    // console.log(formData);

    try {
      // eslint-disable-next-line
      const res = await axios.instanceApi.post(
        "/account/playlist/item/",
        formData,
        config
      );
      console.log(res.data);
      getAllPlaylists();

      // ChangeshowCenter();
      // setTimeout(() => {
      // setShowCenter(false);
      // }, 3000);
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error,
      });
    }
  };

  const getMenu = () => {
    axios.instanceApi
      .get(`/menu/`)
      .then((res) =>
        //  console.log(res.data)
        dispatch({
          type: GET_MENU,
          payload: res.data.results,
        })
      )
      .catch((error) =>
        // console.log(error),
        dispatch({
          type: ERROR,
          payload: error,
        })
      );
  };
  const getOnePlayList = async (id) => {
    dispatch({
      type: SET_LOADING_ON_USER_PLAYLIST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("tokenAccess"),
      },
    };
    try {
      const res = await axios.instanceApi.get(
        `/account/playlist/?playlist=${id}`,
        config
      );
      dispatch({
        type: REMOVE_LOADING_ON_USER_PLAYLIST,
      });
      res.data?.[0]?.items.map((item) => {
        // for put PostIdForDeleteFromUserPlaylist for deleteing
        return (item.post.PostIdForDeleteFromUserPlaylist = item.id);
      });
      // console.log(res.data);
      return res.data?.[0]?.items;
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error,
      });
    }
  };
  const forgetPassword = async (email) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const formData = {
      email: email,
    };
    try {
      const res = await axios.instanceApi.post(
        `/account/password_reset/`,
        formData,
        config
      );
      // console.log(res.status);

      return res.status;
    } catch (error) {
      console.log(error);
    }
  };
  const validateTokenForgetPassword = async (token) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const formData = {
      token: token,
    };

    try {
      const res = await axios.simpleApi.post(
        `/account/password_reset/validate_token/`,
        formData,
        config
      );
      // console.log(res.status);

      return res.status;
    } catch (error) {
      console.log(error);
    }
  };

  const confrimRestPassword = async (token, pass) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const formData = {
      token: token,
      password: pass,
    };

    try {
      const res = await axios.instanceApi.post(
        `/account/password_reset/confirm/`,
        formData,
        config
      );
      console.log(res.status);

      return res.status;
    } catch (error) {
      console.log(error);
    }
  };
  const changeCurrentPassword = async (oldPass, newPass) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("tokenAccess"),
      },
    };

    const formData = {
      old_password: oldPass,
      new_password: newPass,
    };
    try {
      const res = await axios.instanceApi.put(
        `/account/change-password/`,
        formData,
        config
      );
      console.log(res.status);

      return res.status;
    } catch (error) {
      console.log(error);
    }
  };

  const changeHomeMeta = (newTitle, newDesc) => {
    dispatch({
      type: CHANGE_HOME_META,
      payload: {
        newTitle: newTitle,
        newDesc: newDesc,
      },
    });
  };
  const removeThisSongHasBeenbAdd = () => {
    dispatch({
      type: REMOVE_THIS_SONG_HAS_BEEN_ADD,
    });
  };

  const changeMyProfilemySonglistId = (id) => {
    dispatch({
      type: CHANGE_MY_PROFILE_MY_SONGLIST_ID,
      payload: id,
    });
  };

  const getConfig = async () => {
    try {
      const res = await axios.instanceApi.get("/configs/");
      dispatch({
        type: GET_CONFIGS,
        payload: res.data,
      });
      // console.log(JSON.parse(res.data?.[0]?.value));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        ChangeShowMusic,
        ChangeShowLeft,
        ChangeshowCenter,
        ChangeShowRight,
        ChangeShowCreateList,
        getHome,
        getMenu,
        getPerson,
        getBlock,
        getSongPage,
        viewPage,
        likeSong,
        getAllPlaylists,
        getOnePlayList,
        makeNewPlaylist,
        removePlaylist,
        updatePlaylistName,
        removeSongFromPlaylist,
        addToLikedSongPlaylist,
        getLikedSongsPlaylist,
        addMusicToRecentlyViewed,
        getRecentlyViewedSongsPlaylist,
        getRecommender,
        changeCurrentPassword,
        confrimRestPassword,
        validateTokenForgetPassword,
        forgetPassword,
        addMusicToPlaylist,
        setWhichSongToSaveInPlaylist,
        addMusicToMAINPlaylist,
        changeHomeMeta,
        removeThisSongHasBeenbAdd,
        changeMyProfilemySonglistId,
        getSongPageUrl,
        home: state.home,
        homeMeta: state.homeMeta,
        menu: state.menu,
        block: state.block,
        LimitListPlayNonLogin: state.LimitListPlayNonLogin,
        blockUrls: state.blockUrls,
        allPersons: state.allPersons,
        AllpersonsUrls: state.AllpersonsUrls,
        homeSlug: state.homeSlug,
        showCenter: state.showCenter,
        showMusic: state.showMusic,
        showRight: state.showRight,
        showLeft: state.showLeft,
        showCreateList: state.showCreateList,
        blockSlug: state.blockSlug,
        dataSongPage: state.dataSongPage,
        myProfilemySonglistId: state.myProfilemySonglistId,
        tagsUrls: state.tagsUrls,
        tags: state.tags,
        // dataSongPageMeta: state.dataSongPageMeta,
        loadingOnUserPlaylist: state.loadingOnUserPlaylist,
        thisSongHasBeenAddedToRecentlyViwed:
          state.thisSongHasBeenAddedToRecentlyViwed,
        BlockListName: state.BlockListName,
        personList: state.personList,
        personUrls: state.personUrls,
        personkSlug: state.personkSlug,
        userPlaylists: state.userPlaylists,
        pageLoading: state.pageLoading,
        downloadUrl: state.downloadUrl,
        viewsPage: state.viewsPage,
        like: state.like,
        recommender: state.recommender,
        mainPlaylistId: state.mainPlaylistId,
        isAddingSong: state.isAddingSong,
        whichSongToSaveInPlaylist: state.whichSongToSaveInPlaylist,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;

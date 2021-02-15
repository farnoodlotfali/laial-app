import { useReducer, useState } from 'react';
import axios from '../axios/axios';
import AppContext from './appContext';
import appReducer from './appReducer';
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
  SET_HALF_HOUR_REFRESH,
} from './types';
const AppState = (props) => {
  const initialState = {
    home: null,
    loading: false,
    block: null,
    BlockListName: '',
    blockSlug: null,
    personkSlug: null,
    error: null,
    personList: null,
    dataSongPage: null,
    downloadUrl: null,
    viewsPage: 0,
    like: 0,
    recommender: null,
    // x: false,
  };
  const [state, dispatch] = useReducer(appReducer, initialState);
  const [showMusic, setShowMusic] = useState(false);
  const [showLeft, setShowLeft] = useState(false);
  const [showCenter, setShowCenter] = useState(false);
  const [x, setx] = useState(false);
  const [lists, setLists] = useState([]);
  const showx = (newValue) => {
    // setx(!x);
    setx(!x);
  };

  const ChangeShowMusic = () => {
    setShowMusic(!showMusic);
  };

  const ChangeShowLeft = (newShowleft) => {
    setShowLeft(newShowleft);
  };
  const ChangeshowCenter = () => {
    if (showLeft) {
      ChangeShowLeft();
    }
    setShowCenter(!showCenter);
  };
  const ChangeLists = (newLists) => {
    setLists(newLists);
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
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('tokenAccess'),
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
    dispatch({
      type: SET_LOADING,
    });
    try {
      const res = await axios.instanceApi.get(`post/${newSlug}`);
      // console.log(res.data.data.likes);
      getSongPageUrl(res.data.data.media[0].telegram_id);

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
  const getHome = async () => {
    dispatch({
      type: SET_LOADING,
    });
    try {
      const res = await axios.instanceApi.get(`page/home`);
      dispatch({
        type: GET_HOME,
        payload: res.data.data[0].block,
      });
    } catch (error) {
      // console.log(error);
      dispatch({
        type: ERROR,
        payload: error,
      });
    }
  };

  const getBlock = async (newSlug) => {
    dispatch({
      type: SET_LOADING,
    });
    try {
      const res = await axios.instanceApi.get(`block/${newSlug}`);
      dispatch({
        type: GET_BLOCK,
        payload: {
          block: res.data.results,
          BlockListName: res.data?.block[0]?.name,
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

  const getPerson = async (newSlug) => {
    dispatch({
      type: SET_LOADING,
    });
    try {
      const res = await axios.instanceApi.get(`persons/${newSlug}`);
      // console.log(res.data);
      dispatch({
        type: GET_PERSON,
        payload: { personList: res.data.results, personkSlug: newSlug },
      });
      // console.log(res.data.results);
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
  return (
    <AppContext.Provider
      value={{
        ChangeShowMusic,
        showMusic,
        ChangeShowLeft,
        showLeft,
        ChangeshowCenter,
        showCenter,
        ChangeLists,
        lists,
        getHome,
        getPerson,
        getBlock,
        getSongPage,
        viewPage,
        likeSong,

        getRecommender,
        showx,
        x,
        home: state.home,
        block: state.block,
        blockSlug: state.blockSlug,
        dataSongPage: state.dataSongPage,
        BlockListName: state.BlockListName,
        personList: state.personList,
        personkSlug: state.personkSlug,
        loading: state.loading,
        downloadUrl: state.downloadUrl,
        viewsPage: state.viewsPage,
        like: state.like,
        recommender: state.recommender,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;

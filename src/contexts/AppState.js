import React, { useReducer, useState } from 'react';
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
} from './types';
const AppState = (props) => {
  const initialState = {
    home: null,
    loading: false,
    block: null,
    BlockListName: '',
    slug: null,
    error: null,
    personList: null,
    dataSongPage: null,
    // x: false,
  };
  const [state, dispatch] = useReducer(appReducer, initialState);
  const [showMusic, setShowMusic] = useState(false);
  const [showLeft, setShowLeft] = useState(false);
  const [showCenter, setShowCenter] = useState(false);
  const [x, setx] = useState(false);
  // const [loading, setLoading] = useState(true);
  // const [slug, setSlug] = useState('home');
  const [lists, setLists] = useState([]);
  const showx = () => {
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
      const view = await axios.instance.get(`/post/${slug}/?state=views`);
    } catch (error) {
      // console.log(error);
      dispatch({
        type: ERROR,
        payload: error,
      });
    }
  };
  const getSongUrl = async () => {};

  const getHome = async () => {
    dispatch({
      type: SET_LOADING,
    });
    try {
      const res = await axios.instance.get(`page/home`);
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
      const res = await axios.instance.get(`block/${newSlug}`);
      dispatch({
        type: GET_BLOCK,
        payload: {
          block: res.data.results,
          BlockListName: res.data?.block[0]?.name,
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
      const res = await axios.instance.get(`persons/${newSlug}`);
      // console.log(res.data);
      dispatch({
        type: GET_PERSON,
        payload: res.data.results,
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
  const getSongPage = async (newSlug) => {
    dispatch({
      type: SET_LOADING,
    });
    try {
      const res = await axios.instance.get(`post/${newSlug}`);
      // console.log(res.data.data);
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
        getSongUrl,
        showx,
        x,
        home: state.home,
        block: state.block,
        dataSongPage: state.dataSongPage,
        BlockListName: state.BlockListName,
        personList: state.personList,
        loading: state.loading,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;

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
  CHANGE_SHOW_MUSIC,
  SET_SONG_ID,
} from './types';
// eslint-disable-next-line
export default (state, action) => {
  switch (action.type) {
    case GET_HOME:
      return {
        ...state,
        home: action.payload,
        loading: false,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_BLOCK:
      // console.log(action.payload);
      return {
        ...state,
        block: action.payload.block,
        BlockListName: action.payload.BlockListName,
        blockSlug: action.payload.blockSlug,
        blockUrls: action.payload.blockUrls,
        loading: false,
      };

    case GET_PERSON:
      return {
        ...state,
        personList: action.payload.personList,
        personUrls: action.payload.personUrls,
        personkSlug: action.payload.personkSlug,
        loading: false,
      };
    case GET_SONG_PAGE:
      return {
        ...state,
        dataSongPage: action.payload,
        like: action.payload.likes,
        // loading: false,
      };
    case GET_SONG_PAGE_URL:
      return {
        ...state,
        downloadUrl: action.payload,
        loading: false,
      };
    case VIEWS_PAGE:
      return {
        ...state,
        viewsPage: action.payload,
      };
    case LIKE_SONG:
      return {
        ...state,
        like: action.payload,
      };
    case GET_RECOMMENDER:
      return {
        ...state,
        recommender: action.payload,
      };
    case GET_PLAYLISTS:
      return {
        ...state,
        userPlaylists: action.payload,
      };
    case IS_ADDING_NEW_SONG_TO_PLAYLIST:
      return {
        ...state,
        isAddingSong: true,
      };
    case ADD_SONG_SUCCESS:
      return {
        ...state,
        isAddingSong: false,
      };
    case CHANGE_SHOW_CENTER:
      // console.log(state.showCenter);
      return {
        ...state,
        showCenter: !state.showCenter,

        isAddingSong: state.isAddingSong && false,
      };
    case CHANGE_SHOW_MUSIC:
      return {
        ...state,
        showMusic: !state.showMusic,
      };
    case SET_SONG_ID:
      return {
        ...state,
        whichSongToSaveInPlaylist: action.payload,
      };
    case ERROR:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return { ...state };
  }
};

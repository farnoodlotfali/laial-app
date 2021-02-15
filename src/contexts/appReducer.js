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
        loading: false,
      };

    case GET_PERSON:
      return {
        ...state,
        personList: action.payload.personList,
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
    case ERROR:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return { ...state };
  }
};

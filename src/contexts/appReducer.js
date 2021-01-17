import {
  GET_HOME,
  ERROR,
  SET_LOADING,
  GET_BLOCK,
  GET_PERSON,
  GET_SONG_PAGE,
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
        loading: false,
      };

    case GET_PERSON:
      return {
        ...state,
        personList: action.payload,
        loading: false,
      };
    case GET_SONG_PAGE:
      return {
        ...state,
        dataSongPage: action.payload,
        loading: false,
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

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
  GET_MENU,
  GET_ALL_PERSONS,
  FIND_MAIN_PLAYLIST,
  SET_LOADING_ON_USER_PLAYLIST,
  REMOVE_LOADING_ON_USER_PLAYLIST,
  CHANGE_SHOW_RIGHT,
} from "./types";
// eslint-disable-next-line
export default (state, action) => {
  switch (action.type) {
    case GET_HOME:
      return {
        ...state,
        home: action.payload.block,
        homeMeta: {
          meta_description: action.payload.meta_description,
          meta_title: action.payload.meta_title,
          name: action.payload.name,
          slug: action.payload.slug,
          id: action.payload.id,
        },
        loading: false,
      };
    case GET_MENU:
      return {
        ...state,
        menu: action.payload,
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
    case GET_ALL_PERSONS:
      return {
        ...state,
        allPersons: action.payload.allPersons,
        AllpersonsUrls: action.payload.AllpersonsUrls,
      };
    case GET_SONG_PAGE:
      return {
        ...state,
        dataSongPage: action.payload,
        like: action.payload.likes,

        // dataSongPageMeta: {
        //   meta_description: action.payload.meta_description,
        //   meta_title: action.payload.meta_title,
        //   name: action.payload.name,
        //   slug: action.payload.slug,
        //   id: action.payload.id,
        // },
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
    case CHANGE_SHOW_RIGHT:
      return {
        ...state,
        showRight: action.payload,
      };
    case SET_SONG_ID:
      return {
        ...state,
        whichSongToSaveInPlaylist: action.payload,
      };
    case FIND_MAIN_PLAYLIST:
      return {
        ...state,
        mainPlaylistId: action.payload,
      };

    case SET_LOADING_ON_USER_PLAYLIST:
      return {
        ...state,
        loadingOnUserPlaylist: true,
      };
    case REMOVE_LOADING_ON_USER_PLAYLIST:
      return {
        ...state,
        loadingOnUserPlaylist: false,
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

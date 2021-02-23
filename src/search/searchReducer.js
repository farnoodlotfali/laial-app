import {
  // PERSONS_VALUE_CHANGE,
  SEARCH_SUCCESS,
  SEARCH_FAIL,
  EMPTY_SEARCH,
} from './types';

// searchValue: '',

// eslint-disable-next-line
export default (state, action) => {
  switch (action.type) {
    // case PERSONS_VALUE_CHANGE:
    //   if (action.payload.length === 0) {
    //     return {
    //       ...state,
    //       persons: action.payload,
    //       filtered: null,
    //     };
    //   } else {
    //     return {
    //       ...state,
    //       persons: action.payload,
    //       filtered: state.allSongs.filter((song) => {
    //         return action.payload.some((person) => {
    //           return person === song.persons;
    //         });
    //       }),
    //     };
    //   }
    case SEARCH_SUCCESS:
      return {
        ...state,
        previousSearchPageUrl: action.payload.data.previous,
        nextSearchPageUrl: action.payload.data.next,
        personsSearch: action.payload.data.persons,
        resultsSearch: action.payload.data.results,
        searchValueInput: action.payload.searchValueInput,
      };
    case SEARCH_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case EMPTY_SEARCH:
      return {
        ...state,
        previousSearchPageUrl: null,
        nextSearchPageUrl: null,
        personsSearch: null,
        resultsSearch: null,
      };
    default:
      return { ...state };
  }
};

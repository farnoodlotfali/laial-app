import {
  SEARCH_VALUE_CHANGE,
  PERSONS_VALUE_CHANGE,
  CATEGORIES_VALUE_CHANGE,
  MODES_VALUE_CHANGE,
  YEARS_VALUE_CHANGE,
  LANGUAGES_VALUE_CHANGE,
  ORDER_VALUE_CHANGE,
} from './types';

// searchValue: '',
// persons: [],
// categories: [],
// modes: [],
// years: [],
// languages: [],
// order: [],

export default (state, action) => {
  switch (action.type) {
    case CATEGORIES_VALUE_CHANGE:
      console.log(state.filtered);
      // console.log(action.payload);
      if (action.payload.length === 0) {
        return {
          ...state,
          categories: action.payload,
          filtered: state.filtered,
        };
      } else if (state.filtered !== null) {
        return {
          ...state,
          categories: action.payload,
          filtered: state.filtered.filter((song) => {
            return action.payload.some((category) => {
              return category === song.categories;
            });
          }),
        };
      } else {
        console.log(state.filtered);
        return {
          ...state,
          categories: action.payload,
          filtered: state.allSongs.filter((song) => {
            return action.payload.some((category) => {
              return category === song.categories;
            });
          }),
        };
      }

    case PERSONS_VALUE_CHANGE:
      if (action.payload.length === 0) {
        return {
          ...state,
          persons: action.payload,
          filtered: null,
        };
      } else {
        return {
          ...state,
          persons: action.payload,
          filtered: state.allSongs.filter((song) => {
            return action.payload.some((person) => {
              return person === song.persons;
            });
          }),
        };
      }

    default:
      return state;
  }
};

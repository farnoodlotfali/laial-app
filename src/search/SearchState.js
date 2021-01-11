import React, { useReducer, useState } from 'react';
import SearchContext from './searchContext';
import searchReducer from './searchReducer';
import {
  // SEARCH_VALUE_CHANGE,
  PERSONS_VALUE_CHANGE,
  CATEGORIES_VALUE_CHANGE,
  // MODES_VALUE_CHANGE,
  // YEARS_VALUE_CHANGE,
  // LANGUAGES_VALUE_CHANGE,
  // ORDER_VALUE_CHANGE,
} from './types';
const options = [
  {
    categories: 'محرم',
    languages: 'فارسی',
    persons: 'احمد',
    modes: 'شور',
    years: '1994',
  },
  {
    categories: 'شب سوم محرم',
    languages: 'فارسی',
    persons: 'غلام',
    modes: 'شور',
    years: '1994',
  },
  {
    categories: 'شب اول محرم',
    languages: 'فارسی',
    persons: 'فرید',
    modes: 'شور',
    years: '1994',
  },
  {
    categories: 'محرم',
    languages: 'فارسی',
    persons: 'علی',
    modes: 'روضه',
    years: '1994',
  },
  {
    categories: 'شب اول محرم',
    languages: 'ترکی',
    persons: 'محمد',
    modes: 'روضه',
    years: '1994',
  },
  {
    categories: 'شب اول محرم',
    languages: 'فارسی',
    persons: 'قاسم',
    modes: 'روضه',
    years: '1994',
  },
  {
    categories: 'محرم',
    languages: 'فارسی',
    persons: 'صمد',
    modes: 'روضه',
    years: '1994',
  },
  {
    categories: 'شب سوم محرم',
    languages: 'فارسی',
    persons: 'سام',
    modes: 'شور',
    years: '1994',
  },
  {
    categories: 'محرم',
    languages: 'فارسی',
    persons: 'شایان',
    modes: 'شور',
    years: '2001',
  },
  {
    categories: 'شهادت',
    languages: 'ترکی',
    persons: 'لاله',
    modes: 'دودمه',
    years: '2001',
  },
  {
    categories: 'شهادت',
    languages: 'ترکی',
    persons: 'فرنود',
    modes: 'دودمه',
    years: '2001',
  },
  {
    categories: 'شهادت',
    languages: 'فارسی',
    persons: 'مجید',
    modes: 'شور',
    years: '2001',
  },
  {
    categories: 'محرم',
    languages: 'ترکی',
    persons: 'سامی',
    modes: 'دودمه',
    years: '1994',
  },
  {
    categories: 'شب سوم محرم',
    languages: 'فارسی',
    persons: 'محمد',
    modes: 'دودمه',
    years: '2001',
  },
];
const SearchState = (props) => {
  const initialState = {
    allSongs: options,
    filtered: null,
    searchValue: '',
    persons: [],
    categories: [],
    modes: [],
    years: [],
    languages: [],
    order: [],
    // loading: false,
  };
  const [state, dispatch] = useReducer(searchReducer, initialState);
  const [loading, setLoading] = useState(false);

  const changePersons = (newPersons) => {
    setLoading(true);
    dispatch({
      type: PERSONS_VALUE_CHANGE,
      payload: newPersons,
    });
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };
  const changeCategories = (newCategories) => {
    // setLoading(true);
    dispatch({
      type: CATEGORIES_VALUE_CHANGE,
      payload: newCategories,
    });
    // setTimeout(() => {
    //   setLoading(false);
    // }, 3000);
  };
  // console.log(state.filtered);
  return (
    <SearchContext.Provider
      value={{
        allSongs: state.allSongs,
        filtered: state.filtered,
        searchValue: state.searchValue,
        persons: state.persons,
        categories: state.categories,
        modes: state.modes,
        years: state.years,
        languages: state.languages,
        order: state.order,
        loading: loading,
        changePersons,
        changeCategories,
      }}
    >
      {props.children}
    </SearchContext.Provider>
  );
};

export default SearchState;

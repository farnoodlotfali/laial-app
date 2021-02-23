import React, { useReducer } from 'react';
import axios from '../axios/axios';
import SearchContext from './searchContext';
import searchReducer from './searchReducer';
import {
  SEARCH_SUCCESS,
  SEARCH_FAIL,
  EMPTY_SEARCH,
  // PERSONS_VALUE_CHANGE,
} from './types';
// const options = [
//   {
//     categories: 'محرم',
//     languages: 'فارسی',
//     persons: 'احمد',
//     modes: 'شور',
//     years: '1994',
//   },
//   {
//     categories: 'شب سوم محرم',
//     languages: 'فارسی',
//     persons: 'غلام',
//     modes: 'شور',
//     years: '1994',
//   },
//   {
//     categories: 'شب اول محرم',
//     languages: 'فارسی',
//     persons: 'فرید',
//     modes: 'شور',
//     years: '1994',
//   },
//   {
//     categories: 'محرم',
//     languages: 'فارسی',
//     persons: 'علی',
//     modes: 'روضه',
//     years: '1994',
//   },
//   {
//     categories: 'شب اول محرم',
//     languages: 'ترکی',
//     persons: 'محمد',
//     modes: 'روضه',
//     years: '1994',
//   },
//   {
//     categories: 'شب اول محرم',
//     languages: 'فارسی',
//     persons: 'قاسم',
//     modes: 'روضه',
//     years: '1994',
//   },
//   {
//     categories: 'محرم',
//     languages: 'فارسی',
//     persons: 'صمد',
//     modes: 'روضه',
//     years: '1994',
//   },
//   {
//     categories: 'شب سوم محرم',
//     languages: 'فارسی',
//     persons: 'سام',
//     modes: 'شور',
//     years: '1994',
//   },
//   {
//     categories: 'محرم',
//     languages: 'فارسی',
//     persons: 'شایان',
//     modes: 'شور',
//     years: '2001',
//   },
//   {
//     categories: 'شهادت',
//     languages: 'ترکی',
//     persons: 'لاله',
//     modes: 'دودمه',
//     years: '2001',
//   },
//   {
//     categories: 'شهادت',
//     languages: 'ترکی',
//     persons: 'فرنود',
//     modes: 'دودمه',
//     years: '2001',
//   },
//   {
//     categories: 'شهادت',
//     languages: 'فارسی',
//     persons: 'مجید',
//     modes: 'شور',
//     years: '2001',
//   },
//   {
//     categories: 'محرم',
//     languages: 'ترکی',
//     persons: 'سامی',
//     modes: 'دودمه',
//     years: '1994',
//   },
//   {
//     categories: 'شب سوم محرم',
//     languages: 'فارسی',
//     persons: 'محمد',
//     modes: 'دودمه',
//     years: '2001',
//   },
// ];
const SearchState = (props) => {
  const initialState = {
    // allSongs: null,
    // filtered: null,
    previousSearchPageUrl: null,
    nextSearchPageUrl: null,
    personsSearch: null,
    resultsSearch: null,
    error: null,
    searchValueInput: '',
    // loading: false,
  };
  const [state, dispatch] = useReducer(searchReducer, initialState);

  // const changePersons = (newPersons) => {
  //   setLoading(true);
  //   dispatch({
  //     type: PERSONS_VALUE_CHANGE,
  //     payload: newPersons,
  //   });
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 3000);
  // };
  // };

  const emptySearch = () => {
    dispatch({
      type: EMPTY_SEARCH,
    });
  };

  const search = async (searchValue) => {
    try {
      const res = await axios.instanceApi.get(`/search/?q=${searchValue}`);
      // console.log(res.data);
      dispatch({
        type: SEARCH_SUCCESS,
        payload: {
          data: res.data,
          searchValueInput: searchValue,
        },
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: SEARCH_FAIL,
        payload: error.response,
      });
    }
  };

  return (
    <SearchContext.Provider
      value={{
        allSongs: state.allSongs,
        filtered: state.filtered,
        nextSearchPageUrl: state.nextSearchPageUrl,
        resultsSearch: state.resultsSearch,
        personsSearch: state.personsSearch,
        searchValueInput: state.searchValueInput,
        search,
        emptySearch,
      }}
    >
      {props.children}
    </SearchContext.Provider>
  );
};

export default SearchState;

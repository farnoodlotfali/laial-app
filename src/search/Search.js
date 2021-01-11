import {
  BottomNavigation,
  BottomNavigationAction,
  TextField,
} from '@material-ui/core';
import React, { useState, useReducer, useContext } from 'react';
import Navigation from '../Navigation';
import './Search.css';
import Autocomplete from '@material-ui/lab/Autocomplete';

import SearchView from './SearchView';
import searchContext from './searchContext';

const options = [
  {
    categories: 'محرم',
    languages: 'فارسی',
    persons: 'محمد',
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
const Search = () => {
  const { changePersons, changeCategories } = useContext(searchContext);
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
  };

  // const [state, dispatch] = useReducer(SearchReducer, initialState);
  const [value, setValue] = useState(0);
  const [loading, setLoading] = useState(false);

  const findSame = (title) => {
    const newArray = [];
    options.map((option) => {
      if (!newArray.includes(option[title])) {
        newArray.push(option[title]);
      }
    });
    return newArray;
  };

  // const changePersons = (newPersons) => {
  //   setLoading(true);
  //   state.filtered = state.allSongs.filter((song) => {

  //     return newPersons.some((person) => {
  //       return person === song.persons;
  //     });
  //   });
  //   console.log(state.filtered);

  //   setLoading(false);
  // };

  return (
    <div className='search '>
      <Navigation />
      <div className='ُsearch__title mr-5 pt-2'>
        <h1>جستجو</h1>
      </div>
      <div className='d-flex categoreis mr-3'>
        <BottomNavigation
          value={value}
          onChange={(e, newValue) => {
            setValue(newValue);
          }}
          showLabels
        >
          <BottomNavigationAction className='categoryBtn ' label='مداحی' />
          <BottomNavigationAction className='categoryBtn ' label='سخنرانی' />
        </BottomNavigation>
      </div>
      <div className='searchFields my-3 '>
        <div className='searchFields__top mx-3 my-3' dir='rtl'>
          <div className='col-4 searchFields__option'>
            <TextField
              onChange={(v) => {
                console.log(v.target.value);
              }}
              variant='outlined'
              label='جستجو متن '
              placeholder='جستجو متن '
              fullWidth
            />
          </div>
          <div className='col-4 searchFields__option'>
            <Autocomplete
              limitTags={2}
              multiple
              onChange={(e, v) => {
                // handleOnchange
                changePersons(v);
                // console.log(v);
              }}
              options={findSame('persons')}
              getOptionLabel={(option) => option}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant='outlined'
                  label='اشخاص'
                  placeholder='اشخاص'
                />
              )}
            />
          </div>
          <div className='col-4 searchFields__option'>
            <Autocomplete
              limitTags={2}
              multiple
              onChange={(e, v) => {
                // handleOnchange
                changeCategories(v);
                // console.log(v);
              }}
              options={findSame('categories')}
              getOptionLabel={(option) => option}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant='outlined'
                  label='دسته بندی'
                  placeholder='دسته بندی'
                />
              )}
            />
          </div>
        </div>
        <div className='searchFields__down mx-3 my-3'>
          <div className='col-2  searchFields__option'>
            <Autocomplete
              limitTags={2}
              multiple
              options={findSame('modes')}
              getOptionLabel={(option) => option}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant='outlined'
                  label='سبک'
                  placeholder='سبک'
                />
              )}
            />
          </div>
          <div className='col-2  searchFields__option'>
            <Autocomplete
              limitTags={2}
              multiple
              options={findSame('years')}
              getOptionLabel={(option) => option}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant='outlined'
                  label='سال'
                  placeholder='سال'
                />
              )}
            />
          </div>
          <div className='col-2 searchFields__option'>
            <Autocomplete
              limitTags={2}
              multiple
              options={findSame('languages')}
              getOptionLabel={(option) => option}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant='outlined'
                  label='زبان'
                  placeholder='زبان'
                />
              )}
            />
          </div>
          <div className='col-4 searchFields__option'>
            <Autocomplete
              limitTags={2}
              multiple
              options={findSame('persons')}
              getOptionLabel={(option) => option}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant='outlined'
                  label='ترتیب'
                  placeholder='ترتیب'
                />
              )}
            />
          </div>
        </div>
      </div>
      <div className='d-flex searchView mx-3 mt-5'>
        <SearchView />
      </div>
    </div>
  );
};

export default Search;

import { useState, useContext } from 'react';
import Navigation from '../Navigation';
import './Search.css';

import SearchView from './SearchView';
import searchContext from './searchContext';
import { useEffect } from 'react';
import authContext from '../auth/authContext';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from '../axios/axios';
import RowItem from '../RowItem';
import PersonItem from '../PersonItem';

// const options = [
//   {
//     categories: 'محرم',
//     languages: 'فارسی',
//     persons: 'محمد',
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
const Search = () => {
  const {
    search,
    loading,
    personsSearch,
    resultsSearch,
    nextSearchPageUrl,
    searchValueInput,
  } = useContext(searchContext);
  const { user, loadUser } = useContext(authContext);
  const [next, setNext] = useState({
    next: '',
    listResults: null,
    listPersons: null,
    hasMore: false,
    page: 2,
    loaderMsg: '',
    empty: false,
  });
  // eslint-disable-next-line
  const [searchValue, setSearchValue] = useState(searchValueInput);
  useEffect(() => {
    loadUser();

    if (
      personsSearch !== next.listPersons &&
      resultsSearch !== next.listResults
    ) {
      setNext({
        ...next,
        next: nextSearchPageUrl,
        listResults: resultsSearch,
        listPersons: personsSearch,
        hasMore: nextSearchPageUrl ? true : false,
        loaderMsg: 'Loading...',
      });
    }
  }, [user, loading, nextSearchPageUrl, personsSearch, resultsSearch]);

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
  const onchange = (e) => {
    setSearchValue(([e.target.name] = e.target.value));
  };
  const onSubmitHandle = (e) => {
    setNext({
      next: '',
      listResults: null,
      listPersons: null,
      hasMore: false,
      page: 2,
      loaderMsg: '',
      empty: false,
    });
    e.preventDefault();
    search(searchValue);
  };

  const infiniteList = async () => {
    console.log(2);
    try {
      const res = await axios.instanceApi.get(
        `/search/?page=${next.page}&q=${searchValue}`
      );
      // console.log(res.data);
      // next.listResults.concat(res.data.results);
      setNext({
        next: res.data.next,
        hasMore: res.data.next ? true : false,
        listResults: next.listResults.concat(res.data.results),
        listPersons: next.listPersons,
        page: ++next.page,
        loaderMsg: res.data.next ? 'Loading...' : 'Finish :)',
      });
      // console.log(next.page);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className='search '
      style={{ height: next.listResults === null ? '100vh' : '' }}
    >
      <Navigation />
      <div className='search__title mr-5 pt-2'>
        <h1>جستجو</h1>
      </div>

      <div className=' searchFields__option my-3 py-3 '>
        <form onSubmit={(e) => onSubmitHandle(e)}>
          <input
            className='ml-2'
            onChange={onchange}
            name='searchValue'
            type='text'
            value={searchValue}
            placeholder='متن جستجو ....'
            required
          />

          <input
            type='submit'
            value='جستجو'
            // value='Register'
          />
        </form>
      </div>
      <div className='listPersons'>
        {next?.listPersons && (
          <h2 className='text-white my-5'>نتایج براساس افراد</h2>
        )}
        {next?.listPersons && (
          <InfiniteScroll
            dataLength={next?.listPersons?.length}
            next={() => infiniteList()}
            hasMore={next.hasMore}

            // height={'100vh'}
          >
            {next.listPersons &&
              next.listPersons?.map((item, i) => {
                return (
                  <PersonItem
                    key={item.id}
                    id={item.id}
                    image={item.image}
                    name={item.name}
                    slug={item.slug}
                  />
                );
              })}
          </InfiniteScroll>
        )}
      </div>
      <div className='listResults'>
        {next?.listResults && (
          <h2 className='text-white my-5'>نتایج براساس آهنگ</h2>
        )}
        {/* <SearchView /> */}
        {next?.listResults && (
          <InfiniteScroll
            dataLength={next?.listResults?.length}
            next={() => infiniteList()}
            hasMore={next.hasMore}

            // height={'100vh'}
          >
            {next.listResults &&
              next.listResults?.map((item, i) => {
                return (
                  <RowItem
                    key={item.id}
                    logo={item.image}
                    media={item.media[0]}
                    person={item.person}
                    slug={item.slug}
                  />
                );
              })}
          </InfiniteScroll>
        )}
      </div>

      <h4 className='text-white mb-5 mt-3'>{next.loaderMsg}</h4>
    </div>
  );
};

export default Search;

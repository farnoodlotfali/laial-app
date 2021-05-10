import { useState, useContext } from "react";
import "./Search.css";
import searchContext from "./searchContext";
import { useEffect } from "react";
import authContext from "../auth/authContext";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "../axios/axios";
import RowItem from "../RowItem";
import PersonItem from "../PersonItem";
import LoadingIcon from "../spinner/LoadingIcon";
import { useHistory } from "react-router";
import { CloseRounded } from "@material-ui/icons";

const Search = () => {
  const history = useHistory();
  const {
    search,
    loading,
    personsSearch,
    resultsSearch,
    nextSearchPageUrl,
    searchValueInput,
  } = useContext(searchContext);
  const { user } = useContext(authContext);
  const [next, setNext] = useState({
    next: "",
    listResults: null,
    listPersons: null,
    hasMore: false,
    page: 2,
    loaderMsg: "",
    loading: false,
  });
  // eslint-disable-next-line
  const [searchValue, setSearchValue] = useState(searchValueInput);
  useEffect(() => {
    if (
      personsSearch !== next.listPersons &&
      resultsSearch !== next.listResults
    ) {
      setNext({
        ...next,
        next: nextSearchPageUrl,
        listResults: resultsSearch,
        loading: false,
        listPersons: personsSearch,
        hasMore: nextSearchPageUrl ? true : false,
        loaderMsg:
          nextSearchPageUrl === null
            ? next.listResults === null
              ? ""
              : "Finish :)"
            : "Loading...",
      });
    }
    // eslint-disable-next-line
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
      ...next,
      next: "",
      listResults: null,
      listPersons: null,
      hasMore: false,
      loading: true,
      page: 2,
      loaderMsg: "",
    });
    e.preventDefault();
    search(searchValue);
  };

  const infiniteList = async () => {
    setNext({
      ...next,
      loading: true,
    });
    setTimeout(async () => {
      try {
        const res = await axios.simpleApi.get(
          `/search/?page=${next.page}&q=${searchValue}`
        );

        setNext({
          next: res.data.next,
          hasMore: res.data.next ? true : false,
          listResults: next.listResults.concat(res.data.results),
          listPersons: next.listPersons,
          page: ++next.page,
          loaderMsg: res.data.next ? "Loading..." : "Finish :)",
          loading: false,
        });
        // console.log(next.page);
      } catch (error) {
        console.log(error);
      }
    }, 1200);
  };

  return (
    <div
      className="search "
      style={{
        height:
          next.listResults === null || next.listResults.length === 0
            ? "100vh"
            : "",
      }}
    >
      {/* <Navigation /> */}
      <div className="search__title ">
        <div
          className="searchFields__option__form__goBack"
          onClick={() => history.goBack()}
        >
          <CloseRounded />
          {/* <span>بستن</span> */}
        </div>
        <h1>جستجو</h1>
      </div>

      <div className=" searchFields__option my-3 py-3 ">
        <form
          className="searchFields__option__form"
          onSubmit={(e) => onSubmitHandle(e)}
        >
          <input
            className="ml-2"
            onChange={onchange}
            name="searchValue"
            type="text"
            value={searchValue}
            placeholder="متن جستجو ...."
            required
          />

          <input
            type="submit"
            value="جستجو"
            // value='Register'
          />
          {/* <input className="mr-2 py-1 px-3" type="button" value="" /> */}
        </form>
      </div>
      <div className="listPersons">
        {next?.listPersons && (
          <h2 className="text-white my-5">نتایج براساس افراد</h2>
        )}
        {next?.listPersons && (
          <InfiniteScroll
            dataLength={next?.listPersons?.length}
            next={() => infiniteList()}
            hasMore={next.hasMore}
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
      <div className="listResults">
        {next?.listResults && (
          <h2 className="text-white my-5">نتایج براساس آهنگ</h2>
        )}
        {next?.listResults && (
          <InfiniteScroll
            dataLength={next?.listResults?.length}
            next={() => infiniteList()}
            hasMore={next.hasMore}
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

      <div
        className="loading-message"
        // ref={loadingRef}
        style={{
          opacity: next.loading ? "1" : "0",
          transform: next.loading && "translate(-50%, -150%)",
        }}
      >
        <LoadingIcon color="#fff" />
        <span>در حال دریافت</span>
      </div>
      {/* <h4 className='text-white mb-5 mt-3'>{next.loaderMsg}</h4> */}
    </div>
  );
};

export default Search;

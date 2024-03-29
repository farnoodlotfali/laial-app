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
import { CloseRounded, SearchRounded } from "@material-ui/icons";

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
    e?.preventDefault();
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
      <div className="d-flex">
        <div className="search__title ">
          <div
            className="searchFields__option__form__goBack"
            onClick={() => history.goBack()}
          >
            <CloseRounded />
          </div>
        </div>
        <div className=" searchFields__option my-3 py-3 ">
          <form
            className="searchFields__option__form"
            onSubmit={(e) => onSubmitHandle(e)}
          >
            <div className="searchFields__option__searching">
              <input
                autoFocus={true}
                className="ml-2"
                onChange={onchange}
                name="searchValue"
                type="text"
                value={searchValue}
                placeholder="متن جستجو ...."
                required
              />
              <div
                className="searchFields__option__searching__icon"
                onClick={() => onSubmitHandle()}
              >
                <input type="submit" />
                <SearchRounded />
              </div>
            </div>

            {/* <input type="submit" value="جستجو" /> */}
          </form>
        </div>
      </div>

      <div className="listPersons">
        {next?.listPersons && <h5 className="text-white my-3">مداحان</h5>}
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
        {next?.listResults && <h5 className="text-white mb-3">مرثیه ها</h5>}
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
                    postId={item.id}
                    isRow={true}
                    logo={item.image}
                    media={item.media[0]}
                    person={item.person}
                    slug={item.slug}
                    context={next?.listResults}
                    meta_description={item.meta_description}
                    meta_title={item.meta_title}
                    description={item.description}
                    title={item.title}
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

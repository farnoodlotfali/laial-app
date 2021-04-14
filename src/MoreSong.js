import { useEffect, useState } from "react";
import "./MoreSong.css";
import RowItem from "./RowItem";
import appContext from "./contexts/appContext";
import { useContext } from "react";
import Spinner from "./spinner/Spinner";
import { useParams } from "react-router";
import authContext from "./auth/authContext";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "./axios/axios";
import LoadingIcon from "./spinner/LoadingIcon";

const MoreSong = () => {
  const {
    BlockListName,
    loading,
    getBlock,
    block,
    blockSlug,
    blockUrls,
  } = useContext(appContext);
  const { user, loadUser } = useContext(authContext);
  const [next, setNext] = useState({
    next: "",
    list: [],
    hasMore: false,
    page: 2,
    loaderMsg: "",
    loading: false,
  });
  let params = useParams();
  // console.log(params.slug);
  // console.log(blockSlug);

  useEffect(() => {
    if (blockSlug !== params.slug) {
      getBlock(params.slug);
    }
    if (block !== next.list) {
      setNext({
        ...next,
        next: blockUrls.next,
        loading: false,
        list: block,
        hasMore: blockUrls.next ? true : false,
        loaderMsg: "Loading...",
      });
    }

    loadUser();
    // eslint-disable-next-line
  }, [params.slug, user, blockUrls, loading, block]);

  const infiniteList = async () => {
    setNext({
      ...next,
      loading: true,
    });
    setTimeout(async () => {
      try {
        const res = await axios.simpleApi.get(
          `/block/${params.slug}/?page=${next.page}`
        );
        // console.log(res.data.results);
        setNext({
          next: res.data.next,
          hasMore: res.data.next ? true : false,
          list: next.list.concat(res.data.results),
          loading: false,
          page: ++next.page,
          loaderMsg: res.data.next ? "Loading..." : "Finish :)",
        });
        //  next.list.concat(res.data.results);
      } catch (error) {
        console.log(error);
      }
    }, 1200);
  };

  return loading ? (
    <Spinner />
  ) : (
    <div className="moreSong pt-5">
      <div className="moreSong__title text-light">
        <h3> {BlockListName}</h3>
      </div>
      <div className="moreSong__items mt-5">
        {next?.list && (
          <InfiniteScroll
            dataLength={next?.list?.length}
            next={() => infiniteList()}
            hasMore={next.hasMore}
            // loader={<h4>Loading...</h4>}
            // height={'100vh'}
            // endMessage={
            //   <p style={{ textAlign: 'center' }}>
            //     <b>Yay! You have seen it all</b>
            //   </p>
            // }
          >
            {next?.list !== null &&
              next?.list.map((item) => (
                <RowItem
                  key={item.id}
                  logo={item.image}
                  media={item.media[0]}
                  person={item.person}
                  slug={item.slug}
                  context={next?.list}
                />
              ))}
          </InfiniteScroll>
        )}
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
    </div>
  );
};

export default MoreSong;

import { useEffect, useState } from 'react';
import './MoreSong.css';
import RowItem from './RowItem';
import appContext from './contexts/appContext';
import { useContext } from 'react';
import Spinner from './spinner/Spinner';
import { useParams } from 'react-router';
import authContext from './auth/authContext';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from './axios/axios';

const MoreSong = () => {
  const {
    BlockListName,
    loading,
    getBlock,
    block,
    blockSlug,
    blockUrls,
  } = useContext(appContext);
  const { user, loadUser, tokenAccess } = useContext(authContext);
  const [next, setNext] = useState({
    next: '',
    list: [],
    hasMore: false,
    page: 2,
    loaderMsg: '',
  });
  const [x, setX] = useState(1);
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
        list: block,
        hasMore: blockUrls.next ? true : false,
        loaderMsg: 'Loading...',
      });
    }

    loadUser();
    // eslint-disable-next-line
  }, [params.slug, user, blockUrls, loading, block]);

  const infiniteList = async () => {
    try {
      const res = await axios.instanceApi.get(
        `/block/${params.slug}/?page=${next.page}`
      );
      // console.log(res.data.results);
      setNext({
        next: res.data.next,
        hasMore: res.data.next ? true : false,
        list: next.list.concat(res.data.results),
        page: ++next.page,
        loaderMsg: res.data.next ? 'Loading...' : 'Finish :)',
      });
      //  next.list.concat(res.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  return loading ? (
    <Spinner />
  ) : (
    <div className='moreSong pb-3 pt-5'>
      <div className='moreSong__title text-light'>
        <h3> {BlockListName}</h3>
      </div>
      <div className='moreSong__items mt-5'>
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
                />
              ))}
          </InfiniteScroll>
        )}
        <h4 className='text-white mb-5 mt-3'>{next.loaderMsg}</h4>
      </div>
    </div>
  );
};

export default MoreSong;

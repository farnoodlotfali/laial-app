import { useContext, useEffect, useState } from 'react';
import appContext from './contexts/appContext';
import './Person.css';
import Spinner from './spinner/Spinner';
import RowItem from './RowItem';
import { useParams } from 'react-router';
import authContext from './auth/authContext';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from './axios/axios';
const Person = () => {
  const {
    personList,
    getPerson,
    personkSlug,
    loading,
    personUrls,
  } = useContext(appContext);
  let params = useParams();

  const { user, loadUser, tokenAccess } = useContext(authContext);
  const [next, setNext] = useState({
    next: '',
    list: null,
    hasMore: false,
    page: 2,
    loaderMsg: '',
  });
  useEffect(() => {
    if (personkSlug !== params.slug) {
      getPerson(params.slug);
    }
    if (personList !== next.list) {
      setNext({
        ...next,
        next: personUrls.next,
        list: personList,
        hasMore: personUrls.next ? true : false,
        loaderMsg: 'Loading...',
      });
    }
    // console.log(next.page);

    loadUser();

    // eslint-disable-next-line
  }, [params.slug, user, personUrls, loading, personList]);

  const infiniteList = async () => {
    try {
      const res = await axios.instanceApi.get(
        `/persons/${params.slug}/?page=${next.page}`
      );
      // console.log(res.data);

      setNext({
        next: res.data.next,
        hasMore: res.data.next ? true : false,
        list: next.list.concat(res.data.results),
        page: ++next.page,
        loaderMsg: res.data.next ? 'Loading...' : 'Finish :)',
      });
      // console.log(next.page);
    } catch (error) {
      console.log(error);
    }
  };
  return loading ? (
    <Spinner />
  ) : (
    <div className='person'>
      <div className='person__img '>
        <img
          src='https://www.ganja2music.com/Image/Post/10.2020/Behnam%20Bani%20-%20Khoshhalam.jpg'
          alt=''
        />
      </div>
      <div className='person__info text-light mb-5'>
        <div className='my-2'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, in
          incidunt? At.
        </div>
        <div className='my-2'>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cupiditate
          suscipit accusamus vitae laboriosam perspiciatis labore cum modi
          officiis similique sapiente nesciunt non sint corrupti aliquid, error
          explicabo. Est, id magnam?
        </div>
      </div>
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
          {next.list &&
            next.list?.map((item, i) => {
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
      <h4 className='text-white mb-5 mt-3'>{next.loaderMsg}</h4>
    </div>
  );
};

export default Person;

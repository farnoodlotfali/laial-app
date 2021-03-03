import { useContext, useEffect, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import './AllPerson.css';
import authContext from './auth/authContext';
import axios from './axios/axios';
import appContext from './contexts/appContext';
import PersonItem from './PersonItem';
import LoadingIcon from './spinner/LoadingIcon';

const AllPerson = () => {
  const { allPersons, AllpersonsUrls } = useContext(appContext);
  const { user, loadUser } = useContext(authContext);
  let loadingRef = useRef();

  const [next, setNext] = useState({
    next: '',
    list: null,
    hasMore: false,
    page: 2,
    loaderMsg: '',
    loading: false,
  });
  // console.log(next);

  useEffect(() => {
    if (allPersons !== next.list) {
      setNext({
        ...next,
        next: AllpersonsUrls.next,
        list: allPersons,
        hasMore: AllpersonsUrls.next ? true : false,
        loading: false,
        loaderMsg: 'Loading...',
      });
    }
    loadUser();

    // if (next.loading === true) {
    //   console.log(4);
    //   loadingRef.current.classList.add('active');
    // } else {
    //   loadingRef.current.classList.remove('active');
    // }

    // eslint-disable-next-line
  }, [user, AllpersonsUrls, allPersons]);

  const infiniteList = () => {
    setNext({
      ...next,
      loading: true,
    });
    setTimeout(() => {
      axios.instanceApi
        .get(`/persons/?page=${next.page}`)
        .then((res) =>
          setNext({
            ...next,
            next: res.data.next,
            hasMore: res.data.next ? true : false,
            list: next.list.concat(res.data.results),
            loading: false,
            page: ++next.page,
            loaderMsg: res.data.next ? 'Loading...' : 'Finish :)',
          })
        )
        .catch((err) => console.log(err));
    }, 1200);

    // console.log(res.data);

    // console.log(next.page);
  };

  return (
    <div
      className='allPerson'
      style={{
        height: next.list === null || next.list.length === 0 ? '100vh' : '',
      }}
    >
      {next?.list && (
        <InfiniteScroll
          dataLength={next?.list?.length}
          next={() => infiniteList()}
          hasMore={next.hasMore}
        >
          {next.list &&
            next.list?.map((item, i) => {
              return (
                <div key={item.id} className='allPerson__item'>
                  <PersonItem
                    id={item.id}
                    name={item.name}
                    image={item.image}
                    slug={item.slug}
                  />
                </div>
              );
            })}
        </InfiniteScroll>
      )}
      <div
        className='loading-message'
        // ref={loadingRef}
        style={{
          opacity: next.loading ? '1' : '0',
          transform: next.loading && 'translate(-50%, 0px)',
        }}
      >
        <LoadingIcon color='#fff' />
        <span>در حال دریافت</span>
      </div>
      {/* <h4 className='text-white mb-5 mt-3'>{next.loaderMsg}</h4> */}
    </div>
  );
};

export default AllPerson;

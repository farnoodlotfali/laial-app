import { useContext, useEffect, useState } from "react";
import appContext from "./contexts/appContext";
import "./Person.css";
import defualtPhoto from "./assets/defualtPhoto.jpeg";
import Spinner from "./spinner/Spinner";
import RowItem from "./RowItem";
import { useParams } from "react-router";
import authContext from "./auth/authContext";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "./axios/axios";
import LoadingIcon from "./spinner/LoadingIcon";
import { Helmet } from "react-helmet";
const Person = () => {
  const {
    personList,
    getPerson,
    personkSlug,
    loading,
    personUrls,
  } = useContext(appContext);
  let params = useParams();

  const { user } = useContext(authContext);
  const [next, setNext] = useState({
    next: "",
    list: null,
    hasMore: false,
    page: 2,
    loading: false,
    loaderMsg: "",
  });
  useEffect(() => {
    if (personkSlug !== params.slug) {
      getPerson(params.slug);
    }
    if (personList !== next.list) {
      setNext({
        ...next,
        next: personUrls.next,
        loading: false,
        list: personList,
        hasMore: personUrls.next ? true : false,
        loaderMsg: "Loading...",
      });
    }
    // console.log(next.page);

    // loadUser();

    // eslint-disable-next-line
  }, [params.slug, user, personUrls, loading, personList]);

  const infiniteList = async () => {
    setNext({
      ...next,
      loading: true,
    });
    setTimeout(async () => {
      try {
        const res = await axios.simpleApi.get(
          `/persons/${params.slug}/?page=${next.page}`
        );
        // console.log(res.data);

        setNext({
          next: res.data.next,
          hasMore: res.data.next ? true : false,
          list: next.list.concat(res.data.results),
          page: ++next.page,
          loading: false,
          loaderMsg: res.data.next ? "Loading..." : "Finish :)",
        });
        // console.log(next.page);
      } catch (error) {
        console.log(error);
      }
    }, 1200);
  };
  console.log(next.next);
  return loading ? (
    <Spinner />
  ) : (
    <>
      <Helmet>
        <title>
          {personList?.[0]?.person?.[0]?.meta_title
            ? personList?.[0]?.person?.[0]?.meta_title
            : personList?.[0]?.person?.[0]?.name}
        </title>
        <meta
          name="title"
          content={
            personList?.[0]?.person?.[0]?.meta_title
              ? personList?.[0]?.person?.[0]?.meta_title
              : personList?.[0]?.person?.[0]?.name
          }
        />
        <meta
          name="description"
          content={personList?.[0]?.person?.[0]?.meta_description}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`      http:app.7negare.ir/${params.slug}`}
        />
        <meta
          property="og:title"
          content={
            personList?.[0]?.person?.[0]?.meta_title
              ? personList?.[0]?.person?.[0]?.meta_title
              : personList?.[0]?.person?.[0]?.name
          }
        />
        <meta
          property="og:description"
          content={personList?.[0]?.person?.[0]?.meta_description}
        />
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content={`      http:app.7negare.ir/${params?.slug}`}
        />
        <meta
          property="twitter:title"
          content={
            personList?.[0]?.person?.[0]?.meta_title
              ? personList?.[0]?.person?.[0]?.meta_title
              : personList?.[0]?.person?.[0]?.name
          }
        />
        <meta
          property="twitter:description"
          content={personList?.[0]?.person?.[0]?.meta_description}
        />
        {/* {dataSongPage['image'] && (
          <meta property='twitter:image' content={dataSongPage['image']} />
        )} */}
      </Helmet>
      <div className="person">
        {/* <div className='d-flex'>
        <div className='person__img '>
          <img
            src={
              personList?.[0]?.media[0]?.image !== null
                ? personList?.[0]?.media[0]?.image
                : personList?.[0]?.person[0]?.image.full_image_url !== null
                ? personList?.[0]?.person[0]?.image.full_image_url
                : defualtPhoto
            }
            alt='logo'
          />
        </div>
        <div className='person__info text-light mb-5'>
          <div className='my-2'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate,
            in incidunt? At.
          </div>
          <div className='my-2'>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cupiditate
            suscipit accusamus vitae laboriosam perspiciatis labore cum modi
            officiis similique sapiente nesciunt non sint corrupti aliquid,
            error explicabo. Est, id magnam?
          </div>
        </div>
      </div>
     */}
        <div className="person__infoAndImg py-4 d-flex justify-content-center align-items-center">
          <div className="card__person">
            <div className="circle__person">
              <div className="content__person">
                <h2>{personList?.[0]?.person?.[0]?.name}</h2>
                <p>{personList?.[0]?.person?.[0]?.description}</p>
              </div>
              <img
                src={
                  personList?.[0]?.media[0]?.image !== null
                    ? personList?.[0]?.media[0]?.image
                    : personList?.[0]?.person[0]?.image.full_image_url !== null
                    ? personList?.[0]?.person[0]?.image.full_image_url
                    : defualtPhoto
                }
                alt=""
              />
            </div>
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
                    context={next?.list}
                  />
                );
              })}
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
    </>
  );
};

export default Person;

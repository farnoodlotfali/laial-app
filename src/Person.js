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
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import { makeStyles } from "@material-ui/core/styles";
import { ExpandLess, ExpandMore } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  summaryRoot: {
    width: "100%",
    display: "flex",
    background: "black",
    color: "white",
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
    borderBottom: "1px solid lightgrey",
  },
  summaryContent: {
    justifyContent: "space-between",
  },
  detailsRoot: {
    background: "black",
    borderBottomLeftRadius: "10px",
    borderBottomRightRadius: "10px",
    color: "white",
    textAlign: "justify",
    direction: "rtl",
    fontSize: "12px",
    lineHeight: "30px",
    "@media (max-width: 768px)": {
      display: "grid",
    },
  },
}));

const Person = () => {
  const classes = useStyles();
  const { personList, getPerson, personkSlug, pageLoading, personUrls } =
    useContext(appContext);
  let params = useParams();
  const [readMore, setReadMore] = useState(false);
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
  }, [params.slug, user, personUrls, pageLoading, personList]);

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
  return pageLoading ? (
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
        <div className=" m-5 ">
          <Accordion onChange={(e, expanded) => setReadMore(expanded)}>
            <AccordionSummary
              classes={{
                root: classes.summaryRoot,
                content: classes.summaryContent,
              }}
              //  expandIcon={<span>hi</span>}
            >
              {readMore ? (
                <div className="">
                  <span className="person_expand">بستن </span>
                  <ExpandLess fontSize="small" />
                </div>
              ) : (
                <div className="">
                  <span className="person_expand">نمایش بیشتر</span>
                  <ExpandMore fontSize="small" />
                </div>
              )}

              <span>{personList?.[0]?.person?.[0]?.name}</span>
            </AccordionSummary>

            <AccordionDetails classes={{ root: classes.detailsRoot }}>
              <div className="d-flex justify-content-center">
                <div className="person_information_img_information">
                  <img
                    src={
                      personList?.[0]?.media[0]?.image !== null
                        ? personList?.[0]?.media[0]?.image
                        : personList?.[0]?.person[0]?.image.full_image_url !==
                          null
                        ? personList?.[0]?.person[0]?.image.full_image_url
                        : defualtPhoto
                    }
                    alt="logo"
                  />
                </div>
              </div>
              <div>{personList?.[0]?.person?.[0]?.description}</div>
            </AccordionDetails>
          </Accordion>

          {/* <div className="person_information_img_information text-white mr-4 text-justify dir-rtl">
            <h5>{personList?.[0]?.person?.[0]?.name}</h5>
            <p
              className={`person_information_img_information_content ${
                !readMore ? "collapsed" : "expanded"
              }`}
            >
              {personList?.[0]?.person?.[0]?.description}
            </p>
            <span
              className="person_information_img_information_content_btn"
              onClick={() => setReadMore(!readMore)}
            >
              {!readMore ? "نمایش بیشتر" : "نمایش کمتر"}
            </span>
          </div>
          <div className="">
            <div className="person_information_img__img ">
              <img
                src={
                  personList?.[0]?.media[0]?.image !== null
                    ? personList?.[0]?.media[0]?.image
                    : personList?.[0]?.person[0]?.image.full_image_url !== null
                    ? personList?.[0]?.person[0]?.image.full_image_url
                    : defualtPhoto
                }
                alt="logo"
              />
            </div>
          </div>
       */}
        </div>

        {/* <div className="person__infoAndImg py-4 d-flex justify-content-center align-items-center">
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
        </div> */}

        <div className="person__infiniteScroll__section">
          {next?.list && (
            <InfiniteScroll
              dataLength={next?.list?.length}
              next={infiniteList}
              hasMore={next.hasMore}
            >
              {next.list &&
                next.list?.map((item, i) => {
                  return (
                    <RowItem
                      key={item.id}
                      postId={item.id}
                      isRow={true}
                      logo={item.image}
                      media={item.media[0]}
                      person={item.person}
                      slug={item.slug}
                      context={next?.list}
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
          style={{
            opacity: next.loading ? "1" : "0",
            transform: next.loading && "translate(-50%, -150%)",
          }}
        >
          <LoadingIcon color="#fff" />
          <span>در حال دریافت</span>
        </div>
      </div>
    </>
  );
};

export default Person;

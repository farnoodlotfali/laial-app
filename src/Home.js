import { Fragment, useContext, useEffect } from "react";
import Banner from "./Banner";
import RowList from "./RowList";
import "./Home.css";
import TileBanner from "./TileBanner";
import appContext from "./contexts/appContext";
import Spinner from "./spinner/Spinner";
import { useHistory, useParams } from "react-router";
const Home = () => {
  const { pageLoading, getHome, home, homeMeta, showMusic, homeSlug } =
    useContext(appContext);

  const { slug } = useParams();
  const history = useHistory();

  useEffect(() => {
    if (homeSlug !== slug) {
      getHome(slug);
    }
    if (home === undefined) {
      history.push("/not_found");
    }
    // eslint-disable-next-line
  }, [slug]);
  // console.log(home);

  return (
    <>
      {/* <Helmet>
        <title>
          {homeMeta?.meta_title ? homeMeta?.meta_title : homeMeta?.name}
        </title>
        <meta
          name="title"
          content={homeMeta?.meta_title ? homeMeta?.meta_title : homeMeta?.name}
        />
        <meta name="description" content={homeMeta?.meta_description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={homeMeta?.slug} />
        <meta
          property="og:title"
          content={homeMeta?.meta_title ? homeMeta?.meta_title : homeMeta?.name}
        />
        <meta property="og:description" content={homeMeta?.meta_description} />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="http:app.7negare.ir/" />
        <meta
          property="twitter:title"
          content={homeMeta?.meta_title ? homeMeta?.meta_title : homeMeta?.name}
        />
        <meta
          property="twitter:description"
          content={homeMeta?.meta_description}
        />
      </Helmet> */}

      <Fragment>
        {pageLoading ? (
          <Spinner />
        ) : (
          homeMeta?.description && (
            <div
              className="text-white mx-4"
              dangerouslySetInnerHTML={{ __html: `${homeMeta?.description}` }}
            />
          )
        )}
      </Fragment>

      <Fragment>
        {pageLoading ? (
          <Spinner />
        ) : (
          home && (
            <div
              className={`home ${
                showMusic ? "AddPaddingHome" : "normalPaddingHome"
              }`}
            >
              {home?.map((data, i) =>
                data.banner !== null ? (
                  data.banner.banner_type === "big" ? (
                    <Banner key={i} imgs={data.banner.images} />
                  ) : (
                    <TileBanner key={i} imgs={data.banner.images} />
                  )
                ) : (
                  <RowList
                    key={i}
                    slug={data.slug}
                    id={data.id}
                    title={data.name}
                    data={data.data}
                  />
                )
              )}
            </div>
          )
        )}
      </Fragment>
    </>
  );
};

export default Home;

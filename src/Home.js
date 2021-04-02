import { Fragment, useContext, useEffect } from "react";
import Banner from "./Banner";
import RowList from "./RowList";
import "./Home.css";
import TileBanner from "./TileBanner";
import appContext from "./contexts/appContext";
import Spinner from "./spinner/Spinner";
import authContext from "./auth/authContext";
import { Helmet } from "react-helmet";

const Home = () => {
  const { loading, getHome, home, homeMeta } = useContext(appContext);
  const { user, loadUser } = useContext(authContext);

  // let params = useParams();
  // let his = useHistory();
  // console.log(params.slug);
  useEffect(() => {
    if (home === null) {
      getHome();
    }
    // console.log(homeMeta);
    loadUser();
    // eslint-disable-next-line
  }, [home, user, homeMeta]);

  return (
    <>
      <Helmet>
        <title>{homeMeta?.meta_title}</title>
        <meta name="title" content={homeMeta?.meta_title} />
        <meta name="description" content={homeMeta?.meta_description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={homeMeta?.slug} />
        <meta property="og:title" content={homeMeta?.meta_title} />
        <meta property="og:description" content={homeMeta?.meta_description} />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="http:app.7negare.ir/" />
        <meta property="twitter:title" content={homeMeta?.meta_title} />
        <meta
          property="twitter:description"
          content={homeMeta?.meta_description}
        />
        {/* {homeMeta['image'] && (
          <meta property='twitter:image' content={homeMeta['image']} />
        )} */}
      </Helmet>

      <Fragment>
        {loading ? (
          <Spinner />
        ) : (
          home !== null && (
            <div className="home">
              {home.map((data, i) =>
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

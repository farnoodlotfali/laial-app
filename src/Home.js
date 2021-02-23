import { Fragment, useContext, useEffect } from 'react';
import Banner from './Banner';
import RowList from './RowList';
import './Home.css';
import TileBanner from './TileBanner';
import appContext from './contexts/appContext';
import Spinner from './spinner/Spinner';
import authContext from './auth/authContext';

const Home = () => {
  const { loading, getHome, home } = useContext(appContext);
  const { user, loadUser, tokenAccess } = useContext(authContext);

  // let params = useParams();
  // let his = useHistory();
  // console.log(params.slug);
  useEffect(() => {
    if (home === null) {
      getHome();
    }

    loadUser();
    // eslint-disable-next-line
  }, [home, user]);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        home !== null && (
          <div className='home'>
            {home.map((data, i) =>
              data.banner !== null ? (
                data.banner.banner_type === 'big' ? (
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
  );
};

export default Home;

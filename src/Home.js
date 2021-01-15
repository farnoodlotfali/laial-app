import axios from './axios/axios';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import Banner from './Banner';
import RowList from './RowList';
import './Home.css';
import TileBanner from './TileBanner';
import Footer from './Footer';
import appContext from './contexts/appContext';
import Spinner from './spinner/Spinner';
import { useHistory, useParams } from 'react-router';

const Home = () => {
  const { slug, removeAndSetLoading, loading, getHome, home } = useContext(
    appContext
  );
  let params = useParams();
  // let his = useHistory();
  // console.log(params.slug);
  useEffect(() => {
    getHome();
    // eslint-disable-next-line
  }, []);

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

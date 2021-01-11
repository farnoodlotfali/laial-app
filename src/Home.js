import axios from './axios/axios';
import React, { useContext, useEffect, useState } from 'react';
import Banner from './Banner';
import RowList from './RowList';
import './Home.css';
import TileBanner from './TileBanner';
import Footer from './Footer';
import appContext from './contexts/appContext';

const Home = (x = 'home') => {
  const slug = useContext(appContext);
  // console.log(x);
  // eslint-disable-next-line
  const [state, setstate] = useState(null);
  // console.log(slug);
  const [didMount, setDidMount] = useState(false);
  useEffect(() => {
    setDidMount(true);
    const getHome = async () => {
      try {
        const res = await axios.get(`page/${slug.slug}`);
        setstate(res.data.data[0].block);

        console.log(res.data.data[0].block);
      } catch (error) {
        console.log(error);
      }
    };

    getHome();
    return () => setDidMount(false);
  }, [state, slug.slug]);
  if (!didMount) {
    return null;
  }

  return (
    <div className='home'>
      {state !== null &&
        state.map((data, i) =>
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

      {/* <Banner />
     
        <RowList title={'عمو پورنگ '} />
        <RowList title={'محمد حسین شریفی'} />
        <RowList title={'استقلال قهرمان'} />
      </div> */}
    </div>
  );
};

export default Home;

import axios from './axios/axios';
import React, { useEffect, useState } from 'react';
import Banner from './Banner';
import RowList from './RowList';
import './Home.css';
import TileBanner from './TileBanner';

const Home = () => {
  // eslint-disable-next-line
  const [state, setstate] = useState(null);
  const [didMount, setDidMount] = useState(false);
  useEffect(() => {
    setDidMount(true);
    const getHome = async () => {
      try {
        const res = await axios.get('page/home');
        setstate(res.data.data[0].block);

        console.log(res.data.data[0].block);
      } catch (error) {
        console.log(error);
      }
    };

    getHome();
    return () => setDidMount(false);
  }, [state]);
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

      {/* <Footer /> */}
    </div>
  );
};

export default Home;

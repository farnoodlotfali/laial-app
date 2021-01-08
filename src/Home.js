import axios from './axios/axios';
import React, { useEffect, useState } from 'react';
import Banner from './Banner';
import RowList from './RowList';
import './Home.css';

const Home = () => {
  // eslint-disable-next-line
  const [state, setstate] = useState(null);
  useEffect(() => {
    let isMounted = true;
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
    return () => {
      isMounted = false;
    };
  }, [state]);

  return (
    <div className='home'>
      {state &&
        state.map((data, i) =>
          data.banner !== null ? (
            <Banner
              key={i}
              imgs={data.banner.images}
              type={data.banner.banner_type}
            />
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

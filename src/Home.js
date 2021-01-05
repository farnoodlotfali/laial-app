import axios from './axios/axios';
import React, { Fragment, useEffect, useState } from 'react';
import Banner from './Banner';
import RowList from './RowList';
import './Home.css';

const Home = () => {
  const [state, setstate] = useState(null);
  useEffect(() => {
    let isMounted = true;
    const getHome = async () => {
      try {
        const res = await axios.get('page/home');
        setstate(res.data.data[0].block);
        // console.log(
        //   res.data.data[0].block.map((data) => {
        //     if (data.bann) {
        //     }
        // console.log(res.data.data[0].block);
        //   })
        // );
      } catch (error) {
        console.log(error);
      }
    };

    getHome();
    return () => {
      isMounted = false;
    };
  }, []);
  return (
    <div className='home'>
      {/* {state &&
        state.map(
          (data, i) =>
            data.banner !== null ? (
         
              <Banner key={data.banner.id} img={data.banner.img} />
            ) : (
              <></>
            )
       
        )} */}
      <Banner />
      <div className='rowlists'>
        <RowList title={'عمو پورنگ '} />
        <RowList title={'محمد حسین شریفی'} />
        <RowList title={'استقلال قهرمان'} />
      </div>
    </div>
  );
};

export default Home;

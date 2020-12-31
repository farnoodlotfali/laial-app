import React, { Fragment } from 'react';
import Banner from './Banner';
import RowList from './RowList';

const Home = () => {
  return (
    <Fragment>
      <Banner />
      <div className='rowlists'>
        <RowList title={'عمو پورنگ '} />
        <RowList title={'محمد حسین شریفی'} />
        <RowList title={'استقلال قهرمان'} />
      </div>
    </Fragment>
  );
};

export default Home;

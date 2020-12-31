import React from 'react';
import RowItem from './RowItem';
import Flickity from 'react-flickity-component';
import './RowList.css';
// import logo from './assets/1.jpg';
import logo1 from './assets/0.jpg';
// import logo2 from './assets/5.jpg';
// import logo3 from './assets/6.jpg';
// import logo4 from './assets/7.jpg';
// import logo5 from './assets/8.jpg';
// import logo6 from './assets/9.jpg';
// import logo7 from './assets/10.jpg';
// import logo8 from './assets/11.jpg';
import logo9 from './assets/a.jpg';
import logo10 from './assets/b.jpg';

const RowList = ({ title }) => {
  const flickityOptions = {
    // initialIndex: 2,
    contain: true,
    prevNextButtons: false,
    pageDots: false,
    rightToLeft: true,
  };
  return (
    <div className='rowList mb-3 mt-5'>
      <div className='rowList__title d-flex'>
        <h3 className=' text-light  mr-3'>{title}</h3>
      </div>

      <Flickity className='carousel col px-2 py-0' options={flickityOptions}>
        <RowItem logo={logo9} />
        <RowItem logo={logo10} />
        <RowItem logo={logo1} />
        <RowItem logo={logo1} />
        <RowItem logo={logo1} />
        <RowItem logo={logo1} />
        <RowItem logo={logo1} />
        <RowItem logo={logo1} />
        <RowItem logo={logo1} />
        <RowItem logo={logo1} />
        <RowItem logo={logo1} />
        <RowItem logo={logo1} />
        <RowItem logo={logo1} />
      </Flickity>
    </div>
  );
};

export default RowList;

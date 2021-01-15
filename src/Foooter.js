import React from 'react';
import './Foooter.css';
import logo from './assets/10.jpg';
import logo1 from './assets/9.jpg';
const Foooter = () => {
  return (
    <div className='foooter text-light d-flex justify-content-between px-2'>
      <div className='foooter__left'>
        <span> React : Farnoood</span>
        <img className='foooter__left__img' src={logo} alt='' />
      </div>
      <div className='foooter__right'>
        <span> Django : MH Sharifi</span>
        <img className='foooter__right__img' src={logo1} alt='' />
      </div>
    </div>
  );
};

export default Foooter;

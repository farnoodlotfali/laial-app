import React, { useContext } from 'react';
import './Foooter.css';
import logo from './assets/10.jpg';
import logo1 from './assets/9.jpg';
import appContext from './contexts/appContext';
const Foooter = () => {
  const { loading } = useContext(appContext);
  return (
    <div className='bg-black block pb-3'></div>
    // <div
    //   className='foooter text-light d-flex justify-content-between px-2'
    //   style={{ position: loading ? 'fixed' : 'relative' }}
    // >
    //   <div className='foooter__left'>
    //     <span> React : Farnoood</span>
    //     {/* <img className='foooter__left__img' src={logo} alt='' /> */}
    //   </div>
    //   <div className='foooter__right'>
    //     <span> Django : MH Sharifi</span>
    //     {/* <img className='foooter__right__img' src={logo1} alt='' /> */}
    //   </div>
    // </div>
  );
};

export default Foooter;

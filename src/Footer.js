import React from 'react';
import logo from './assets/and.jpg';
import logo1 from './assets/bazar.jpg';
import './Footer.css';
import PhoneMenu from './PhoneMenu';

const Footer = () => {
  return (
    <div className='footer py-3 px-3 d-flex text-light '>
      <div className='footer__images'>
        <img className='ml-2' src={logo1} alt='' />
        <img className='ml-2' src={logo} alt='' />
        <span className='ml-2'> !اپلیکیشن لیال را امروز نصب کن</span>
      </div>
      <div className='footer__info d-flex'>
        <img src={logo1} alt='' />
        <span className='ml-2 align-self-center'>کاری از تیم </span>
      </div>
    </div>
  );
};

export default Footer;

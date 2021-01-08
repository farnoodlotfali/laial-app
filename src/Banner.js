import React from 'react';
// eslint-disable-next-line
import logo from './assets/1.jpg';
// eslint-disable-next-line
import logo1 from './assets/3.jpg';
import Flickity from 'react-flickity-component';
import './Banner.css';

import 'flickity-fade';
const Banner = ({ imgs, type }) => {
  const flickityOptions = {
    contain: true,
    prevNextButtons: true,
    pageDots: false,
    // rightToLeft: true,
    autoPlay: 3000,
    pauseAutoPlayOnHover: false,
    fade: true,
    wrapAround: true,
  };
  // console.log(type === 'big');
  return (
    <div className='banner'>
      <Flickity className='carousel ' options={flickityOptions}>
        {imgs.map((img, i) => (
          // console.log(img.src),
          <div key={i} className='carousel-cell'>
            <img className='carousel-cell-image' src={img.src} alt='' />
          </div>
        ))}
      </Flickity>
    </div>
  );
};

export default Banner;

{
  /* <div className='carousel-cell'>
          <img
            className='carousel-cell-image'
            src='https://picsum.photos/640/640/?image=822'
            alt=''
          />
        </div>{' '}
        <div className='carousel-cell'>
          <img
            className='carousel-cell-image'
            src='https://picsum.photos/640/640/?image=821'
            alt=''
          />
        </div>{' '}
        <div className='carousel-cell'>
          <img
            className='carousel-cell-image'
            src='https://picsum.photos/640/640/?image=825'
            alt=''
          />
        </div>{' '}
        <div className='carousel-cell'>
          <img
            className='carousel-cell-image'
            src='https://picsum.photos/640/640/?image=826'
            alt=''
          />
        </div>{' '}
        <div className='carousel-cell'>
          <img
            className='carousel-cell-image'
            src='https://picsum.photos/640/640/?image=827'
            alt=''
          />
        </div>{' '}
        <div className='carousel-cell'>
          <img
            className='carousel-cell-image'
            src='https://picsum.photos/640/640/?image=828'
            alt=''
          />
        </div>{' '}
        <div className='carousel-cell'>
          <img
            className='carousel-cell-image'
            src='https://picsum.photos/640/640/?image=829'
            alt=''
          />
        </div>{' '}
        <div className='carousel-cell'>
          <img
            className='carousel-cell-image'
            src='https://picsum.photos/640/640/?image=820'
            alt=''
          />
        </div>{' '}
        <div className='carousel-cell'>
          <img
            className='carousel-cell-image'
            src='https://picsum.photos/640/640/?image=824'
            alt=''
          />
        </div> */
}

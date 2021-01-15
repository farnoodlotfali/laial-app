import React from 'react';
// eslint-disable-next-line
import logo from './assets/1.jpg';
// eslint-disable-next-line
import logo1 from './assets/3.jpg';
import Flickity from 'react-flickity-component';
import './Banner.css';

import 'flickity-fade';
const Banner = ({ imgs }) => {
  const flickityOptions = {
    contain: true,
    prevNextButtons: false,
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

import React from 'react';
// eslint-disable-next-line
import logo from './assets/1.jpg';
// eslint-disable-next-line
import logo1 from './assets/3.jpg';
import Flickity from 'react-flickity-component';
import './Banner.css';

import 'flickity-fade';
// autoPlay={false}
const Banner = () => {
  const flickityOptions = {
    contain: true,
    prevNextButtons: false,
    pageDots: false,
    // rightToLeft: true,
    autoPlay: true,
    pauseAutoPlayOnHover: false,
    fade: true,
    wrapAround: true,
  };
  return (
    <div className='banner'>
      <Flickity className='carousel ' options={flickityOptions}>
        <div className='carousel-cell'>
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
        </div>
      </Flickity>
    </div>
  );
};

// material carosoul

// <div className='banner'>
//       <div
//         indicators={false}
//         interval={3000}
//         navButtonsAlwaysInvisible={true}
//         //   animation={'slide'}
//       >
//         {imgs.map((img, i) => (
//           <Item className='item' key={i} logo={img} />
//         ))}
//       </div>
//     </div>

// end

// const Banner = () => {
//   return (
//     <Fragment>
//       <div className='row '>
//         <div className='  '>
//           <Carousel
//             style={{ display: 'contents' }}
//             controls={false}
//             indicators={false}
//             slide={false}
//             fade={true}
//           >
//             <Carousel.Item>
//               <img
//                 className='img-fluid'
//                 style={{ width: '1551px', height: ' 300px' }}
//                 src={logo}
//                 alt='First slide'
//               />
//               <Carousel.Caption>
//                 <h3>First slide label</h3>
//                 <p>
//                   Nulla vitae elit libero, a pharetra augue mollis interdum.
//                 </p>
//               </Carousel.Caption>
//             </Carousel.Item>
//             <Carousel.Item>
//               <img
//                 className='img-fluid'
//                 style={{ width: '1551px', height: ' 300px' }}
//                 src={logo1}
//                 alt='First slide'
//               />
//               <Carousel.Caption>
//                 <h3>second slide label</h3>
//                 <p>
//                   Nulla vitae elit libero, a pharetra augue mollis interdum.
//                 </p>
//               </Carousel.Caption>
//             </Carousel.Item>
//           </Carousel>
//         </div>
//       </div>
//     </Fragment>
//   );
// };

export default Banner;

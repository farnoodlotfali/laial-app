// import Flickity from "react-flickity-component";
import "./Banner.css";

// require("flickity-fade");
import styles from "./styles/Banner.module.css";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, EffectFade, Lazy } from "swiper";
import { useState } from "react";
const Banner = ({ imgs }) => {
  // const flickityOptions = {
  //   contain: true,
  //   prevNextButtons: false,
  //   pageDots: false,
  //   // rightToLeft: true,
  //   autoPlay: 3000,
  //   pauseAutoPlayOnHover: false,
  //   fade: true,
  //   wrapAround: true,
  // };
  SwiperCore.use([Autoplay, EffectFade, Lazy]);
  // console.log(imgs);
  const [state, setstate] = useState(null);
  return (
    <Swiper
      className={styles.bannerslider}
      fadeEffect={{ crossFade: true }}
      loop={true}
      speed={2000}
      onSwiper={(swiper) => setstate(swiper)}
      autoplay={{
        delay: 3000,
        disableOnInteraction: true,
      }}
      lazy={true}
      effect={"fade"}
    >
      {imgs.map((img, i) => (
        <SwiperSlide
          key={i}
          className="swiper-slide"
          onMouseEnter={() => state.autoplay.stop()}
          onMouseLeave={() => state.autoplay.start()}
        >
          <img
            className="swiper-lazy"
            style={{ width: "100%", height: "100%" }}
            data-src={img.src}
            alt="bannerImage"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
  // console.log(type === 'big');
  // return (
  //   <div className="banner">
  //     <Flickity className="carousel " options={flickityOptions}>
  //       {imgs.map((img, i) => (
  //         // console.log(img.src),
  //         <div key={i} className="carousel-cell">
  //           <img className="carousel-cell-image" src={img.src} alt="" />
  //         </div>
  //       ))}
  //     </Flickity>
  //   </div>
  // );
};

// return (
//   <div className='banner'>
//     <Flickity className='carousel ' options={flickityOptions}>
//       {imgs.map((img, i) => (
//         // console.log(img.src),
//         <div key={i} className='carousel-cell'>
//           <img className='carousel-cell-image' src={img.src} alt='' />
//         </div>
//       ))}
//     </Flickity>
//   </div>
// );

export default Banner;

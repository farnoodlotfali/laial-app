import Flickity from "react-flickity-component";
import "./Banner.css";

// require("flickity-fade");
import styles from "./styles/Banner.module.css";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, EffectFade } from "swiper";
import { useState } from "react";
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
  SwiperCore.use([Autoplay, EffectFade]);
  // console.log(imgs);
  const [state, setstate] = useState(null);
  return (
    <Swiper
      className={styles.bannerslider}
      fadeEffect={{ crossFade: true }}
      loop={true}
      onSwiper={(swiper) => setstate(swiper)}
      autoplay={{
        delay: 3000,
        disableOnInteraction: true,
      }}
      effect="fade"
      //   onSlideChange={() => console.log('slide change')}
      //   onSwiper={(swiper) => console.log(swiper)}
    >
      {imgs.map((img, i) => (
        <SwiperSlide
          key={i}
          onMouseEnter={() => state.autoplay.stop()}
          onMouseLeave={() => state.autoplay.start()}
        >
          <img
            style={{ width: "100%", height: "100%" }}
            src={img.src}
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

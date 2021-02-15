import Flickity from 'react-flickity-component';
import './TileBanner.css';
import logo from './assets/0.jpg';
const TileBanner = ({ imgs }) => {
  const flickityOptions = {
    // initialIndex: 2,
    contain: true,
    prevNextButtons: false,
    pageDots: false,
    rightToLeft: true,
  };
  //   console.log(imgs);
  return (
    <div className='tileBanner'>
      <Flickity className='carousel ' options={flickityOptions}>
        {imgs.map((img, i) => (
          // console.log(img.src),
          <div key={i} className='carousel-cell'>
            <img className='carousel-cell-image' src={logo} alt='logo' />
          </div>
        ))}
      </Flickity>
    </div>
  );
};

export default TileBanner;

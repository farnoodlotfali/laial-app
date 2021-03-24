import { ChevronLeft } from "@material-ui/icons";
import Flickity from "react-flickity-component";
import "./TileBanner.css";
const TileBanner = ({ imgs }) => {
  const flickityOptions = {
    // initialIndex: 2,
    contain: true,
    prevNextButtons: false,
    pageDots: false,
    rightToLeft: true,
  };
  // console.log(imgs);
  return (
    <div className="tileBanner">
      <Flickity className="carousel " options={flickityOptions}>
        {imgs.map((img, i) => (
          // console.log(img.src),
          <div key={i} className="carousel-cell">
            <img
              className="carousel-cell-image"
              src={img?.full_image_url}
              alt="logo"
            />
            {/* <div className='tileBanner__box'> */}
            <div className="tileBanner__show">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              نمایش بیشتر
            </div>
            {/* </div> */}
          </div>
        ))}
      </Flickity>
    </div>
  );
};

export default TileBanner;

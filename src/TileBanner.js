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
              alt=""
            />
            {/* <div className='tileBanner__box'> */}
            {img.url && (
              <div className="tileBanner__show">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <a href={`${img.url}`}>نمایش </a>
              </div>
            )}

            {/* </div> */}
          </div>
        ))}
      </Flickity>
    </div>
  );
};

export default TileBanner;

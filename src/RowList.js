import React, { useContext } from 'react';
import RowItem from './RowItem';
import Flickity from 'react-flickity-component';
import './RowList.css';
// import logo from './assets/1.jpg';
import logo1 from './assets/0.jpg';
// import logo2 from './assets/5.jpg';
// import logo3 from './assets/6.jpg';
// import logo4 from './assets/7.jpg';
// import logo5 from './assets/8.jpg';
// import logo6 from './assets/9.jpg';
// import logo7 from './assets/10.jpg';
// import logo8 from './assets/11.jpg';
import logo9 from './assets/a.jpg';
import logo10 from './assets/b.jpg';
import { Link } from 'react-router-dom';
import appContext from './contexts/appContext';

const RowList = ({ id, title, slug = '1', data }) => {
  const flickityOptions = {
    // initialIndex: 2,
    contain: true,
    prevNextButtons: false,
    pageDots: false,
    rightToLeft: true,
  };
  const { ChangeListNameAndPlayListOnMoreSong } = useContext(appContext);
  const { context, count, pageinate } = data;
  // console.log(context);
  return (
    <div className={`rowList mb-3 mt-5 `}>
      <div className={`rowList__title d-flex ${id === 1 ? 'top__radius' : ''}`}>
        <div className=' text-light title mr-3'>{title}</div>
        <div
          className='d-flex  align-items-center '
          onClick={() => ChangeListNameAndPlayListOnMoreSong(title, context)}
        >
          {pageinate === true ? (
            <Link
              to={`/list/${slug}`}
              className=' text-light moreSong mr-5   ml-3'
            >
              نمایش بیشتر
            </Link>
          ) : (
            ''
          )}
        </div>
      </div>

      <Flickity className='carousel col px-2 py-0' options={flickityOptions}>
        {context.map((item) => (
          <RowItem
            key={item.id}
            logo={item.image}
            media={item.media[0]}
            person={item.person}
            slug={item.slug}
          />
        ))}
      </Flickity>
    </div>
  );
};

export default RowList;

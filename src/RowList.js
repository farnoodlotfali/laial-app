import React, { useContext } from 'react';
import RowItem from './RowItem';
import Flickity from 'react-flickity-component';
import './RowList.css';
import { Link } from 'react-router-dom';
import appContext from './contexts/appContext';

const RowList = ({ id, title, slug = '', data }) => {
  const flickityOptions = {
    // initialIndex: 2,
    contain: true,
    prevNextButtons: false,
    pageDots: false,
    rightToLeft: true,
  };
  const { context, count, pageinate } = data;
  // console.log(context);
  return (
    <div className={`rowList mb-3 mt-5 `}>
      <div className={`rowList__title d-flex ${id === 1 ? 'top__radius' : ''}`}>
        <div className=' text-light title mr-3'>{title}</div>
        <div className='d-flex  align-items-center '>
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
        {context.map((item, i) => {
          return (
            <RowItem
              key={item.id}
              logo={item.image}
              media={item.media[0]}
              person={item.person}
              slug={item.slug}
            />
          );
        })}
      </Flickity>
    </div>
  );
};

export default RowList;

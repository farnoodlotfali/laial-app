import React from 'react';
import RowItem from './RowItem';
import Flickity from 'react-flickity-component';
import './RowList.css';
import { Link } from 'react-router-dom';
import { ChevronLeftRounded } from '@material-ui/icons';

const RowList = ({ id, title, slug = '', data }) => {
  const flickityOptions = {
    // initialIndex: 2,
    contain: true,
    prevNextButtons: false,
    pageDots: false,
    rightToLeft: true,
  };
  const { context, pageinate } = data;
  // console.log(context);
  return (
    <div className={`rowList mb-3 mt-5 `}>
      <div className={`rowList__title d-flex ${id === 1 ? 'top__radius' : ''}`}>
        <Link
          to={`/list/${slug}`}
          className=' text-light moreSong  d-flex   ml-3'
        >
          <div className=' text-light title mr-3'>{title}</div>
        </Link>
        <div className='d-flex  align-items-center '>
          {pageinate === true ? (
            <Link
              to={`/list/${slug}`}
              className=' text-light moreSong mr-5 d-flex   ml-3'
            >
              نمایش همه <ChevronLeftRounded className='align-self-center' />
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
              context={context}
            />
          );
        })}
      </Flickity>
    </div>
  );
};

export default RowList;

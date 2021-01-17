import React, { useEffect } from 'react';
import './MoreSong.css';
import RowItem from './RowItem';
import appContext from './contexts/appContext';
import { useContext } from 'react';
import Spinner from './spinner/Spinner';
import { useParams } from 'react-router';

const MoreSong = () => {
  const { BlockListName, loading, getBlock, block } = useContext(appContext);
  // console.log(props.location.pathname);
  let params = useParams();
  // console.log(params);

  useEffect(() => {
    getBlock(params.slug);
    // eslint-disable-next-line
  }, []);

  return loading ? (
    <Spinner />
  ) : (
    <div className='moreSong pb-3 pt-5'>
      <div className='moreSong__title text-light'>
        <h3> {BlockListName}</h3>
      </div>
      <div className='moreSong__items mt-5'>
        {block !== null &&
          block.map((item) => (
            <RowItem
              key={item.id}
              logo={item.image}
              media={item.media[0]}
              person={item.person}
              slug={item.slug}
            />
          ))}
      </div>
    </div>
  );
};

export default MoreSong;

import React from 'react';
import './MoreSong.css';
import logo1 from './assets/0.jpg';
import RowItem from './RowItem';
import appContext from './contexts/appContext';
import { useContext } from 'react';

const MoreSong = () => {
  const { listName, playlistOnMoreSong } = useContext(appContext);

  return (
    <div className='moreSong pb-3 pt-5'>
      <div className='moreSong__title text-light'>
        <h3> {listName}</h3>
      </div>
      <div className='moreSong__items mt-5'>
        {playlistOnMoreSong.map((item) => (
          <RowItem
            key={item.id}
            logo={item.image}
            media={item.media}
            person={item.person}
            slug={item.slug}
          />
        ))}
      </div>
    </div>
  );
};

export default MoreSong;

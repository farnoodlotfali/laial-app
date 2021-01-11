import React, { useEffect, useState } from 'react';
import './MoreSong.css';
import logo1 from './assets/0.jpg';
import RowItem from './RowItem';
import appContext from './contexts/appContext';
import { useContext } from 'react';
import axios from './axios/axios';

const MoreSong = () => {
  const { listName } = useContext(appContext);
  // console.log(listName.slug);

  const [didMount, setDidMount] = useState(false);
  const [state, setstate] = useState(null);

  useEffect(() => {
    setDidMount(true);
    const getBlock = async () => {
      try {
        const res = await axios.get(`block/${listName.slug}`);
        setstate(res.data.results);

        // console.log(res.data.results);
      } catch (error) {
        console.log(error);
      }
    };

    getBlock();
    return () => setDidMount(false);
  }, [state]);
  if (!didMount) {
    return null;
  }
  return (
    <div className='moreSong pb-3 pt-5'>
      <div className='moreSong__title text-light'>
        <h3> {listName.name}</h3>
      </div>
      <div className='moreSong__items mt-5'>
        {state &&
          state.map((item) => (
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

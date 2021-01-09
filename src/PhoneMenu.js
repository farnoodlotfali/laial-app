import { Headset, Home, MusicNote, Search } from '@material-ui/icons';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import appContext from './contexts/appContext';
import './PhoneMenu.css';
const PhoneMenu = () => {
  const { ChangeshowCenter, ChangeShowMusic } = useContext(appContext);
  const [state, setstate] = useState(1);

  return (
    <div className='phoneMenu'>
      <div className='phoneMenu__items d-flex justify-content-around py-2 '>
        <div
          className={`phoneMenu__item ${state === 1 ? 'active' : ''}`}
          onClick={() => setstate(1)}
        >
          <Link to='/'>
            <Home fontSize='large' />
            <span> خانه </span>
          </Link>
        </div>
        <div
          className={`phoneMenu__item ${state === 0 ? 'active' : ''}`}
          onClick={() => setstate(0)}
        >
          <Link to='/search'>
            <Search fontSize='large' />
            <span>جستجو</span>
          </Link>
        </div>
        <div className='phoneMenu__item' onClick={ChangeshowCenter}>
          <Headset fontSize='large' />
          <span>لیست من</span>
        </div>{' '}
        <div className='phoneMenu__item' onClick={ChangeShowMusic}>
          <MusicNote fontSize='large' />
          <span>آهنگ</span>
        </div>
      </div>
    </div>
  );
};

export default PhoneMenu;

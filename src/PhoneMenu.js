import {
  Headset,
  Home,
  MenuRounded,
  MusicNote,
  Search,
} from '@material-ui/icons';
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import appContext from './contexts/appContext';
import './PhoneMenu.css';
import playerContext from './player/playerContext';
const PhoneMenu = () => {
  const { ChangeshowCenter, ChangeShowMusic, showx, x } = useContext(
    appContext
  );
  const {
    showMusicBarOnMoblieRatio,
    setShowMusicBarOnMoblieRatio,
  } = useContext(playerContext);
  const showMusic = () => {
    if (showMusicBarOnMoblieRatio) {
      setShowMusicBarOnMoblieRatio();
    }
    ChangeShowMusic();
  };

  return (
    <div className='phoneMenu'>
      <div className='phoneMenu__items d-flex justify-content-around py-2 '>
        <div className={`phoneMenu__item`} onClick={() => showx(true)}>
          <MenuRounded fontSize='large' />
          {/* <span> منو </span> */}
        </div>
        <div className={`phoneMenu__item`}>
          <NavLink activeClassName='selected' exact to='/'>
            <Home fontSize='large' />
            {/* <span> خانه </span> */}
          </NavLink>
        </div>
        <div className={`phoneMenu__item }`}>
          <NavLink activeClassName='selected' exact to='/search'>
            <Search fontSize='large' />
            {/* <span>جستجو</span> */}
          </NavLink>
        </div>
        <div className='phoneMenu__item' onClick={ChangeshowCenter}>
          <Headset fontSize='large' />
          {/* <span>لیست من</span> */}
        </div>{' '}
        <div className='phoneMenu__item' onClick={() => showMusic()}>
          <MusicNote fontSize='large' />
          {/* <span>آهنگ</span> */}
        </div>
      </div>
    </div>
  );
};

export default PhoneMenu;

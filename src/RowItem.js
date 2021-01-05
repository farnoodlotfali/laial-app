import { Info, PlayCircleFilled, PlaylistAdd } from '@material-ui/icons';
import React, { useContext, useState } from 'react';
import { Badge } from 'react-bootstrap';
import AppContext from './contexts/appContext';
import logo1 from './assets/0.jpg';
import './RowItem.css';
import { Link, Route } from 'react-router-dom';
import playerContext from './player/playerContext';
import slug from './Slug';
const urls = [
  {
    url:
      'https://files.musico.ir/Song/Ehsan%20Daryadel%20-%20Koochamoon%20(320).mp3',
    name: 'darya',
    id: 323,
  },
  {
    url: 'http://dl.musicdam.net/Downloads/mp3/Hayedeh%20-%20Soghati%20128.mp3',
    name: 'hayde2',
    id: 881,
  },
  {
    url:
      'http://dl.musicdam.net/Downloads/mp3/Hayedeh%20-%20Bordi%20Az%20Yadam%20128.mp3',
    name: 'darya1',
    id: 413,
  },
  {
    url:
      'http://dl.musicdam.net/Downloads/mp3/Hayedeh%20-%20Badeh%20Foroosh%20128.mp3',
    name: 'hayde1',
    id: 901,
  },
];
const RowItem = ({
  // logo  ,
  categories = 'شب سوم محرم',
  languages = 'فارسی',
  persons = 'محمد',
  modes = 'دودمه',
  years = '2001',
  url = 'http://dl.musicdam.net/Downloads/mp3/Hayedeh%20-%20Bordi%20Az%20Yadam%20128.mp3',
  playlist = urls,
}) => {
  const { ChangeShowMusic, ChangeshowCenter, showMusic } = useContext(
    AppContext
  );
  const [state, setstate] = useState(false);

  const { playAndPauseMusic, playing, setUrl, playMusic } = useContext(
    playerContext
  );
  const playMusicAndShowMusicBar = () => {
    // نشان دادن موزیک و پخش موزیک
    setUrl(url);

    setTimeout(() => {
      if (!showMusic) {
        ChangeShowMusic();
      }
      playMusic();
    }, 1000);
  };
  return (
    <div className='carousel-cellRowItem rowItem '>
      <div className='rowItem__image'>
        <Link to={`/rowitempage/${'ali'}`} className='visit '>
          <img src={logo1} alt='logo' />
          <Badge className='badge bg-light'>
            شور
            {/* {modes} */}
          </Badge>
        </Link>
      </div>
      <div className='rowItem__onHover'>
        {' '}
        {/* <Link to={`/rowitempage/${'ali'}`} className='visit '>
          <div className='visit_text p-2 '>
            توضیحات بیشتر <Info />
          </div>
        </Link> */}
        <div className='rowItem__icons'>
          <div className='rowItem__icon' onClick={playMusicAndShowMusicBar}>
            <PlayCircleFilled fontSize='large' />
          </div>
          <div className='rowItem__icon' onClick={ChangeshowCenter}>
            <PlaylistAdd fontSize='large' />
          </div>
        </div>
      </div>{' '}
      <div className='rowItem__info'>
        <h4 className='rowItem__title text-center'>اهل کاشان هستم</h4>
        <h4 className='rowItem__person text-center'>
          {/* حاج محمد شریفی */}
          {persons}
        </h4>
      </div>
    </div>
  );
};

export default RowItem;

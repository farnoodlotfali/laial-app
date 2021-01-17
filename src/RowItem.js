import {
  PlayArrowRounded,
  PlayCircleFilled,
  PlaylistAdd,
} from '@material-ui/icons';
import React, { useContext } from 'react';
import { Badge } from 'react-bootstrap';
import AppContext from './contexts/appContext';
import logo1 from './assets/0.jpg';
import './RowItem.css';
import { Link } from 'react-router-dom';
import playerContext from './player/playerContext';
import axios from './axios/axios';

import SpinnerLoading from './spinner/SpinnerLoading';
import rowItemPageContext from './rowItemPageState/rowItemPageContext';
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

const RowItem = ({ media, person, slug, playlist = urls }) => {
  // eslint-disable-next-line
  const { ChangeShowMusic, ChangeshowCenter, showMusic } = useContext(
    AppContext
  ); // eslint-disable-next-line
  const { playMusic, playing, songId, loading, setUrl, setIds } = useContext(
    playerContext
  );
  const { changeItem } = useContext(rowItemPageContext);
  // console.log(media.duration);

  const playMusicAndShowMusicBar = async () => {
    // نشان دادن موزیک و پخش موزیک
    setIds(media?.telegram_id, media?.id, media?.duration);
    try {
      const res = await axios.downloader.get(`/${media?.telegram_id}`);
      setUrl(res.data.download_link);

      // if (!loading) {
      //   setTimeout(() => {

      //   }, 1200);
      // }
      if (!showMusic) {
        ChangeShowMusic();
      }
      playMusic();
    } catch (error) {
      console.log(error);
    }
  };

  const setItem = () => {
    changeItem(media, person);
  };

  const truncate = (str, no_words) => {
    return str.split(' ').splice(0, no_words).join(' ');
  };

  return (
    <div className='carousel-cellRowItem rowItem '>
      <div className='rowItem__image'>
        <img src={logo1} alt='logo' />
        {loading && media?.id === songId ? (
          <div className='rowItem__playing'>
            <SpinnerLoading />
          </div>
        ) : (
          <div className=' moblie_play' onClick={playMusicAndShowMusicBar}>
            <PlayArrowRounded style={{ fontSize: '100px' }} />
            {/* <img src={logo} alt='' /> */}
          </div>
        )}

        <Badge className='badge bg-light'>{/* شور */}</Badge>
        {/* </Link> */}
      </div>
      <div className='rowItem__onHover'>
        <div className='rowItem__icons'>
          <div className='rowItem__icon' onClick={playMusicAndShowMusicBar}>
            <PlayCircleFilled fontSize='large' />
          </div>
          <div className='rowItem__icon' onClick={ChangeshowCenter}>
            <PlaylistAdd fontSize='large' />
          </div>
        </div>
      </div>{' '}
      <div className='rowItem__info ' onClick={() => setItem()}>
        <Link to={`/song/${slug}`} className='visit '>
          <h4 className='rowItem__title text-center'>
            {truncate(media?.name, 4)}
          </h4>
        </Link>
        <Link to={`/person/${person?.[0]?.slug}`} className='visit '>
          <h4 className='rowItem__person text-center'>
            {/* حاج محمد شریفی */}
            {person?.[0]?.name}
          </h4>
        </Link>
      </div>
    </div>
  );
};

export default RowItem;

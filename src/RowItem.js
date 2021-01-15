import {
  Info,
  PlayArrow,
  PlayArrowRounded,
  PlayCircleFilled,
  PlayCircleOutlineOutlined,
  PlaylistAdd,
} from '@material-ui/icons';
import React, { useContext, useEffect, useState } from 'react';
import { Badge } from 'react-bootstrap';
import AppContext from './contexts/appContext';
import logo1 from './assets/0.jpg';
import './RowItem.css';
import { Link } from 'react-router-dom';
import playerContext from './player/playerContext';
import axios from './axios/axios';
import rowItemPageContext from './rowItemPageState/rowItemPageContext';
import logo from './assets/p.svg';
import SpinnerMusic from './spinner/SpinnerMusic';
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
  media,
  person,
  slug,
  url = 'http://dl.musicdam.net/Downloads/mp3/Hayedeh%20-%20Bordi%20Az%20Yadam%20128.mp3',
  playlist = urls,
}) => {
  const { ChangeShowMusic, ChangeshowCenter, showMusic, viewPage } = useContext(
    AppContext
  );
  const { setUrl, playMusic, getIds, playing, songId } = useContext(
    playerContext
  );
  const { changeItem } = useContext(rowItemPageContext);

  const [didMount, setDidMount] = useState(false);
  // console.log(person);
  useEffect(() => {
    setDidMount(true);

    viewPage(slug);
    // const view = async () => {
    //   const view = await axios.instance.get(`/post/${slug}/?state=views`);
    // };

    const getUrl = async () => {
      if (media.path === null) {
        try {
          const res = await axios.downloader.get`/${media?.telegram_id}`;

          // console.log(res.data);
        } catch (error) {
          console.log(error);
        }
      }
    };

    // getUrl();
    // view();
    return () => setDidMount(false);
  }, [media?.telegram_id]);
  if (!didMount) {
    return null;
  }
  const playMusicAndShowMusicBar = () => {
    // نشان دادن موزیک و پخش موزیک
    getIds(media?.telegram_id, media?.id);

    setUrl(url);
    // console.log(media?.telegram_id, media?.id);
    setTimeout(() => {
      if (!showMusic) {
        ChangeShowMusic();
      }
      playMusic();
    }, 1000);
  };
  const c = () => {
    playMusicAndShowMusicBar();
    // console.log(media?.id);
  };

  const truncate = (str, no_words) => {
    return str.split(' ').splice(0, no_words).join(' ');
  };

  return (
    <div className='carousel-cellRowItem rowItem '>
      <div className='rowItem__image'>
        <img src={logo1} alt='logo' />
        {playing && media?.id === songId ? (
          <div className='rowItem__playing'>
            <SpinnerMusic />
          </div>
        ) : (
          <div className=' moblie_play' onClick={() => c()}>
            <PlayArrowRounded style={{ fontSize: '100px' }} />
            {/* <img src={logo} alt='' /> */}
          </div>
        )}

        <Badge className='badge bg-light'>
          {/* شور */}
          {/* {media?.name?.includes('|')
              ? media?.name?.split('|')[0]
              : media?.name?.split('-')[0]} */}
        </Badge>
        {/* </Link> */}
      </div>
      <div className='rowItem__onHover'>
        {/* <Link
          to={`/song/${slug}`}
          onClick={() => changeItem(url, media, person)}
          className='visit '
        >
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
        <Link to={`/song/${slug}`} className='visit '>
          <h4 className='rowItem__title text-center'>
            {/* {media?.name?.includes('|')
            ? media?.name?.split('|')[1]
            : media?.name?.split('-')[1]} */}
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

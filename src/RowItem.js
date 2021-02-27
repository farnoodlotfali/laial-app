import { Pause, PlayArrowRounded } from '@material-ui/icons';
import { useContext } from 'react';
import { Badge } from 'react-bootstrap';
import AppContext from './contexts/appContext';
import defualtPhoto from './assets/defualtPhoto.jpeg';
import logo1 from './assets/0.jpg';
import './RowItem.css';
import { Link } from 'react-router-dom';
import playerContext from './player/playerContext';
import axios from './axios/axios';

import SpinnerLoading from './spinner/SpinnerLoading';
import authContext from './auth/authContext';
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

const RowItem = ({ media, person, slug, context }) => {
  // let { slug } = useParams();
  // eslint-disable-next-line
  const { ChangeShowMusic, ChangeshowCenter, showMusic } = useContext(
    AppContext
  ); // eslint-disable-next-line
  const {
    playMusic,
    playing,
    songId,
    loading,
    setUrl,
    setIds,
    playAndPauseMusic,
  } = useContext(playerContext);

  const { testAuth } = useContext(authContext);
  // console.log(context);
  const playMusicAndShowMusicBar = async () => {
    // نشان دادن موزیک و پخش موزیک
    setIds(
      media?.telegram_id,
      media?.id,
      media?.duration,
      media?.name,
      person?.[0]?.name,
      media?.image !== null ? media?.image : person?.[0]?.image.full_image_url
    );
    // console.log(media?.name, person?.[0]?.name);
    try {
      const res = await axios.downloader.get(`/${media?.telegram_id}`);
      setUrl(res.data.download_link, context);
      if (!showMusic) {
        ChangeShowMusic();
      }
      playMusic();
    } catch (error) {
      console.log(error);
    }
  };

  const truncate = (str, no_words) => {
    return str?.split(' ').splice(0, no_words).join(' ');
  };
  // console.log(media);
  return (
    <div className='carousel-cellRowItem rowItem '>
      <div className='rowItem__image'>
        <img
          src={
            media?.image !== null
              ? media?.image
              : person?.[0]?.image.full_image_url !== null
              ? person?.[0]?.image.full_image_url
              : defualtPhoto
          }
          alt='logo'
        />

        {/* mobile ratio  */}
        {loading && media?.id === songId ? (
          <div className='rowItem__playing'>
            <SpinnerLoading />
          </div>
        ) : playing && media?.id === songId ? (
          <div className=' moblie_play' onClick={() => playAndPauseMusic()}>
            <Pause style={{ fontSize: '100px' }} />
            {/* <img src={logo} alt='' /> */}
          </div>
        ) : (
          <div className=' moblie_play' onClick={playMusicAndShowMusicBar}>
            <PlayArrowRounded style={{ fontSize: '100px' }} />
            {/* <img src={logo} alt='' /> */}
          </div>
        )}

        {/* web ratio  */}
        {loading && media?.id === songId ? (
          <div className=''>
            <SpinnerLoading />
          </div>
        ) : playing && media?.id === songId ? (
          <div className=' play__music' onClick={() => playAndPauseMusic()}>
            <Pause />
          </div>
        ) : (
          <div className=' play__music' onClick={playMusicAndShowMusicBar}>
            <PlayArrowRounded />
          </div>
        )}
        <Badge className='badge bg-light'>{/* شور */}</Badge>
        {/* </Link> */}
      </div>
      {/* <div className='rowItem__onHover'>
        <div className='rowItem__icons'>
          <div className='rowItem__icon' onClick={playMusicAndShowMusicBar}>
            <PlayCircleFilled fontSize='large' />
          </div>
          <div className='rowItem__icon' onClick={ChangeshowCenter}>
            <PlaylistAdd fontSize='large' />
          </div>
        </div>
      </div>{' '} */}
      <div className='rowItem__info '>
        <Link
          to={`/song/${slug}`}
          className='visit '
          onClick={() => testAuth()}
        >
          <h4 className='rowItem__title text-center'>
            {truncate(media?.name, 4)}
            {/* {media?.name} */}
          </h4>
        </Link>
        <Link
          to={`/person/${person?.[0]?.slug}`}
          className='visit '
          onClick={() => testAuth()}
        >
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

import { IconButton, Tooltip } from '@material-ui/core';
import {
  Favorite,
  GetAppRounded,
  PlayArrowRounded,
  PlaylistAdd,
  Visibility,
} from '@material-ui/icons';
import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router';
import axios from './axios/axios';
import AppContext from './contexts/appContext';
import playerContext from './player/playerContext';
import './RowItemPage.css';
import Flickity from 'react-flickity-component';
import Spinner from './spinner/Spinner';
import RowItem from './RowItem';
const urls = [
  {
    url:
      'https://dl.ganja2music.com/Ganja2Music/128/Archive/B/Behnam%20Bani/Single/Behnam%20Bani%20-%20Khoshhalam%20(128).mp3',
    name: 'rewq',
    id: 111,
  },
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
const RowItemPage = () => {
  const flickityOptions = {
    // initialIndex: 2,
    contain: true,
    prevNextButtons: false,
    pageDots: false,
    rightToLeft: true,
  };
  const {
    ChangeShowMusic,
    showMusic,
    getSongPage,
    dataSongPage,
    viewPage,
    loading,
    downloadUrl,
    viewsPage,
    like,
    getRecommender,
    recommender,
    likeSong,
  } = useContext(AppContext);
  const { setUrl, playMusic, setIds } = useContext(playerContext);
  // console.log(item);
  let params = useParams();
  useEffect(() => {
    getSongPage(params.slug);
    viewPage(params.slug);
    getRecommender();

    // eslint-disable-next-line
  }, [params.slug]);
  // console.log(dataSongPage);
  // نشان دادن موزیک و پخش موزیک
  const playMusicAndShowMusicBar = async () => {
    setIds(
      dataSongPage?.media?.[0]?.telegram_id,
      dataSongPage?.media?.[0]?.id,
      dataSongPage?.media?.[0]?.duration,
      dataSongPage?.media?.[0]?.name,
      dataSongPage?.person?.[0]?.name
    );
    try {
      const res = await axios.downloader.get(
        `/${dataSongPage?.media?.[0]?.telegram_id}`
      );
      setUrl(res.data.download_link);

      if (!showMusic) {
        ChangeShowMusic();
      }
      playMusic();
    } catch (error) {
      console.log(error);
    }
  };
  return loading ? (
    <Spinner />
  ) : (
    <div className='rowItemPage py-4  '>
      <div className='musicInfo d-flex justify-content-around'>
        <div className='musicInfo__right '>
          <img
            className='musicInfo__image'
            src='https://www.ganja2music.com/Image/Post/10.2020/Behnam%20Bani%20-%20Khoshhalam.jpg'
            alt=''
          />
        </div>
        <div className='musicInfo__left text-light   justify-content-start align-items-center'>
          <div className='musicInfo__name mt-5 mb-3 d-flex'>
            نام آهنگ : {dataSongPage?.media?.[0]?.name}
          </div>{' '}
          <div className='musicInfo__singer mb-3 d-flex'>
            خواننده : {dataSongPage?.person?.[0]?.name}
          </div>
          <div className='musicInfo__mode mb-3 d-flex'>سبک : شور</div>
          <hr />
          <div className='actions d-flex justify-content-around'>
            <div onClick={playMusicAndShowMusicBar}>
              <Tooltip placement='bottom' title='پخش آهنگ'>
                <IconButton aria-label='play'>
                  <PlayArrowRounded
                    style={{ fontSize: '40px' }}
                    className='icon'
                  />
                </IconButton>
              </Tooltip>
            </div>

            <div className='favorite'>
              <IconButton
                aria-label='Favorite'
                onClick={() => likeSong(params.slug)}
              >
                <Favorite className='Favorite' fontSize='large' />
              </IconButton>
              {like}
            </div>

            <div>
              <a href={downloadUrl} className='download'>
                <Tooltip placement='bottom' title='دانلود'>
                  <IconButton aria-label='download'>
                    <GetAppRounded fontSize='large' />
                  </IconButton>
                </Tooltip>
              </a>
            </div>

            <div>
              <Tooltip placement='bottom' title='اضافه به لیست'>
                <IconButton aria-label='Add'>
                  <PlaylistAdd className='Add' fontSize='large' />
                </IconButton>
              </Tooltip>
            </div>
            <div className='view'>
              <IconButton aria-label='View'>
                <Visibility className='View' fontSize='large' />
              </IconButton>
              {viewsPage}
            </div>
          </div>
        </div>
      </div>

      <div className='rowList mb-3 mt-5  pt-5 '>
        <h3 className='text-light text-right pb-3 mr-4'>
          <span>پیشنهاداتی برای شما</span>
        </h3>
        <Flickity className='carousel  px-2 py-0' options={flickityOptions}>
          {recommender &&
            recommender.map((item, i) => {
              return (
                <RowItem
                  key={item.id}
                  logo={item.image}
                  media={item.media[0]}
                  person={item.person}
                  slug={item.slug}
                />
              );
            })}
        </Flickity>
      </div>
    </div>
  );
};

export default RowItemPage;

import { Divider, IconButton, Tooltip } from '@material-ui/core';
import { Favorite, GetAppRounded, PlayArrow } from '@material-ui/icons';
import React, { useContext, useEffect, useState } from 'react';
import AppContext from './contexts/appContext';
import playerContext from './player/playerContext';
import './RowItemPage.css';
import y from './y';
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
const RowItemPage = ({
  url = 'https://dl.ganja2music.com/Ganja2Music/128/Archive/B/Behnam%20Bani/Single/Behnam%20Bani%20-%20Khoshhalam%20(128).mp3',
  playlist = urls,
}) => {
  const { ChangeShowMusic, showMusic } = useContext(AppContext);
  const { playAndPauseMusic, playing, setUrl, playMusic } = useContext(
    playerContext
  );
  useEffect(() => {}, []);
  // نشان دادن موزیک و پخش موزیک
  const playMusicAndShowMusicBar = () => {
    setUrl(url, playlist);

    setTimeout(() => {
      if (!showMusic) {
        ChangeShowMusic();
      }

      playMusic();
    }, 1000);
  };
  return (
    <div className='rowItemPage my-4  '>
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
            نام آهنگ : علی علی مولا
          </div>{' '}
          <div className='musicInfo__singer mb-3 d-flex'>
            خواننده : بهنام بانی
          </div>
          <div className='musicInfo__mode mb-3 d-flex'>سبک : شور</div>
          <hr />
          <div className='actions d-flex justify-content-around'>
            <div onClick={playMusicAndShowMusicBar}>
              <Tooltip placement='left' title='Play'>
                <IconButton aria-label='play'>
                  <PlayArrow style={{ fontSize: '40px' }} className='icon' />
                </IconButton>
              </Tooltip>
            </div>

            <div>
              <Tooltip placement='left' title='Favorite'>
                <IconButton aria-label='Favorite'>
                  <Favorite className='Favorite' fontSize='large' />
                </IconButton>
              </Tooltip>
            </div>

            <div>
              <a href='https://dl.ganja2music.com/Ganja2Music/128/Archive/B/Behnam%20Bani/Single/Behnam%20Bani%20-%20Khoshhalam%20(128).mp3'>
                <Tooltip placement='left' title='Download'>
                  <IconButton aria-label='download'>
                    <GetAppRounded fontSize='large' />
                  </IconButton>
                </Tooltip>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className='musicPlayer'></div>
    </div>
  );
};

export default RowItemPage;

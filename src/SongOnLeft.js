import React, { useContext } from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import logo from './assets/0.jpg';
import playerContext from './player/playerContext';
import axios from './axios/axios';
import appContext from './contexts/appContext';
// eslint-disable-next-line
const SongOnLeft = ({ item, playlist, number, zeroPad }) => {
  // eslint-disable-next-line
  const {
    playAndPauseMusic,
    playing,
    setUrl,
    playList,
    playMusic,
    setIds,
    setPlayList,
  } = useContext(playerContext);
  const { ChangeShowMusic, showMusic } = useContext(appContext);
  const paly = async () => {
    setIds(
      item.media[0]?.telegram_id,
      item.media[0]?.id,
      item.media[0]?.duration,
      item.media[0]?.name,
      item.person?.[0]?.name
    );

    try {
      const res = await axios.downloader.get(`/${item.media[0]?.telegram_id}`);
      setUrl(res.data.download_link, playList);

      if (!showMusic) {
        ChangeShowMusic();
      }
      playMusic();
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(item);
  return (
    <div className='songOnLeft'>
      <div className='song d-flex my-5 justify-content-between'>
        <div className='song__right d-flex'>
          <div className='number mx-4 align-self-center'>{number}</div>
          <div className='song__image' onClick={() => paly()}>
            <img src={logo} alt='' />
          </div>
          <div className='song__info mr-3 align-self-center '>
            <div className='song__title'>{item.media[0].name}</div>
            <div className='song__person '>{item.person[0].name}</div>
          </div>{' '}
          <div className='song__center d-flex align-self-center'></div>
        </div>

        <div className='song__left d-flex'>
          <div className='song__time align-self-center text-muted'>
            {/* size will be here */}
            {Math.floor(item.media[0].duration / 60) +
              ':' +
              zeroPad(Math.floor(item.media[0].duration % 60), 2)}
          </div>
          <div className='deleteSongBtn d-flex align-self-center mr-1'>
            {/* <Tooltip placement='left' title='Favorite'>
              <IconButton aria-label='Favorite'>
                <Favorite className='Favorite' fontSize='inherit' />
              </IconButton>
            </Tooltip> */}

            <Tooltip placement='right' title='Delete '>
              <IconButton aria-label='delete' color='inherit'>
                <Delete fontSize='inherit' />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SongOnLeft;

import React, { useContext } from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import { Delete, Favorite } from '@material-ui/icons';
import logo from './assets/0.jpg';
import playerContext from './player/playerContext';

const SongOnLeft = ({ song, playList, totalDuration, zeroPad, number }) => {
  const { playAndPauseMusic, playing, setUrl, playMusic } = useContext(
    playerContext
  );
  const paly = () => {
    // console.log(song);
    setUrl(song.url, playList);
    setTimeout(() => {
      playMusic();
    }, 1000);
  };
  return (
    <div className='songOnLeft'>
      <div className='song d-flex my-5 justify-content-between'>
        <div className='song__right d-flex'>
          <div className='number mx-4 align-self-center'>{number}</div>
          <div className='song__image' onClick={() => paly()}>
            <img src={logo} alt='' />
          </div>
          <div className='song__info mr-3 align-self-center '>
            <div className='song__title'>دودمه شب دهم محرم الحرام</div>
            <div className='song__person '>حاج مهدی رسولی</div>
          </div>{' '}
          <div className='song__center d-flex align-self-center'></div>
        </div>

        <div className='song__left d-flex'>
          <div className='song__time align-self-center text-muted'>
            3:42
            {/* size will be here */}
            {/* {' '}
            {Math.floor(totalDuration / 60) +
              ':' +
              zeroPad(Math.floor(totalDuration % 60), 2)} */}
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

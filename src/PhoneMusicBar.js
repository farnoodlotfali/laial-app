import { Slider } from '@material-ui/core';
import React, { useContext } from 'react';
import './PhoneMusicBar.css';
import playerContext from './player/playerContext';
const PhoneMusicBar = () => {
  const progress = useContext(playerContext);
  return (
    <div className='phoneMusicBar'>
      <div className='phoneMusicBar__top'>
        <div className='player__zone d-flex mt-2'>
          <div className='current-time align-self-center '>3:44</div>dadsdda
          <div className='player mt-1 align-self-center mx-3 '>
            <Slider
              variant='determinate'
              value={progress}
              // onChange={(e, newDuration) => handleChange(newDuration)}
            />
          </div>
          <div className='last-time align-self-center '>5:09</div>
        </div>
      </div>
      <div className='phoneMusicBar__center'></div>
      <div className='phoneMusicBar__bottom'></div>
    </div>
  );
};

export default PhoneMusicBar;

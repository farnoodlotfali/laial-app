import React, { Fragment } from 'react';
import spinner from './SpinnerMusic.gif';

const SpinnerMusic = () => {
  return (
    <div
      className='spinner'
      style={{
        display: 'flex',
        height: '114px',
        opacity: 0.5,
        position: 'absolute',
        top: '1%',
      }}
    >
      <img
        src={spinner}
        alt='..loading'
        style={{ widows: '200px', display: 'block' }}
      />
    </div>
  );
};

export default SpinnerMusic;

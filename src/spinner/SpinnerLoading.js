import React from 'react';
import SpinnerLoad from './SpinnerLoad.gif';

const SpinnerLoading = () => {
  return (
    <div
      className='spinner'
      style={{
        display: 'flex',
        height: '100%',
        opacity: 0.5,
        position: 'absolute',
        top: '1%',
      }}
    >
      <img
        src={SpinnerLoad}
        alt='..loading'
        style={{ widows: '200px', display: 'block' }}
      />
    </div>
  );
};

export default SpinnerLoading;

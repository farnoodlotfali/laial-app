import React, { Fragment } from 'react';
import spinner from './Spinner.gif';
import spinner1 from './Spinner1.gif';
import spinner2 from './Spinner2.gif';

const Spinner = () => {
  return (
    <div className='spinner' style={{ display: 'flex', height: '85vh' }}>
      <img
        src={spinner2}
        alt='..loading'
        style={{
          widows: '200px',
          margin: 'auto',
          display: 'block',
        }}
      />
    </div>
  );
};

export default Spinner;

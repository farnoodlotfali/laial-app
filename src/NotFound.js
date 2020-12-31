import React from 'react';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className='notFound'>
      <div className='row'>
        <div className='col-12 notFound__content  justify-content-center'>
          <h1 className='notfound__title my-3'>404</h1>
          <h2 className='notfound__desc '>صفحه مورد نظر یافت نشد</h2>
          <a href='/' dideo-checked='true'>
            صفحه اصلی
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

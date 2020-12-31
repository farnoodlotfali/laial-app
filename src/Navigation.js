import React from 'react';
import './Navigation.css';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { Link } from 'react-router-dom';
const Navigation = ({ items }) => {
  return (
    <div className='navigation py-3 pr-3 d-flex'>
      <Breadcrumbs
        className=' text-light'
        separator='>'
        aria-label='breadcrumb'
      >
        <Link to='/'>خانه</Link>
        <Link to='search'>جستجو</Link>
        <Link to='/aboutus'>درباره ی ما</Link>
      </Breadcrumbs>
    </div>
  );
};

export default Navigation;

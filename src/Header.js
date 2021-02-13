import React, { Fragment, useContext, useState } from 'react';
import './Header.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import appContext from './contexts/appContext';
import { NavLink } from 'react-router-dom';
import {
  AccountCircleRounded,
  ExitToAppRounded,
  PersonRounded,
} from '@material-ui/icons';
import authContext from './auth/authContext';
import { Button, Menu, MenuItem } from '@material-ui/core';
// for fix to top use fixed-top in  className='fixed-top'
const Header = () => {
  const { ChangeshowCenter, ChangeShowLeft } = useContext(appContext);
  const {
    isAuth,

    user,
    logout,
  } = useContext(authContext);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <nav className='header navbar navbar-expand-sm  py-4 '>
      {/* <button
        className='navbar-toggler text-white'
        type='button'
        data-toggle='collapse'
        data-target='#header__nav'
        aria-controls='header__nav'
        aria-expanded='false'
        aria-label='Toggle navigation'
      >
        <span className='navbar-toggler-icon'>
          <MenuIcon />
        </span>
      </button> */}

      <div className='collapse navs__items navbar-collapse  ' id='header__nav'>
        <ul className='navbar-nav   mt-2 mt-lg-0'>
          <div className='navs'>
            <NavLink
              activeClassName='selected'
              exact
              to='/'
              className='   mx-3'
              onClick={() => ChangeShowLeft(false)}
            >
              خانه
            </NavLink>
            <NavLink
              activeClassName='selected'
              to='/search'
              className=' mx-3'
              onClick={() => ChangeShowLeft(false)}
            >
              جستجو
            </NavLink>
            <NavLink to='#' className=' mx-3 ' onClick={ChangeshowCenter}>
              لیست من
            </NavLink>
            <NavLink
              activeClassName='selected'
              to='/aboutus'
              className='  mx-3'
              onClick={() => ChangeShowLeft(false)}
            >
              درباره ی ما
            </NavLink>
          </div>
          <div className='register__login__btn mr-auto ml-3'>
            {' '}
            {user !== null ? (
              <Fragment>
                <div className='dropdown'>
                  <button
                    className='btn text-light user_btn '
                    type='button'
                    id='dropdownMenuButton'
                    data-toggle='dropdown'
                    aria-haspopup='true'
                    aria-expanded='false'
                  >
                    <span className='ml-2'>{user.first_name}</span>
                    <AccountCircleRounded />
                  </button>
                  <div
                    className='dropdown-menu'
                    aria-labelledby='dropdownMenuButton'
                  >
                    <a className='dropdown-item'>
                      <span>پروفایل</span>
                      <PersonRounded className='' />
                    </a>
                    <a className='dropdown-item' onClick={() => logout()}>
                      <span> خروج از حساب</span>
                      <ExitToAppRounded className='' />
                    </a>
                  </div>
                </div>
              </Fragment>
            ) : (
              // <div className='text-light d-flex'>
              //   {user.first_name}{' '}
              //   <span className='d-flex  justify-content-center align-self-center'>
              //     <AccountCircleRounded />
              //   </span>
              // </div>
              // </NavLink>
              // <span>{user.first_name}</span>
              <NavLink exact to='/login' className='d-flex text-light'>
                ورود/ثبت نام
                <span className='d-flex  justify-content-center align-self-center'>
                  <AccountCircleRounded />
                </span>
              </NavLink>
            )}
          </div>
        </ul>
      </div>
      {/* </div> */}
    </nav>

    // <div className=''>
    //   <div className='header'>
    //     <ul>
    //       <li>
    //         <a href='/'>Github</a>
    //       </li>
    //       <li>
    //         <a href='/'>FaceBook</a>
    //       </li>
    //     </ul>
    //   </div>
    // </div>
  );
};

export default Header;

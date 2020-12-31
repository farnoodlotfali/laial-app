import React, { useContext } from 'react';
import './Header.css';
import MenuIcon from '@material-ui/icons/Menu';
import 'bootstrap/dist/css/bootstrap.min.css';
import appContext from './contexts/appContext';
import { Link } from 'react-router-dom';
// for fix to top use fixed-top in  className='fixed-top'
const Header = () => {
  const { ChangeshowCenter, ChangeShowLeft } = useContext(appContext);
  return (
    <nav className='header navbar navbar-expand-sm  py-4 '>
      <button
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
      </button>

      <div className='collapse navbar-collapse  ' id='header__nav'>
        <ul className='navbar-nav   mt-2 mt-lg-0'>
          <Link
            to='/'
            className='nav-item   mx-3'
            onClick={() => ChangeShowLeft(false)}
          >
            خانه
          </Link>
          <Link
            to='/search'
            className='nav-item mx-3'
            onClick={() => ChangeShowLeft(false)}
          >
            جستجو
          </Link>
          <Link to='#' className='nav-item mx-3 ' onClick={ChangeshowCenter}>
            لیست من
          </Link>
          <Link
            to='/aboutus'
            className='nav-item  mx-3'
            onClick={() => ChangeShowLeft(false)}
          >
            درباره ی ما
          </Link>
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

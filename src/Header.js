import { Fragment, useContext } from "react";
import "./Header.css";
import "bootstrap/dist/css/bootstrap.min.css";
import appContext from "./contexts/appContext";
import { Link, NavLink } from "react-router-dom";
import {
  AccountCircleRounded,
  ExitToAppRounded,
  HomeRounded,
  PersonRounded,
  QueueMusicRounded,
  SearchRounded,
} from "@material-ui/icons";
import authContext from "./auth/authContext";
import Headroom from "react-headroom";
const Header = () => {
  const { ChangeshowCenter, ChangeShowLeft, ChangeShowRight } = useContext(
    appContext
  );
  const { isAuth, user, logout } = useContext(authContext);

  return (
    <Headroom>
      <nav className="header navbar navbar-expand-sm  py-4 ">
        <div
          className="collapse navs__items navbar-collapse  "
          id="header__nav"
        >
          <ul className="navbar-nav   mt-2 mt-lg-0">
            <div className="navs">
              <li className="   mx-3" onClick={() => ChangeShowRight(true)}>
                منو اصلی
              </li>
              <NavLink
                activeClassName="selected"
                exact
                to="/"
                className="   mx-3"
                onClick={() => ChangeShowLeft(false)}
              >
                <HomeRounded className="align-self-center  ml-1" />
                خانه
              </NavLink>
              <NavLink
                activeClassName="selected"
                to="/search"
                className=" mx-3 mr-2"
                onClick={() => ChangeShowLeft(false)}
              >
                <SearchRounded className="align-self-center  ml-1" />
                جستجو
              </NavLink>

              {isAuth && (
                <li className=" mx-3 " onClick={ChangeshowCenter}>
                  <QueueMusicRounded className="align-self-center  ml-1" />
                  لیست من
                </li>
              )}
              {/* <NavLink
                activeClassName='selected'
                to='/aboutus'
                className='  mx-3'
                onClick={() => ChangeShowLeft(false)}
              >
                درباره ی ما
              </NavLink> */}
            </div>
            <div className="register__login__btn mr-auto ml-3">
              {user !== null ? (
                <Fragment>
                  <div className="dropdown">
                    <button
                      className="btn text-light user_btn "
                      type="button"
                      id="dropdownMenuButton"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <span className="ml-2">{user.first_name}</span>
                      <AccountCircleRounded />
                    </button>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton"
                    >
                      {/* eslint-disable-next-line */}
                      <Link to="/myprofile" className="dropdown-item">
                        <span>پروفایل</span>
                        <PersonRounded className="" />
                      </Link>
                      {/* eslint-disable-next-line */}
                      <a className="dropdown-item" onClick={() => logout()}>
                        <span> خروج از حساب</span>
                        <ExitToAppRounded className="" />
                      </a>
                    </div>
                  </div>
                </Fragment>
              ) : (
                <NavLink exact to="/login" className="d-flex text-light">
                  ورود/ثبت نام
                  <span className="d-flex  justify-content-center align-self-center">
                    <AccountCircleRounded />
                  </span>
                </NavLink>
              )}
            </div>
          </ul>
        </div>
        {/* </div> */}
      </nav>
    </Headroom>
  );
};

export default Header;

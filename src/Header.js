import { Fragment, useContext, useRef, useState } from "react";
import "./Header.css";
import appContext from "./contexts/appContext";
import { Link, NavLink } from "react-router-dom";
import {
  AccountCircleRounded,
  ExitToAppRounded,
  HomeRounded,
  MenuRounded,
  PersonRounded,
  QueueMusicRounded,
  SearchRounded,
} from "@material-ui/icons";
import authContext from "./auth/authContext";
import Headroom from "react-headroom";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  PaperRoot: {
    backgroundColor: "rgb(34, 35, 39)",
    border: "1px solid white",
  },
  menuItemRoot: {
    display: "flex",
    justifyContent: "space-between",
  },
  btnRoot: {
    border: "1px solid white",
    color: "white",
    minWidth: "100px",
  },
}));

const Header = () => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const { ChangeshowCenter, ChangeShowLeft, ChangeShowRight } =
    useContext(appContext);
  const { isAuth, user, logout } = useContext(authContext);
  const handleToggle = () => {
    setOpen(!open);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }
  return (
    <Headroom>
      <nav className="header  navbar-expand-sm ">
        <div
          className="collapse navs__items navbar-collapse  "
          id="header__nav"
        >
          <ul className="navbar-nav   mt-2 mt-lg-0">
            <div className="navs">
              <li className="   mx-3" onClick={() => ChangeShowRight(true)}>
                <MenuRounded className="align-self-center  ml-1" />
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
            </div>
            <div className="register__login__btn mr-auto ml-3">
              {user !== null ? (
                <Fragment>
                  <div>
                    <Button
                      classes={{ root: classes.btnRoot }}
                      ref={anchorRef}
                      aria-controls={open ? "menu-list-grow" : undefined}
                      aria-haspopup="true"
                      onClick={handleToggle}
                    >
                      {user?.first_name}
                      <AccountCircleRounded />
                    </Button>
                    <Popper
                      open={open}
                      anchorEl={anchorRef.current}
                      role={undefined}
                      transition
                      disablePortal
                    >
                      {({ TransitionProps }) => (
                        <Grow {...TransitionProps}>
                          <Paper classes={{ root: classes.PaperRoot }}>
                            <ClickAwayListener onClickAway={handleClose}>
                              <MenuList
                                autoFocusItem={open}
                                id="menu-list-grow"
                                onKeyDown={handleListKeyDown}
                              >
                                <MenuItem onClick={handleClose}>
                                  <Link
                                    to="/myprofile"
                                    className="header_dropdown_item"
                                  >
                                    <span>پروفایل</span>
                                    <PersonRounded fontSize="small" />
                                  </Link>
                                </MenuItem>
                                <MenuItem onClick={handleClose}>
                                  <div
                                    className="header_dropdown_item"
                                    onClick={() => logout()}
                                  >
                                    <span> خروج از حساب</span>
                                    <ExitToAppRounded fontSize="small" />
                                  </div>
                                </MenuItem>
                              </MenuList>
                            </ClickAwayListener>
                          </Paper>
                        </Grow>
                      )}
                    </Popper>
                  </div>
                </Fragment>
              ) : (
                <NavLink
                  exact
                  to="/login"
                  className="d-flex text-light header_login_btn"
                >
                  ورود/ثبت نام
                  <span className="d-flex  justify-content-center align-self-center"></span>
                </NavLink>
              )}
            </div>
          </ul>
        </div>
      </nav>
    </Headroom>
  );
};

export default Header;

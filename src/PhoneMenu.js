import {
  Headset,
  Home,
  MenuRounded,
  MusicNote,
  Search,
} from "@material-ui/icons";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import appContext from "./contexts/appContext";
import "./PhoneMenu.css";
import playerContext from "./player/playerContext";
const PhoneMenu = () => {
  const {
    ChangeshowCenter,
    ChangeShowMusic,
    ChangeShowRight,
    showRight,
    showMusic,
    showCenter,
  } = useContext(appContext);
  const {
    showMusicBarOnMoblieRatio,
    setShowMusicBarOnMoblieRatio,
    currentUrl,
  } = useContext(playerContext);
  const showMusicBar = () => {
    if (showMusicBarOnMoblieRatio) {
      setShowMusicBarOnMoblieRatio();
    }
    if (showMusic) {
    }
    ChangeShowMusic();
  };

  return (
    <div className="phoneMenu">
      <div className="phoneMenu__items d-flex justify-content-around py-2 ">
        <div
          className={`phoneMenu__item`}
          onClick={() => ChangeShowRight(showRight ? false : true)}
        >
          <MenuRounded fontSize="large" />
          {/* <span> منو </span> */}
        </div>
        <div className={`phoneMenu__item`}>
          <NavLink activeClassName="selected" exact to="/">
            <Home fontSize="large" />
            {/* <span> خانه </span> */}
          </NavLink>
        </div>
        <div className={`phoneMenu__item `}>
          <NavLink activeClassName="selected" exact to="/search">
            <Search fontSize="large" />
            {/* <span>جستجو</span> */}
          </NavLink>
        </div>
        <div
          className={`phoneMenu__item ${showCenter && "selected"} `}
          onClick={ChangeshowCenter}
        >
          <Headset fontSize="large" />
          {/* <span>لیست من</span> */}
        </div>
        {currentUrl && (
          <div
            className={`phoneMenu__item ${showMusic && "selected"} `}
            onClick={() => currentUrl !== null && showMusicBar()}
          >
            <MusicNote fontSize="large" />
          </div>
        )}
      </div>
    </div>
  );
};

export default PhoneMenu;

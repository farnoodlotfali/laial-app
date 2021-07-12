import { ListItem, ListItemText, SwipeableDrawer } from "@material-ui/core";
import {
  AccountCircleRounded,
  CloseRounded,
  ExitToAppRounded,
  PersonRounded,
} from "@material-ui/icons";
import { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import authContext from "./auth/authContext";
import appContext from "./contexts/appContext";
import "./PhoneList.css";

const PhoneList = () => {
  const { showRight, ChangeShowRight, menu } = useContext(appContext);
  const { user, logout } = useContext(authContext);

  // console.log(menu);
  return (
    <div className="phoneList ">
      <Fragment>
        {/* <Button onClick={() => ChangeShowRight(true)}>{'right'}</Button> */}
        <SwipeableDrawer
          anchor={"right"}
          open={showRight}
          onClose={() => ChangeShowRight(false)}
          onOpen={() => ChangeShowRight(true)}
        >
          <h4 className="phoneList__title p-3 d-flex justify-content-around text-light">
            <div
              className=" phoneList__title__close   align-self-center"
              onClick={() => ChangeShowRight(false)}
            >
              <CloseRounded />
            </div>
            {user ? (
              <div className="phoneList__user">
                <AccountCircleRounded />

                <span className="ml-2">{user.first_name}</span>
              </div>
            ) : (
              <Link
                className="phoneList__loginBTn btn btn-secondary"
                to="/login"
                onClick={() => ChangeShowRight(false)}
              >
                ورود به سایت
              </Link>
            )}
          </h4>
          <div className="phoneList__list text-light">
            {user && (
              <div className="phoneList__item">
                <Link to="/myprofile" onClick={() => ChangeShowRight(false)}>
                  <ListItem button key={"پروفایل"}>
                    <PersonRounded className="" />

                    <ListItemText primary={"پروفایل"} />
                  </ListItem>
                </Link>
              </div>
            )}

            {menu &&
              menu.map((item) =>
                item.absolute === true ? (
                  <div
                    key={item.id}
                    className="phoneList__item"
                    onClick={() =>
                      window.open(`${item.url}`) & ChangeShowRight(false)
                    }
                  >
                    <ListItem button key={item.name}>
                      <ListItemText primary={item.name} />
                    </ListItem>
                  </div>
                ) : (
                  <Link
                    onClick={() => ChangeShowRight(false)}
                    key={item.id}
                    to={`${item.url === "/" ? item.url : "/" + item.url}`}
                  >
                    <div className="phoneList__item">
                      <ListItem button key={item.name}>
                        <ListItemText primary={item.name} />
                      </ListItem>
                    </div>
                  </Link>
                )
              )}

            {user && (
              <div
                className="phoneList__item"
                onClick={() => logout() & ChangeShowRight(false)}
              >
                <ListItem button key={"خروج از حساب"}>
                  <ExitToAppRounded className="" />

                  <ListItemText primary={"خروج از حساب"} />
                </ListItem>
              </div>
            )}
          </div>
        </SwipeableDrawer>
      </Fragment>
    </div>
  );
};

export default PhoneList;

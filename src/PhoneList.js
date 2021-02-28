import {
  Button,
  ListItem,
  ListItemText,
  SwipeableDrawer,
} from '@material-ui/core';
import {
  AccountCircleRounded,
  CloseRounded,
  ExitToAppRounded,
  PersonRounded,
} from '@material-ui/icons';
import { Fragment, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import authContext from './auth/authContext';
import appContext from './contexts/appContext';
import './PhoneList.css';

const PhoneList = () => {
  const [right, setRight] = useState(false);
  const { showx, x, menu } = useContext(appContext);
  const {
    isAuth,

    user,
    logout,
  } = useContext(authContext);
  const m = () => {
    setRight(false);
    // console.log(x);
    showx();
    console.log(x);
  };
  // console.log(menu);
  return (
    <div className='phoneList '>
      <Fragment key={'right'}>
        {/* <Button onClick={() => showx(true)}>{'right'}</Button> */}
        <SwipeableDrawer
          anchor={'right'}
          open={x}
          onClose={() => showx(false)}
          onOpen={() => showx(true)}
        >
          <h4 className='phoneList__title p-3 d-flex justify-content-around text-light'>
            <div
              className=' phoneList__title__close   align-self-center'
              onClick={() => showx(false)}
            >
              <CloseRounded />
            </div>
            {user ? (
              <div className='phoneList__user'>
                <span className='ml-2'>{user.first_name}</span>
                <AccountCircleRounded />
              </div>
            ) : (
              <Link className='phoneList__loginBTn' to='/login'>
                ورود/ثبت نام
              </Link>
            )}
          </h4>
          <div className='phoneList__list text-light'>
            {menu &&
              menu.map((item) =>
                item.absolute === true ? (
                  <a key={item.id} href={item.url}>
                    <div className='phoneList__item'>
                      <ListItem button key={item.name}>
                        <ListItemText primary={item.name} />
                      </ListItem>
                    </div>
                  </a>
                ) : (
                  <Link key={item.id} to={item.url}>
                    <div className='phoneList__item'>
                      <ListItem button key={item.name}>
                        <ListItemText primary={item.name} />
                      </ListItem>
                    </div>
                  </Link>
                )
              )}

            <div className='phoneList__item'>
              <ListItem button key={'پروفایل'}>
                <PersonRounded className='' />

                <ListItemText primary={'پروفایل'} />
              </ListItem>
            </div>

            <div className='phoneList__item' onClick={() => logout()}>
              <ListItem button key={'خروج از حساب'}>
                <ExitToAppRounded className='' />

                <ListItemText primary={'خروج از حساب'} />
              </ListItem>
            </div>
          </div>
        </SwipeableDrawer>
      </Fragment>
    </div>
  );
};

export default PhoneList;

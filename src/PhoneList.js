import {
  Button,
  ListItem,
  ListItemText,
  SwipeableDrawer,
} from '@material-ui/core';
import {
  AccountCircleRounded,
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
  const { showx, x } = useContext(appContext);
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
          <h4 className='phoneList__title p-3 d-flex justify-content-center text-light'>
            {user ? (
              <div className='phoneList__user'>
                <span className=''>{user.first_name}</span>
                <AccountCircleRounded />
              </div>
            ) : (
              <Link className='phoneList__loginBTn' to='/login'>
                ورود/ثبت نام
              </Link>
            )}
          </h4>
          <div className='phoneList__list text-light'>
            <div className='phoneList__item'>
              <ListItem button key={'پویانفر'} onClick={m}>
                <ListItemText primary={'پویانفر'} />
              </ListItem>
            </div>{' '}
            <div className='phoneList__item'>
              <ListItem button key={'پروفایل'}>
                <PersonRounded className='' />

                <ListItemText primary={'پروفایل'} />
              </ListItem>
            </div>
            <div className='phoneList__item'>
              <ListItem button key={'پویانفر'}>
                <ListItemText primary={'پویانفر'} />
              </ListItem>
            </div>
            <div className='phoneList__item' onClick={() => logout(1)}>
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

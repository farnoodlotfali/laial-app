import { ListItem, ListItemText, SwipeableDrawer } from '@material-ui/core';
import {
  AccountCircleRounded,
  CloseRounded,
  ExitToAppRounded,
  PersonRounded,
} from '@material-ui/icons';
import { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import authContext from './auth/authContext';
import appContext from './contexts/appContext';
import './PhoneList.css';

const PhoneList = () => {
  const { showx, x, menu } = useContext(appContext);
  const { user, logout } = useContext(authContext);

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
              <Link
                className='phoneList__loginBTn'
                to='/login'
                onClick={() => showx(false)}
              >
                ورود/ثبت نام
              </Link>
            )}
          </h4>
          <div className='phoneList__list text-light'>
            {menu &&
              menu.map((item) =>
                item.absolute === true ? (
                  <div
                    key={item.id}
                    className='phoneList__item'
                    onClick={() => window.open(`${item.url}`) & showx(false)}
                  >
                    <ListItem button key={item.name}>
                      <ListItemText primary={item.name} />
                    </ListItem>
                  </div>
                ) : (
                  <Link
                    onClick={() => showx(false)}
                    key={item.id}
                    to={`${item.url === '/' ? item.url : '/' + item.url}`}
                  >
                    <div className='phoneList__item'>
                      <ListItem button key={item.name}>
                        <ListItemText primary={item.name} />
                      </ListItem>
                    </div>
                  </Link>
                )
              )}
            {user && (
              <div className='phoneList__item'>
                <Link to='/myprofile' onClick={() => showx(false)}>
                  <ListItem button key={'پروفایل'}>
                    <PersonRounded className='' />

                    <ListItemText primary={'پروفایل'} />
                  </ListItem>
                </Link>
              </div>
            )}
            {user && (
              <div
                className='phoneList__item'
                onClick={() => logout() & showx(false)}
              >
                <ListItem button key={'خروج از حساب'}>
                  <ExitToAppRounded className='' />

                  <ListItemText primary={'خروج از حساب'} />
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

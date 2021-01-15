import {
  Button,
  ListItem,
  ListItemText,
  SwipeableDrawer,
} from '@material-ui/core';
import React, { Fragment, useContext, useState } from 'react';
import appContext from './contexts/appContext';
import './PhoneList.css';

const PhoneList = () => {
  const [right, setRight] = useState(false);
  const { showx, x } = useContext(appContext);

  const m = () => {
    setRight(false);
    // console.log(x);
    showx();
    console.log(x);
  };
  return (
    <div className='phoneList '>
      <Fragment key={'right'}>
        <Button onClick={() => setRight(true)}>{'right'}</Button>
        <SwipeableDrawer
          anchor={'right'}
          open={right}
          onClose={() => setRight(false)}
          onOpen={() => setRight(true)}
        >
          <h4 className='phoneList__title p-3 d-flex justify-content-center text-light'>
            منوی اصلی
          </h4>
          <div className='phoneList__list text-light'>
            <div className='phoneList__item'>
              <ListItem button key={'پویانفر'} onClick={m}>
                <ListItemText primary={'پویانفر'} />
              </ListItem>
            </div>{' '}
            <div className='phoneList__item'>
              <ListItem button key={'پویانفر'}>
                <ListItemText primary={'پویانفر'} />
              </ListItem>
            </div>
            <div className='phoneList__item'>
              <ListItem button key={'پویانفر'}>
                <ListItemText primary={'پویانفر'} />
              </ListItem>
            </div>
            <div className='phoneList__item'>
              <ListItem button key={'پویانفر'}>
                <ListItemText primary={'پویانفر'} />
              </ListItem>
            </div>
          </div>
        </SwipeableDrawer>
      </Fragment>
    </div>
  );
};

export default PhoneList;

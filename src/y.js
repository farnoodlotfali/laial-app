import {
  Button,
  ListItem,
  ListItemText,
  SwipeableDrawer,
} from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { Fragment } from 'react';
import appContext from './contexts/appContext';

const Y = () => {
  const { x, showx } = useContext(appContext);
  const [right, setRight] = useState(x);
  console.log(x);
  return (
    <div className='q '>
      <Fragment key={'right'}>
        <Button onClick={() => showx()}>{'right'}</Button>
        <SwipeableDrawer
          anchor={'right'}
          open={x}
          onClose={() => showx()}
          onOpen={() => showx()}
        >
          <h4 className='phoneList__title p-3 d-flex justify-content-center text-light'>
            qqqqqqq
          </h4>
          <div className='lists text-light'>
            <div className='q'>
              <ListItem button key={'aaa'}>
                <ListItemText primary={'wq'} />
              </ListItem>
            </div>{' '}
            <div className='q'>
              <ListItem button key={'zzzq'}>
                <ListItemText primary={'a'} />
              </ListItem>
            </div>
            <div className='q'>
              <ListItem button key={'htrhthgrthre'}>
                <ListItemText primary={'d'} />
              </ListItem>
            </div>
            <div className='q'>
              <ListItem button key={'htrhthgrthre'}>
                <ListItemText primary={'c'} />
              </ListItem>
            </div>
          </div>
        </SwipeableDrawer>
      </Fragment>
    </div>
  );
};

export default Y;

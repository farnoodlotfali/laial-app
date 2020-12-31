import { Backdrop, IconButton, Modal, Slide, Tooltip } from '@material-ui/core';
// eslint-disable-next-line
import { Close, Edit, PlaylistAdd } from '@material-ui/icons';
import React, { useContext, useEffect } from 'react';
import './Center.css';
import md5 from 'md5';
import AppContext from './contexts/appContext';
import CenterItem from './CenterItem';
const Center = () => {
  const { lists, ChangeLists, showCenter, ChangeshowCenter } = useContext(
    AppContext
  );

  useEffect(() => {
    getLists();
    // eslint-disable-next-line
  }, []);

  const getLists = () => {
    let keys = Object.keys(localStorage);
    let lists = [];
    keys.forEach((value) => {
      if (value.substr(0, 5) === 'list-') {
        lists.push(JSON.parse(localStorage.getItem(value)));
      }
    });
    lists.sort((a, b) => b.time - a.time);
    ChangeLists(lists);
  };

  const addList = () => {
    let d = new Date();
    let key =
      'list-' +
      d.getFullYear() +
      '-' +
      d.getMonth() +
      '-' +
      d.getDay() +
      '-' +
      d.getHours() +
      '-' +
      d.getMinutes() +
      '-' +
      d.getSeconds() +
      '-' +
      md5(Date.now());

    let name = 'myList';
    localStorage.setItem(
      key,
      JSON.stringify({
        name: name,
        key: key,
        time: Date.now(),
      })
    );
    getLists();
  };

  return (
    <div>
      <Modal
        className='modal'
        open={showCenter}
        onClose={ChangeshowCenter}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Slide
          direction={showCenter ? `down` : `up`}
          timeout={500}
          in={showCenter}
        >
          <div className='playlist py-3  px-4 bg-white'>
            <div className='playlist__title d-flex '>
              <div className='title ml-4'>افزودن به لیست</div>
              <div className='addBtn'>
                <Tooltip placement='left' title='Add'>
                  <IconButton aria-label='add' onClick={addList}>
                    <PlaylistAdd />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
            <div className='playlist__lists'>
              {lists.map((list) => (
                <CenterItem key={list.key} name={list.name} id={list.key} />
                // <div
                //   key={list.key}
                //   className='list d-flex justify-content-between'
                // >
                //   <input type='text' value={list.name} disabled />
                //   <div className='list__icons'>
                //     <Tooltip placement='left' title='Edit'>
                //       <IconButton aria-label='edit'>
                //         <Edit />
                //       </IconButton>
                //     </Tooltip>
                //     <Tooltip placement='right' title='Remove'>
                //       <IconButton
                //         aria-label='remove'
                //         onClick={() => {
                //           localStorage.removeItem(list.key);
                //           setLists(
                //             lists.filter((listCurrent) => {
                //               return listCurrent.key !== list.key;
                //             })
                //           );
                //         }}
                //       >
                //         <Close />
                //       </IconButton>
                //     </Tooltip>
                //   </div>
                // </div>
              ))}
            </div>
          </div>
        </Slide>
      </Modal>
    </div>
  );
};

export default Center;

import { Backdrop, IconButton, Modal, Slide, Tooltip } from '@material-ui/core';
// eslint-disable-next-line
import { PostAddRounded } from '@material-ui/icons';
import { useContext, useEffect } from 'react';
import './Center.css';
// eslint-disable-next-line
import md5 from 'md5';
import AppContext from './contexts/appContext';
import CenterItem from './CenterItem';
const Center = () => {
  const {
    showCenter,
    ChangeshowCenter,
    userPlaylists,
    getAllPlaylists,
    makeNewPlaylist,
    loading,
    isAddingSong,
  } = useContext(AppContext);

  useEffect(() => {
    // console.log(1112);
    if (userPlaylists === null && !loading) {
      getAllPlaylists();
    }
    // eslint-disable-next-line
  }, [userPlaylists, loading, showCenter]);

  const addList = () => {
    /*let d = new Date();
    let key ='list-'+d.getFullYear()+'-' +d.getMonth()+'-' +d.getDay()+'-'+d.getHours()+'-'+d.getMinutes()+'-'+d.getSeconds()+'-'+md5(Date.now());*/
    let i = 0;
    let name = '';
    do {
      i++;
      name = 'myList ' + i;
    } while (userPlaylists.findIndex((list) => list.name === name) !== -1);
    // console.log(name);
    let form = [
      {
        name: name,
        status: 'publish',
      },
    ];
    makeNewPlaylist(form);
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
          <div className='playlist py-3 pl-1  pr-4 text-white'>
            <div className='playlist__title justify-content-center pl-3 d-flex '>
              <div className='title ml-4'>
                {isAddingSong ? (
                  <span>آهنگ به کدام لیست اضافه شود؟</span>
                ) : (
                  <span>لیست های من</span>
                )}{' '}
              </div>
              <div className='addBtn'>
                <Tooltip placement='left' title='لیست جدید'>
                  <IconButton aria-label='add' onClick={addList}>
                    <PostAddRounded fontSize='large' />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
            <div className='my-2 ml-4 playlist__line' />
            <div className='playlist__lists'>
              {userPlaylists !== null &&
                userPlaylists.map((list) => (
                  <CenterItem
                    key={list.id}
                    name={list.name}
                    id={list.id}
                    items={list.items}
                  />
                ))}
            </div>
          </div>
        </Slide>
      </Modal>
    </div>
  );
};

export default Center;

import { Fragment, useContext, useEffect, useRef, useState } from 'react';
import { Divider, IconButton, Tooltip } from '@material-ui/core';
import { CheckRounded, Close, Edit } from '@material-ui/icons';
import appContext from './contexts/appContext';
const CenterItem = ({ name, id, items }) => {
  const {
    removePlaylist,

    isAddingSong,
    addMusicToPlaylist,
  } = useContext(appContext);
  const [edit, setEdit] = useState(false);
  const [listName, setListName] = useState(name);
  const inputValue = useRef();
  useEffect(() => {
    inputValue.current.focus();
  }, [edit, isAddingSong]);
  const editName = () => {
    setEdit(true);
    // console.log(inputValue.current.value);
  };

  const removeList = () => {
    console.log(id);
    // removePlaylist();
  };

  const onChange = (e) => {
    setListName(inputValue.current.value);
  };
  return (
    <Fragment>
      <div
        className='list d-flex justify-content-between'
        onClick={() => isAddingSong && addMusicToPlaylist(id)}
      >
        <input
          className={`list__name ${
            edit ? 'list__name_edit' : 'list__name_save'
          }`}
          type='text'
          value={listName}
          onChange={onChange}
          disabled={!edit}
          ref={inputValue}
        />
        <div className='list__icons'>
          {edit ? (
            // <Tooltip placement='right' title={'ذخیره'}>
            <IconButton aria-label='save'>
              <CheckRounded />
            </IconButton>
          ) : (
            // </Tooltip>
            // <Tooltip placement='right' title={'تغییر ا سم'}>
            <IconButton aria-label='edit' onClick={editName}>
              <Edit />
            </IconButton>
            // </Tooltip>
          )}

          {/* <Tooltip placement='right' title='حذف لیست'> */}
          <IconButton aria-label='remove' onClick={removeList}>
            <Close />
          </IconButton>
          {/* </Tooltip> */}
        </div>
      </div>
      <Divider />
    </Fragment>
  );
};

export default CenterItem;

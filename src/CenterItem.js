import { Fragment, useContext, useEffect, useRef, useState } from 'react';
import { Divider, IconButton } from '@material-ui/core';
import { CheckRounded, Close, Edit } from '@material-ui/icons';
import appContext from './contexts/appContext';
const CenterItem = ({ name, id, items }) => {
  const { isAddingSong, addMusicToPlaylist } = useContext(appContext);
  const [edit, setEdit] = useState(false);
  const [listName, setListName] = useState(name);
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, [edit, isAddingSong]);
  const editName = () => {
    setEdit(true);
    // console.log(inputRef.current.value);
  };

  const removeList = () => {
    console.log(id);
    // removePlaylist();
  };

  const onChange = (e) => {
    setListName(inputRef.current.value);
  };
  const handleClick = (e) => {
    if (isAddingSong) {
      addMusicToPlaylist(id);
    } else console.log(items);
  };
  return (
    <Fragment>
      <div
        className='list d-flex justify-content-between'
        onClick={() => handleClick()}
        // onClick={() => !isAddingSong && console.log(1)}
      >
        <input
          className={`list__name ${
            edit ? 'list__name_edit' : 'list__name_save'
          }`}
          type='text'
          value={listName}
          onChange={onChange}
          disabled={!edit}
          ref={inputRef}
        />
        <div className='list__icons d-flex'>
          {/* <IconButton aria-label='see'>
            <Visibility className='see' />
            <Audiotrack className='note' />
          </IconButton> */}
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
          </IconButton>{' '}
          {/* </Tooltip> */}
        </div>
      </div>
      <Divider />
    </Fragment>
  );
};

export default CenterItem;

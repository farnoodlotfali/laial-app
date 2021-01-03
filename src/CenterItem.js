import React, { Fragment, useContext, useRef, useState } from 'react';
import { Divider, IconButton, Tooltip } from '@material-ui/core';
import { Close, Edit } from '@material-ui/icons';
import appContext from './contexts/appContext';
const CenterItem = ({ name, id }) => {
  const { ChangeLists, lists } = useContext(appContext);
  const [isEdit, setIsEdit] = useState(true);
  const [listName, setListName] = useState(name);
  let inputRef = useRef();

  const editName = () => {
    // console.log(inputRef.current.focus);
    inputRef.current.focus();
    setIsEdit(!isEdit);
    localStorage.setItem(
      id,
      JSON.stringify({
        name: listName,
        key: id,
        time: Date.now(),
      })
    );

    ChangeLists(
      lists.map((list) => {
        if (list.name === name) {
          list.name = listName;
        }
        return list;
      })
    );
  };

  const removeList = () => {
    // console.log(id);
    localStorage.removeItem(id);
    ChangeLists(
      lists.filter((listCurrent) => {
        return listCurrent.key !== id;
      })
    );
  };

  const onChange = (e) => {
    if (inputRef.current.value !== null) {
      setListName(inputRef.current.value);
      // console.log(listName);
    }
  };
  return (
    <Fragment>
      <div className='list d-flex justify-content-between'>
        <input
          autoFocus
          style={{
            fontSize: isEdit ? '15px' : '18px',
            fontWeight: isEdit ? '400' : '700',
          }}
          type='text'
          value={listName}
          ref={inputRef}
          onChange={onChange}
          disabled={isEdit}
        />
        <div className='list__icons'>
          <Tooltip placement='left' title={isEdit ? 'Edit' : 'Save'}>
            <IconButton aria-label='edit' onClick={editName}>
              <Edit className={!isEdit ? 'text-success' : ''} />
            </IconButton>
          </Tooltip>
          <Tooltip placement='right' title='Remove'>
            <IconButton aria-label='remove' onClick={removeList}>
              <Close />
            </IconButton>
          </Tooltip>
        </div>
      </div>
      <Divider />
    </Fragment>
  );
};

export default CenterItem;

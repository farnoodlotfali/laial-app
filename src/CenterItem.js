import { Fragment, useContext, useEffect, useRef, useState } from "react";
import { Divider, IconButton } from "@material-ui/core";
import { CheckRounded, Close, Edit } from "@material-ui/icons";
import appContext from "./contexts/appContext";
const CenterItem = ({ name, id, items }) => {
  const {
    isAddingSong,
    addMusicToPlaylist,
    updatePlaylistName,
    mainPlaylistId,
    removePlaylist,
  } = useContext(appContext);
  const [edit, setEdit] = useState(false);
  const [listName, setListName] = useState(name);
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, [edit, isAddingSong]);
  const editName = () => {
    setEdit(true);
    // console.log(22);
    // console.log(inputRef.current.value);
  };
  const saveEditedName = () => {
    setEdit(false);
    updatePlaylistName(id, inputRef.current.value);
    // console.log(inputRef.current.value, id);
    // console.log(inputRef.current.value);
  };

  const removeList = () => {
    // console.log(id);
    removePlaylist(id);
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
        className="list d-flex justify-content-between"
        onClick={() => handleClick()}
        // onClick={() => !isAddingSong && console.log(1)}
      >
        <input
          className={` ${edit ? "list__name_edit" : "list__name_save"}`}
          type="text"
          value={listName}
          onChange={onChange}
          disabled={!edit}
          ref={inputRef}
          maxLength={18}
        />
        {/* {mainPlaylistId !== id ? ( */}
        <div className="list__icons d-flex">
          {/* <IconButton aria-label='see'>
            <Visibility className='see' />
            <Audiotrack className='note' />
          </IconButton> */}
          {edit ? (
            // <Tooltip placement='right' title={'ذخیره'}>
            <IconButton aria-label="save" onClick={saveEditedName}>
              <CheckRounded />
            </IconButton>
          ) : (
            // </Tooltip>
            // <Tooltip placement='right' title={'تغییر ا سم'}>
            <IconButton aria-label="edit" onClick={editName}>
              <Edit />
            </IconButton>
            // </Tooltip>
          )}
          {/* <Tooltip placement='right' title='حذف لیست'> */}
          <IconButton aria-label="remove" onClick={removeList}>
            <Close />
          </IconButton>{" "}
          {/* </Tooltip> */}
        </div>
        {/* ) : (
          <span className="align-self-center ml-2 centerItem__info">
            لیست ثابت سایت
          </span>
        )} */}
      </div>
      <Divider />
    </Fragment>
  );
};

export default CenterItem;

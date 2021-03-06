import { Fragment, useContext, useEffect, useRef, useState } from "react";
import { Divider, IconButton } from "@material-ui/core";
import { Add, CheckRounded, Close, Edit } from "@material-ui/icons";
import appContext from "./contexts/appContext";
import playerContext from "./player/playerContext";
import SnackBarComponent from "./snackBarComponent/SnackBarComponent";
const CenterItem = ({ name, id, items }) => {
  const {
    isAddingSong,
    addMusicToPlaylist,
    updatePlaylistName,
    removePlaylist,
    getOnePlayList,
    ChangeShowLeft,
    ChangeshowCenter,
    showCenter,
  } = useContext(appContext);
  const { setPlayList } = useContext(playerContext);
  const [edit, setEdit] = useState(false);
  const [listName, setListName] = useState(name);
  const inputRef = useRef();
  const [showMsg, setShowMsg] = useState({
    showMsg: false,
    msg: " ",
    success: null,
  });
  useEffect(() => {
    inputRef.current.focus();
  }, [edit, isAddingSong]);
  const editName = () => {
    setEdit(true);
  };
  const saveEditedName = () => {
    setEdit(false);
    updatePlaylistName(id, inputRef.current.value);
  };

  const removeList = () => {
    // console.log(id);
    removePlaylist(id);
    // removePlaylist();
  };

  const onChange = (e) => {
    setListName(inputRef.current.value);
  };
  const handleClick = async (e) => {
    if (isAddingSong) {
      const success = await addMusicToPlaylist(id);
      if (success) {
        setShowMsg({
          showMsg: true,
          msg: "مرثیه با موفقیت در لیست اضافه شد",
          success: true,
        });
      } else {
        setShowMsg({
          showMsg: true,
          msg: "این مرثیه در این لیست موجود است",
          success: false,
        });
      }
    } else {
      // console.log(await getOnePlayList(items));
      setPlayList(await getOnePlayList(id), true);
      ChangeshowCenter(showCenter ? false : true);
      ChangeShowLeft(true);
    }
  };
  return (
    <Fragment>
      <SnackBarComponent
        showMsg={showMsg.showMsg}
        setShowMsg={setShowMsg}
        msg={showMsg.msg}
        isSuccess={showMsg.success}
      />
      <div className="list d-flex justify-content-between">
        <div
          onClick={() => handleClick()}
          className="w-100 d-flex align-items-center"
        >
          <input
            className={`  ${edit ? "list__name_edit" : "list__name_save"}`}
            type="text"
            value={listName}
            onChange={onChange}
            disabled={!edit}
            ref={inputRef}
            maxLength={18}
          />
        </div>
        {!isAddingSong ? (
          <div className="list__icons d-flex">
            {edit ? (
              <IconButton aria-label="save" onClick={saveEditedName}>
                <CheckRounded />
              </IconButton>
            ) : (
              <IconButton aria-label="edit" onClick={editName}>
                <Edit />
              </IconButton>
            )}
            <IconButton aria-label="remove" onClick={removeList}>
              <Close />
            </IconButton>
          </div>
        ) : (
          <IconButton aria-label="edit">
            <Add fontSize="default" />
          </IconButton>
        )}
      </div>
      <Divider />
    </Fragment>
  );
};

export default CenterItem;

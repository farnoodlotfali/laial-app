import { IconButton } from "@material-ui/core";
import { CheckRounded, Close, Edit } from "@material-ui/icons";
import { useContext, useEffect, useRef, useState } from "react";
import appContext from "./contexts/appContext";
import playerContext from "./player/playerContext";

const MyProfilemySonglist = ({
  name,
  id,
  setListName,
  setListShow,
  setDeleteBtn,
}) => {
  const inputRef = useRef();

  const {
    getOnePlayList,
    updatePlaylistName,
    removePlaylist,
    changeMyProfilemySonglistId,
    myProfilemySonglistId,
  } = useContext(appContext);
  // const { setPlayList } = useContext(playerContext);

  const [edit, setEdit] = useState(false);
  const [SongListName, setSongListName] = useState(name);
  useEffect(() => {
    inputRef.current.focus();
  }, [edit]);
  const saveEditedName = () => {
    setEdit(false);
    updatePlaylistName(id, inputRef.current.value);
  };
  const editName = () => {
    setEdit(true);
  };

  const removeList = () => {
    // console.log(id);
    removePlaylist(id);
    // removePlaylist();
  };
  const onChange = (e) => {
    setSongListName(inputRef.current.value);
  };

  const handleClick = async () => {
    // console.log(await getOnePlayList(id));
    changeMyProfilemySonglistId(id);
    // setPlayList(await getOnePlayList(id), true);
  };
  return (
    <div
      className={`myProfilemySonglist list__name ${
        myProfilemySonglistId === id ? "list__name_HasBeenChosen" : ""
      }`}
      onClick={() => handleClick()}
    >
      <div
        onClick={async () =>
          !edit &&
          setListShow(await getOnePlayList(id)) &
            setListName(name) &
            setDeleteBtn(true)
        }
      >
        <input
          className={`list__name__innerText ${edit ? "bgwhite" : "bgnormal"}`}
          type="text"
          value={SongListName}
          onChange={onChange}
          disabled={!edit}
          ref={inputRef}
          maxLength={18}
        />
      </div>

      <div className="list__icons d-flex ">
        {edit ? (
          <IconButton aria-label="save" onClick={saveEditedName}>
            <CheckRounded className="list__icons_btn" />
          </IconButton>
        ) : (
          <IconButton aria-label="edit" onClick={editName}>
            <Edit className="list__icons_btn" />
          </IconButton>
        )}
        <IconButton aria-label="remove" onClick={removeList}>
          <Close className="list__icons_btn" />
        </IconButton>
      </div>
    </div>
  );
};

export default MyProfilemySonglist;

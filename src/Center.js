import {
  Backdrop,
  CircularProgress,
  IconButton,
  makeStyles,
  Modal,
  Slide,
} from "@material-ui/core";
// eslint-disable-next-line
import { PostAddRounded } from "@material-ui/icons";
import { useContext, useEffect, useRef, useState } from "react";
import "./Center.css";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import SnackBarComponent from "./snackBarComponent/SnackBarComponent";
import AppContext from "./contexts/appContext";
import CenterItem from "./CenterItem";
import authContext from "./auth/authContext";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  paper: {
    background: "linear-gradient( 135deg, #303030 10%, #05060b 100%)",
    border: "1px solid white",
    cursor: "default",
  },
  content: {
    borderBottom: "2px solid black",
  },
  title: {
    color: "white",
    fontFamily: "vazir",
    direction: "rtl",
    display: "flex",
    borderBottom: "1px solid black",
    paddingBottom: 5,
  },
});

const Center = () => {
  const classes = useStyles();
  const {
    showCenter,
    ChangeshowCenter,
    userPlaylists,
    makeNewPlaylist,
    loading,
    isAddingSong,
    mainPlaylistId,
    ChangeShowCreateList,
    showCreateList,
  } = useContext(AppContext);
  const { user, isAuth } = useContext(authContext);
  // const [open, setOpen] = useState(false);
  const [SongListName, setSongListName] = useState();
  const [showUserlist, setShowUserlist] = useState(true);
  const [showMsg, setShowMsg] = useState({
    showMsg: false,
    msg: " ",
    success: null,
  });
  const inputRef = useRef();

  useEffect(() => {
    // console.log(1112);
    // if (userPlaylists === null && !loading) {
    //   getAllPlaylists();
    // }
    // eslint-disable-next-line
  }, [userPlaylists, loading, showCenter]);

  const addList = () => {
    let i = 0;
    let name = "";
    if (userPlaylists !== null) {
      do {
        i++;
        name = "myList " + i;
        // eslint-disable-next-line
      } while (userPlaylists.findIndex((list) => list.name === name) !== -1);
    } else name = "myList 0";
    // let form = [
    //   {
    //     name: name,
    //     status: "publish",
    //   },
    // ];

    setSongListName(name);

    ChangeShowCreateList(true);
    // makeNewPlaylist(form);
  };

  const handleClose = () => {
    ChangeShowCreateList(false);
  };

  const createList = async () => {
    ChangeShowCreateList(false);

    setShowUserlist(false);
    let form = [
      {
        name: SongListName,
        status: "publish",
      },
    ];
    // makeNewPlaylist(form)

    const success = await makeNewPlaylist(form);

    if (success) {
      setShowMsg({
        showMsg: true,
        msg: "لیست با موفقیت ایجاد گردید",
        success: true,
      });
    } else {
      setShowMsg({
        showMsg: true,
        msg: "ساخت لیست با خطا مواجه شد",
        success: false,
      });
    }
    setTimeout(() => {
      setShowUserlist(true);
    }, 5000);
  };
  // <CircularProgress color="secondary" />

  return (
    <div>
      <SnackBarComponent
        showMsg={showMsg.showMsg}
        setShowMsg={setShowMsg}
        msg={showMsg.msg}
        isSuccess={showMsg.success}
      />

      <div className="center__input_dialog">
        <Dialog
          open={showCreateList}
          onEnter={() => inputRef.current.focus()}
          onClose={handleClose}
          classes={{ paper: classes.paper }}
        >
          <DialogTitle classes={{ root: classes.title }}>
            {"نام لیست خود را وارد کنید"}
          </DialogTitle>
          <DialogContent classes={{ root: classes.content }}>
            <div className="center__input_dialog__div">
              <input
                ref={inputRef}
                className="center__input_dialog__input"
                value={SongListName}
                onChange={(e) => setSongListName(e.target.value)}
                maxLength={18}
              />
              <span className="center__input_dialog__div__warn">
                حداکثر 18 حرف*
              </span>
            </div>
          </DialogContent>
          <DialogActions>
            <span
              className="center__input_dialog__btn"
              onClick={() => handleClose()}
            >
              بستن
            </span>
            <span
              className="center__input_dialog__btn"
              onClick={() => createList()}
            >
              ساخت لیست
            </span>
          </DialogActions>
        </Dialog>
      </div>

      <Modal
        className="modal"
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
          <div className="playlist py-3 pl-1  pr-4 text-white">
            <div className="playlist__title justify-content-center pl-3 d-flex ">
              <div className="title ml-4">
                {isAddingSong ? (
                  <span>مرثیه به کدام لیست اضافه شود؟</span>
                ) : (
                  <span>لیست های من</span>
                )}
              </div>
            </div>
            <div className="my-2 ml-4 playlist__line" />
            <div className="playlist__lists">
              {user === null && !isAuth ? (
                <div className="show__login ">
                  <span className="show__login__msg">
                    برای ساخت لیست، لطفا ثبت نام کنید
                  </span>
                  <Link
                    className="btn btn-secondary ml-3"
                    to="/login"
                    // onClick={() => ChangeShowRight(false)}
                  >
                    ثبت نام
                  </Link>
                </div>
              ) : !showUserlist || userPlaylists === null ? (
                <div className="h-100 d-flex align-items-center justify-content-center">
                  <CircularProgress color="inherit" />
                </div>
              ) : (
                userPlaylists !== null &&
                userPlaylists.map(
                  (list) =>
                    mainPlaylistId !== list.id && (
                      <CenterItem
                        key={list.id}
                        name={list.name}
                        id={list.id}
                        items={list.items}
                      />
                    )
                )
              )}
            </div>
            {user !== null && isAuth && (
              <div
                className="addBtn  d-flex"
                onClick={() => userPlaylists !== null && addList()}
              >
                <span className=" align-self-center m-0 make__new__list">
                  {userPlaylists !== null ? "ساخت لیست جدید" : "صبر کنید"}
                </span>
                {/* <Tooltip placement='left' title='لیست جدید'> */}
                <IconButton aria-label="add">
                  <PostAddRounded fontSize="large" />
                </IconButton>
                {/* </Tooltip> */}
              </div>
            )}
          </div>
        </Slide>
      </Modal>
    </div>
  );
};

export default Center;

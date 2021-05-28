import { Backdrop, IconButton, Modal, Slide } from "@material-ui/core";
// eslint-disable-next-line
import { PostAddRounded } from "@material-ui/icons";
import { useContext, useEffect } from "react";
import "./Center.css";
// eslint-disable-next-line
// import md5 from 'md5';
import AppContext from "./contexts/appContext";
import CenterItem from "./CenterItem";
import authContext from "./auth/authContext";
const Center = () => {
  const {
    showCenter,
    ChangeshowCenter,
    userPlaylists,
    makeNewPlaylist,
    loading,
    isAddingSong,
    mainPlaylistId,
  } = useContext(AppContext);
  const { user, isAuth } = useContext(authContext);

  useEffect(() => {
    // console.log(1112);
    // if (userPlaylists === null && !loading) {
    //   getAllPlaylists();
    // }
    // eslint-disable-next-line
  }, [userPlaylists, loading, showCenter]);

  const addList = () => {
    /*let d = new Date();
    let key ='list-'+d.getFullYear()+'-' +d.getMonth()+'-' +d.getDay()+'-'+d.getHours()+'-'+d.getMinutes()+'-'+d.getSeconds()+'-'+md5(Date.now());*/
    let i = 0;
    let name = "";
    if (userPlaylists !== null) {
      do {
        i++;
        name = "myList " + i;
        // eslint-disable-next-line
      } while (userPlaylists.findIndex((list) => list.name === name) !== -1);
    } else name = "myList 0";

    // console.log(name);
    let form = [
      {
        name: name,
        status: "publish",
      },
    ];
    makeNewPlaylist(form);
  };

  return (
    <div>
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
              {/* <div className='addBtn'>
                <Tooltip placement='left' title='لیست جدید'>
                  <IconButton aria-label='add' onClick={addList}>
                    <PostAddRounded fontSize='large' />
                  </IconButton>
                </Tooltip>
              </div>
            
             */}
            </div>
            <div className="my-2 ml-4 playlist__line" />
            <div className="playlist__lists">
              {user === null && !isAuth ? (
                <div className="show__login text-center">
                  برای ساخت لیست، لطفا ثبت نام کنید
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
              <div className="addBtn  d-flex" onClick={addList}>
                <span className=" align-self-center m-0 make__new__list">
                  ساخت لیست جدید
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

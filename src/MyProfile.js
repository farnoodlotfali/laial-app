import "./MyProfile.css";
import defualtPhoto from "./assets/defualtPhoto.jpeg";
import { useContext, useEffect, useState } from "react";
import authContext from "./auth/authContext";
import { DeleteRounded, ExpandMoreRounded } from "@material-ui/icons";
import appContext from "./contexts/appContext";
import { useHistory } from "react-router";
import { Button, Modal } from "react-bootstrap";
import SpinnerOnUserPlaylist from "./spinner/SpinnerOnUserPlaylist";
import { Dropdown } from "react-bootstrap";

const MyProfile = () => {
  const { user } = useContext(authContext);
  const [listShow, setListShow] = useState(null);
  const [deleteBtn, setDeleteBtn] = useState(false);
  const hisotry = useHistory();
  useEffect(() => {
    // loadUser();
    if (user === null) {
      hisotry.push("/");
    }
    // console.log(listShow);
    // eslint-disable-next-line
  }, [user, listShow]);
  const {
    userPlaylists,
    // eslint-disable-next-line
    mainPlaylistId,
    getOnePlayList,
    changeCurrentPassword,
    loadingOnUserPlaylist,
    removeSongFromPlaylist,
  } = useContext(appContext);
  const [passwordMsg, setPasswordMsg] = useState("");

  const [changePassword, setchangePassword] = useState({
    currentPassword: "",
    changePassword1: "",
    changePassword2: "",
  });
  const { currentPassword, changePassword1, changePassword2 } = changePassword;
  const changePasswordMsg = (msg) => {
    setPasswordMsg(msg);
    setTimeout(() => {
      setPasswordMsg("");
      setPasswordModal(false);
      setchangePassword({
        currentPassword: "",
        changePassword1: "",
        changePassword2: "",
      });
    }, 3000);
  };
  const onchange = (e) => {
    setchangePassword({
      ...changePassword,
      [e.target.name]: e.target.value,
    });
  };
  const [passwordModal, setPasswordModal] = useState(false);
  const [listname, setListName] = useState("");

  const truncate = (str, no_words) => {
    return str?.split(" ").splice(0, no_words).join(" ");
  };
  const zeroPad = (num, places) => String(num).padStart(places, "0");
  return (
    <div className="myprofile">
      {user && (
        <div>
          <div className="myprofile__top ">
            {/* mobile ratio */}
            <div className="myprofile__mobile__show">
              <div className="myprofile__mobile__show__right">
                <div className="myprofile__mobile__show__userImg ">
                  <img src={defualtPhoto} alt="userImg" />
                </div>
                <div className="myprofile__mobile__show__changeCurrentPass">
                  <Button
                    variant="primary"
                    onClick={() => setPasswordModal(true)}
                  >
                    تغییر رمز
                  </Button>
                </div>
              </div>
              <div className="myprofile__mobile__show__left">
                <div className="myprofile__mobile__show__userinfo">
                  <div className="myprofile__mobile__show__userinfo__inputbox">
                    <label> نام : </label>
                    <span> {user.first_name} </span>
                  </div>
                  <div className="myprofile__mobile__show__userinfo__inputbox">
                    <label> نام خانوادگی :</label>
                    <span>{user.last_name}</span>
                  </div>
                  <div className="myprofile__mobile__show__userinfo__inputbox">
                    <label> ایمیل :</label>
                    <span>{user.email} </span>
                  </div>
                  <div className="myprofile__mobile__show__userinfo__inputbox">
                    <label> نام کاربری :</label>
                    <span>{user.username} </span>
                  </div>
                </div>
              </div>
            </div>
            {/* web ratio */}
            <div className="userImg ">
              <img src={defualtPhoto} alt="userImg" />
            </div>
            <div className="userinfo d-flex">
              <div className="userinfo__inputbox">
                <label> نام </label>
                <span>{user.first_name} </span>
              </div>
              <div className="userinfo__inputbox">
                <label> نام خانوادگی</label>
                <span>{user.last_name}</span>
              </div>
              <div className="userinfo__inputbox">
                <label> ایمیل</label>
                <span>{user.email} </span>
              </div>
              <div className="userinfo__inputbox">
                <label> نام کاربری</label>
                <span>{user.username} </span>
              </div>
            </div>
            <div className="changeCurrentPass">
              <div className="changeCurrentPassBtn">
                <Button
                  variant="primary"
                  onClick={() => setPasswordModal(true)}
                >
                  تغییر رمز
                </Button>
              </div>

              <Modal
                show={passwordModal}
                onHide={() =>
                  setPasswordModal(false) &
                  setchangePassword({
                    currentPassword: "",
                    changePassword1: "",
                    changePassword2: "",
                  })
                }
                className="passModal"
              >
                <Modal.Header className="modalHeaderPass">
                  <Modal.Title className="modalTitlePass">
                    تغییر رمز عبور
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body className="modalBodyPass">
                  <input
                    onChange={onchange}
                    name="currentPassword"
                    type="password"
                    value={currentPassword}
                    placeholder="رمز فعلی"
                  />
                  <input
                    name="changePassword1"
                    onChange={onchange}
                    value={changePassword1}
                    type="text"
                    minLength="8"
                    placeholder="رمز جدید"
                  />
                  <input
                    name="changePassword2"
                    onChange={onchange}
                    value={changePassword2}
                    type="text"
                    minLength="8"
                    placeholder="تکرار رمز جدید "
                  />
                  {/* </form> */}
                  <div className="changePass_error">{passwordMsg}</div>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    className="modalCloseBtn"
                    onClick={() => setPasswordModal(false)}
                  >
                    بستن
                  </Button>
                  <Button
                    className="modalSaveBtn"
                    type="submit"
                    onClick={async () => {
                      if (changePassword1 !== changePassword2) {
                        changePasswordMsg("رمز اول با رمز دوم تطابق ندارد");
                      } else {
                        const status = await changeCurrentPassword(
                          currentPassword,
                          changePassword1
                        );
                        if (status === 200) {
                          changePasswordMsg("!با موفقیت رمز تغییر یافت");
                        } else {
                          changePasswordMsg("!خطا");
                        }
                      }
                    }}
                  >
                    ذخیره رمز
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
          <div className="myprofile__bottom ">
            {/* mobile ratio */}
            <div className="myprofile__mobile__songs">
              <div className="myprofile__mobile__songs__options">
                <div className="myprofile__mobile__songs__myListsOption">
                  <span>آهنگ های لایک شده</span>
                </div>
                <div className="myprofile__mobile__songs__myListsOption">
                  <span> اخیرا شنیده شده</span>
                </div>
                <div
                  className="myprofile__mobile__songs__myListsOption"
                  onClick={async () =>
                    setListShow(await getOnePlayList(mainPlaylistId)) &
                    setDeleteBtn(false)
                  }
                >
                  <span> آهنگ های منتخب سایت</span>
                </div>
                <div className="myprofile__mobile__songs__myListsOption">
                  <Dropdown>
                    <Dropdown.Toggle className="myprofile__mobile__songs__myListsOptionBtn">
                      <div className="myMadeListShow__title__span">
                        نام لیست : {listname}
                      </div>
                      <ExpandMoreRounded />
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="myprofile__mobile__songs__mySongs">
                      {userPlaylists?.map(
                        (item, i) =>
                          mainPlaylistId !== item.id && (
                            <Dropdown.Item
                              key={i}
                              onClick={async () =>
                                setListShow(await getOnePlayList(item.id)) &
                                setListName(item.name) &
                                // console.log(listShow) &
                                setDeleteBtn(true)
                              }
                            >
                              {item.name}
                            </Dropdown.Item>
                          )
                      )}
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
              <div
                className={`listItemsShow ${
                  loadingOnUserPlaylist ? "listItemsShow__loading" : ""
                }`}
              >
                {loadingOnUserPlaylist ? (
                  <SpinnerOnUserPlaylist />
                ) : listShow === null || listShow.length === 0 ? (
                  <div className="none  text-light">لیست خالی است</div>
                ) : (
                  listShow.map(
                    (item) => console.log(item?.post)
                    // <div className="song d-flex" key={item?.id}>
                    //   <div className="songImg">
                    //     <img
                    //       src={
                    //         item?.post?.media?.[0]?.image !== null &&
                    //         item?.post?.media?.[0]?.image !== undefined
                    //           ? item?.post?.media?.[0]?.image
                    //           : item?.post?.person?.[0]?.image
                    //               .full_image_url !== null
                    //           ? item?.post?.person?.[0]?.image.full_image_url
                    //           : defualtPhoto
                    //       }
                    //       alt="songlogo"
                    //     />
                    //   </div>
                    //   <div className="songInfo">
                    //     <span className="songName">
                    //       {truncate(item?.post?.media?.[0]?.name, 4)}
                    //     </span>
                    //     <span className="songSinger">
                    //       {item?.post?.person?.[0]?.name}
                    //     </span>
                    //   </div>
                    //   <div className="songTime">
                    //     <span>
                    //       {item?.post?.media?.[0]?.duration &&
                    //         Math.floor(item?.post?.media?.[0]?.duration / 60) +
                    //           ":" +
                    //           zeroPad(
                    //             Math.floor(
                    //               item?.post?.media?.[0]?.duration % 60
                    //             ),
                    //             2
                    //           )}
                    //     </span>
                    //     {deleteBtn && (
                    //       <div
                    //         className="listItemsShow__delete"
                    //         onClick={() =>
                    //           removeSongFromPlaylist(
                    //             item?.post?.PostIdForDeleteFromUserPlaylist
                    //           )
                    //         }
                    //       >
                    //         <DeleteRounded />
                    //       </div>
                    //     )}
                    //   </div>
                    // </div>
                  )
                )}
              </div>
            </div>
            {/* web ratio */}
            <div className="myListsBtn">
              {/* <div className='myListsOption'>
            <span> لیست های ساختگی من</span>
          </div> */}
              <div className="myListsOption">
                <span>آهنگ های لایک شده</span>
              </div>
              <div className="myListsOption">
                <span> اخیرا شنیده شده</span>
              </div>
              <div
                className="myListsOption"
                onClick={async () =>
                  setListShow(await getOnePlayList(mainPlaylistId)) &
                  setDeleteBtn(false)
                }
              >
                <span> آهنگ های منتخب سایت</span>
              </div>
            </div>
            <div className="listShow d-flex">
              <div className="myMadeListsShow">
                <div className="myMadeListShow__title">
                  <span className="align-self-center myMadeListShow__title__span">
                    نام لیست : {listname}
                  </span>
                  <span className="playListBtn">پخش</span>
                </div>
                <div className="myMadeListsShow__lists py-3">
                  {userPlaylists?.map(
                    (item, i) =>
                      mainPlaylistId !== item.id && (
                        <div
                          className="list__name"
                          key={i}
                          onClick={async () =>
                            setListShow(await getOnePlayList(item.id)) &
                            setListName(item.name) &
                            setDeleteBtn(true)
                          }
                        >
                          {item.name}
                        </div>
                      )
                  )}
                </div>
              </div>
              <div
                className={`listItemsShow ${
                  loadingOnUserPlaylist ? "listItemsShow__loading" : ""
                }`}
              >
                {loadingOnUserPlaylist ? (
                  <SpinnerOnUserPlaylist />
                ) : listShow === null || listShow.length === 0 ? (
                  <div className="none  text-light">لیست خالی است</div>
                ) : (
                  listShow.map((item) => (
                    <div className="song d-flex" key={item?.id}>
                      <div className="songImg">
                        <img
                          src={
                            item?.post?.media?.[0]?.image !== null &&
                            item?.post?.media?.[0]?.image !== undefined
                              ? item?.post?.media?.[0]?.image
                              : item?.post?.person?.[0]?.image
                                  .full_image_url !== null
                              ? item?.post?.person?.[0]?.image.full_image_url
                              : defualtPhoto
                          }
                          alt="songlogo"
                        />
                      </div>
                      <div className="songInfo">
                        <span className="songName">
                          {truncate(item?.post?.media?.[0]?.name, 4)}
                        </span>
                        <span className="songSinger">
                          {item?.post?.person?.[0]?.name}
                        </span>
                      </div>
                      <div className="songTime">
                        <span>
                          {item?.post?.media?.[0]?.duration &&
                            Math.floor(item?.post?.media?.[0]?.duration / 60) +
                              ":" +
                              zeroPad(
                                Math.floor(
                                  item?.post?.media?.[0]?.duration % 60
                                ),
                                2
                              )}
                        </span>
                        {deleteBtn && (
                          <div
                            className="listItemsShow__delete"
                            onClick={() =>
                              removeSongFromPlaylist(
                                item?.post?.PostIdForDeleteFromUserPlaylist
                              )
                            }
                          >
                            <DeleteRounded />
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProfile;

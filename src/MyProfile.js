import "./MyProfile.css";
import logo from "./assets/defualtPhoto.jpeg";
import { useContext, useEffect, useState } from "react";
import authContext from "./auth/authContext";
import { DeleteRounded, ExpandMoreRounded } from "@material-ui/icons";
import appContext from "./contexts/appContext";
import { useHistory } from "react-router";
import { Button, Modal } from "react-bootstrap";
import SpinnerOnUserPlaylist from "./spinner/SpinnerOnUserPlaylist";
import { Dropdown } from "react-bootstrap";

const MyProfile = () => {
  const { user, loadUser } = useContext(authContext);
  const [listShow, setListShow] = useState(null);
  const [deleteBtn, setDeleteBtn] = useState(false);
  const hisotry = useHistory();
  useEffect(() => {
    loadUser();
    if (user === null) {
      hisotry.push("/");
    }
    // eslint-disable-next-line
  }, [user, listShow]);
  const {
    userPlaylists,
    // eslint-disable-next-line
    mainPlaylistId,
    getOnePlayList,
    changeCurrentPassword,
    loadingOnUserPlaylist,
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
            <div className="myprofile__mobile__show">
              <div className="myprofile__mobile__show__right">
                <div className="myprofile__mobile__show__userImg ">
                  <img src={logo} alt="userImg" />
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
            <div className="userImg ">
              <img src={logo} alt="userImg" />
            </div>
            <div className="userinfo d-flex">
              <div className="userinfo__inputbox">
                <label> نام </label>
                {/* <input value={user.first_name} type='text' disabled /> */}
                <span>{user.first_name} </span>
              </div>
              <div className="userinfo__inputbox">
                <label> نام خانوادگی</label>
                <span>{user.last_name}</span>

                {/* <input value={user.last_name} type="text" disabled /> */}
              </div>
              <div className="userinfo__inputbox">
                <label> ایمیل</label>
                <span>{user.email} </span>

                {/* <input value={user.email} type="email" disabled /> */}
              </div>
              <div className="userinfo__inputbox">
                <label> نام کاربری</label>
                <span>{user.username} </span>

                {/* <input value={user.username} type="text" disabled /> */}
              </div>
            </div>
            <div className="changeCurrentPass">
              {/* `<div className="userImg ">
                <img src={logo} alt="userImg" />
              </div>` */}
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
                  {/* <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (changePassword1 !== changePassword2) {
                        passNotSame();
                      } else {
                        changeCurrentPassword(currentPassword, changePassword1);
                      }
                    }}
                  > */}
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
                  listShow.map((item) => (
                    <div className="song d-flex" key={item.id}>
                      <div className="songImg">
                        <img src={logo} alt="songlogo" />
                      </div>
                      <div className="songInfo">
                        <span className="songName">
                          {truncate(item?.fileItem.name, 4)}
                        </span>
                        <span className="songSinger">
                          {item.fileItem?.person?.name}
                        </span>
                      </div>
                      <div className="songTime">
                        <span>
                          {Math.floor(item?.fileItem.duration / 60) +
                            ":" +
                            zeroPad(
                              Math.floor(item?.fileItem.duration % 60),
                              2
                            )}
                        </span>
                        {deleteBtn && <DeleteRounded />}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
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
                  {/* <span className='showListBtn'>نمایش لیست</span> */}
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
                    <div className="song d-flex" key={item.id}>
                      <div className="songImg">
                        <img src={logo} alt="songlogo" />
                      </div>
                      <div className="songInfo">
                        <span className="songName">
                          {truncate(item?.fileItem.name, 4)}
                        </span>
                        <span className="songSinger">
                          {item.fileItem?.person?.name}
                        </span>
                      </div>
                      <div className="songTime">
                        <span>
                          {Math.floor(item?.fileItem.duration / 60) +
                            ":" +
                            zeroPad(
                              Math.floor(item?.fileItem.duration % 60),
                              2
                            )}
                        </span>
                        {deleteBtn && <DeleteRounded />}
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

// const MyProfile = () => {
//   const { user, loadUser } = useContext(authContext);
//   const { userPlaylists, mainPlaylistId } = useContext(appContext);
//   const [listShow, setlistShow] = useState(null);
//   let history = useHistory();

//   useEffect(() => {
//     loadUser();
//     if (user === null) {
//       // props.history.back();
//       history.push('/');
//     }
//   }, [listShow, user, history]);
//   const [changePassword, setchangePassword] = useState({
//     currentPassword: '',
//     changePassword1: '',
//     changePassword2: '',
//   });
//   const onchange = (e) => {
//     setchangePassword({
//       ...changePassword,
//       [e.target.name]: e.target.value,
//     });
//   };
//   const changeListShow = (newlist) => {
//     setlistShow(newlist);
//   };
//   return (
//     user && (
//       <div className='myProfile text-light'>
//         <div className='myProfile__content'>
//           <div className='photo__onMobile'>
//             <div className='photo__lines'>
//               <img src={logo} alt='' className='rounded-circle' />
//             </div>
//           </div>
//           <div className='myProfile__content__left'>
//             <div className='myProfile__content__left__title'>
//               <h3>لیست های من</h3>
//             </div>
//             <div className='myProfile__allAndShow'>
//               <div className='myProfile__list__all '>
//                 {/* <div className='myProfile__content__left__lists'> */}
//                 <div className='dropdown'>
//                   <button
//                     className='btn text-light user_btn '
//                     type='button'
//                     id='dropdownMenuButton'
//                     data-toggle='dropdown'
//                     aria-haspopup='true'
//                     aria-expanded='false'
//                   >
//                     <div className='myProfile__list'>
//                       <span> لیست های ساختگی من</span>
//                     </div>
//                   </button>

//                   <div
//                     className='dropdown-menu'
//                     aria-labelledby='dropdownMenuButton'
//                   >
//                     {userPlaylists?.map((item, i) => {
//                       return (
//                         <div
//                           key={i}
//                           className='dropdown-item'
//                           onClick={() =>
//                             changeListShow(item.items) & console.log(item)
//                           }
//                         >
//                           <span>{item.name}</span>
//                           {mainPlaylistId !== item.id ? (
//                             <DeleteRounded />
//                           ) : (
//                             <span className='align-self-center ml-2 centerItem__info'>
//                               لیست ثابت سایت
//                             </span>
//                           )}
//                         </div>
//                       );
//                     })}
//                   </div>
//                 </div>
//                 <div className='myProfile__list'>
//                   <span>اخیرا شنیده شده</span>
//                 </div>{' '}
//                 {/* </div> */}
//                 {/* <div className='myProfile__content__left__lists'> */}
//                 <div className='myProfile__list'>
//                   <span>آهنگ های لایک شده</span>
//                 </div>
//                 <div
//                   className='myProfile__list'
//                   onClick={() =>
//                     userPlaylists?.map((item) => {
//                       if (item.id === mainPlaylistId) {
//                         changeListShow(item.items);
//                       }
//                     })
//                   }
//                 >
//                   <span>آهنگ های انتخاب شده سایت</span>
//                 </div>
//                 {/* </div> */}
//               </div>
//               <div className='myProfile__list__show'>
//                 {listShow && listShow.length === 0 ? (
//                   <div className='none text-light'>لیست خالی است</div>
//                 ) : (
//                   listShow?.map((item, i) => {
//                     return (
//                       <div
//                         key={item.id}
//                         className='myProfile__song__info justify-content-between'
//                       >
//                         <div className='d-flex'>
//                           <div className='number     align-self-center'>
//                             {i + 1}
//                           </div>
//                           <div className='song__img'>
//                             <img src={logo} alt='' />
//                           </div>
//                           <span className='myProfile__song__info__singer align-self-center'>
//                             mammd
//                           </span>
//                         </div>
//                         <div className='myProfile__song__info__names'>
//                           <span className='myProfile__song__info__name align-self-end'>
//                             {item.fileItem?.name}
//                           </span>
//                         </div>
//                         <div className='d-flex align-self-center'>
//                           <div className='myProfile__song__info__time'>
//                             3:26
//                           </div>
//                           <div className=''>
//                             <DeleteRounded />
//                           </div>
//                         </div>
//                       </div>
//                     );
//                   })
//                 )}
//               </div>
//             </div>
//           </div>

//           <div className='myProfile__imgAndPass '>
//             <div className='myProfile__img'>
//               <img src={logo} alt='' className='rounded-circle' />
//             </div>

//             <div className='choose__photo'>
//               <label htmlFor='myfile'>انتخاب عکس</label>
//               <input type='file' id='myfile' name='myfile' />
//             </div>
//           </div>
//           <div className='myProfile__content__right'>
//             <div className='myProfile__content__left__title'>
//               <h3> اطلاعات من</h3>
//             </div>
//             <form>
//               <div className='d-flex form__names'>
//                 <div className='inputBox'>
//                   <label>نام</label>
//                   <input
//                     name='firstname'
//                     value={user.first_name}
//                     type='text'
//                     disabled
//                     // placeholder='نام '
//                   />
//                 </div>{' '}
//                 <div className='inputBox'>
//                   <label> نام خانوادگی</label>

//                   <input
//                     // onChange={onchange}
//                     name='username'
//                     // value={username}
//                     type='text'
//                     value={user.last_name}
//                     disabled
//                     //  placeholder='Username'
//                   />
//                 </div>{' '}
//               </div>
//               <div className='d-flex form__names'>
//                 <div className='inputBox'>
//                   <label>ایمیل</label>

//                   <input
//                     // onChange={onchange}
//                     name='username'
//                     // value={username}
//                     type='email'
//                     value={user.email}
//                     disabled
//                     //  placeholder='Username'
//                   />
//                 </div>{' '}
//                 <div className='inputBox'>
//                   <label>نام کاربری</label>

//                   <input
//                     // onChange={onchange}
//                     name='username'
//                     // value={username}
//                     value={user.username}
//                     type='text'
//                     disabled
//                     //  placeholder='Username'
//                   />
//                 </div>
//               </div>
//             </form>

//             <div className='myProfile__reset__password'>
//               <div className='myProfile__reset__password__title'>
//                 <h4>تغییر رمز عبور</h4>
//               </div>

//               <form action=''>
//                 <div className='inputBox'>
//                   <input
//                     onChange={onchange}
//                     name='currentPassword'
//                     type='password'
//                     placeholder='رمز فعلی'
//                   />
//                 </div>
//                 <div className='inputBox'>
//                   <input
//                     name='changePassword1'
//                     onChange={onchange}
//                     type='text'
//                     minLength='8'
//                     required
//                     placeholder='رمز جدید'
//                   />
//                 </div>{' '}
//                 <div className='inputBox'>
//                   <input
//                     onChange={onchange}
//                     name='changePassword2'
//                     type='text'
//                     minLength='8'
//                     required
//                     placeholder='تکرار رمز جدید '
//                   />
//                 </div>
//                 <div className='inputBox'>
//                   <input
//                     type='submit'
//                     value='تغییر رمز '
//                     // value='Register'
//                   />
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//         Nobis fugiat eos quod qui consequatur impedit maiores, obcaecati,
//         voluptatem quasi aliquid cupiditate iste in itaque necessitatibus
//         sapiente possimus ipsum enim. Amet porro quos quis qui neque eius
//         exercitationem aut quam. Odit natus iusto veritatis minus, perspiciatis
//         unde laborum modi quae quo ab, officia blanditiis necessitatibus libero
//         atque. Facere, odit officiis?
//       </div>
//     )
//   );
// };

export default MyProfile;

import './MyProfile.css';
import logo from './assets/defualtPhoto.jpeg';
import { useContext, useEffect, useState } from 'react';
import authContext from './auth/authContext';
import { DeleteRounded } from '@material-ui/icons';
import appContext from './contexts/appContext';
import { useHistory } from 'react-router';
const MyProfile = () => {
  const { user, loadUser } = useContext(authContext);
  const { userPlaylists, mainPlaylistId } = useContext(appContext);
  const [listShow, setlistShow] = useState(null);
  let history = useHistory();

  useEffect(() => {
    loadUser();
    if (user === null) {
      // props.history.back();
      history.push('/');
    }
  }, [listShow, user, history]);
  const [changePassword, setchangePassword] = useState({
    currentPassword: '',
    changePassword1: '',
    changePassword2: '',
  });
  const onchange = (e) => {
    setchangePassword({
      ...changePassword,
      [e.target.name]: e.target.value,
    });
  };
  const changeListShow = (newlist) => {
    setlistShow(newlist);
  };
  return (
    user && (
      <div className='myProfile text-light'>
        <div className='myProfile__content'>
          <div className='photo__onMobile'>
            <div className='photo__lines'>
              <img src={logo} alt='' className='rounded-circle' />
            </div>
          </div>
          <div className='myProfile__content__left'>
            <div className='myProfile__content__left__title'>
              <h3>لیست های من</h3>
            </div>
            <div className='myProfile__allAndShow'>
              <div className='myProfile__list__all '>
                {/* <div className='myProfile__content__left__lists'> */}
                <div className='dropdown'>
                  <button
                    className='btn text-light user_btn '
                    type='button'
                    id='dropdownMenuButton'
                    data-toggle='dropdown'
                    aria-haspopup='true'
                    aria-expanded='false'
                  >
                    <div className='myProfile__list'>
                      <span> لیست های ساختگی من</span>
                    </div>
                  </button>

                  <div
                    className='dropdown-menu'
                    aria-labelledby='dropdownMenuButton'
                  >
                    {userPlaylists?.map((item, i) => {
                      return (
                        <div
                          key={i}
                          className='dropdown-item'
                          onClick={() => changeListShow(item.items)}
                        >
                          {item.name}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className='myProfile__list'>
                  <span>اخیرا شنیده شده</span>
                </div>{' '}
                {/* </div> */}
                {/* <div className='myProfile__content__left__lists'> */}
                <div className='myProfile__list'>
                  <span>آهنگ های لایک شده</span>
                </div>
                <div
                  className='myProfile__list'
                  onClick={() =>
                    userPlaylists?.map((item) => {
                      if (item.id === mainPlaylistId) {
                        changeListShow(item.items);
                      }
                    })
                  }
                >
                  <span>آهنگ های انتخاب شده سایت</span>
                </div>
                {/* </div> */}
              </div>
              <div className='myProfile__list__show'>
                {listShow && listShow.length === 0 ? (
                  <div className='none text-light'>لیست خالی است</div>
                ) : (
                  listShow?.map((item, i) => {
                    return (
                      <div
                        key={item.id}
                        className='myProfile__song__info justify-content-between'
                      >
                        <div className='d-flex'>
                          <div className='number     align-self-center'>
                            {i + 1}
                          </div>
                          <div className='song__img'>
                            <img src={logo} alt='' />
                          </div>
                          <span className='myProfile__song__info__singer align-self-center'>
                            mammd
                          </span>
                        </div>
                        <div className='myProfile__song__info__names'>
                          <span className='myProfile__song__info__name align-self-end'>
                            {item.fileItem?.name}
                          </span>
                        </div>
                        <div className='d-flex align-self-center'>
                          <div className='myProfile__song__info__time'>
                            3:26
                          </div>
                          <div className=''>
                            <DeleteRounded />
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>

          <div className='myProfile__imgAndPass '>
            <div className='myProfile__img'>
              <img src={logo} alt='' className='rounded-circle' />
            </div>

            <div className='choose__photo'>
              <label htmlFor='myfile'>انتخاب عکس</label>
              <input type='file' id='myfile' name='myfile' />
            </div>
          </div>
          <div className='myProfile__content__right'>
            <div className='myProfile__content__left__title'>
              <h3> اطلاعات من</h3>
            </div>
            <form>
              <div className='d-flex form__names'>
                <div className='inputBox'>
                  <label>نام</label>
                  <input
                    name='firstname'
                    value={user.first_name}
                    type='text'
                    disabled
                    // placeholder='نام '
                  />
                </div>{' '}
                <div className='inputBox'>
                  <label> نام خانوادگی</label>

                  <input
                    // onChange={onchange}
                    name='username'
                    // value={username}
                    type='text'
                    value={user.last_name}
                    disabled
                    //  placeholder='Username'
                  />
                </div>{' '}
              </div>
              <div className='d-flex form__names'>
                <div className='inputBox'>
                  <label>ایمیل</label>

                  <input
                    // onChange={onchange}
                    name='username'
                    // value={username}
                    type='email'
                    value={user.email}
                    disabled
                    //  placeholder='Username'
                  />
                </div>{' '}
                <div className='inputBox'>
                  <label>نام کاربری</label>

                  <input
                    // onChange={onchange}
                    name='username'
                    // value={username}
                    value={user.username}
                    type='text'
                    disabled
                    //  placeholder='Username'
                  />
                </div>
              </div>
            </form>

            <div className='myProfile__reset__password'>
              <div className='myProfile__reset__password__title'>
                <h4>تغییر رمز عبور</h4>
              </div>

              <form action=''>
                <div className='inputBox'>
                  <input
                    onChange={onchange}
                    name='currentPassword'
                    type='password'
                    placeholder='رمز فعلی'
                  />
                </div>
                <div className='inputBox'>
                  <input
                    name='changePassword1'
                    onChange={onchange}
                    type='text'
                    minLength='8'
                    required
                    placeholder='رمز جدید'
                  />
                </div>{' '}
                <div className='inputBox'>
                  <input
                    onChange={onchange}
                    name='changePassword2'
                    type='text'
                    minLength='8'
                    required
                    placeholder='تکرار رمز جدید '
                  />
                </div>
                <div className='inputBox'>
                  <input
                    type='submit'
                    value='تغییر رمز '
                    // value='Register'
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
        Nobis fugiat eos quod qui consequatur impedit maiores, obcaecati,
        voluptatem quasi aliquid cupiditate iste in itaque necessitatibus
        sapiente possimus ipsum enim. Amet porro quos quis qui neque eius
        exercitationem aut quam. Odit natus iusto veritatis minus, perspiciatis
        unde laborum modi quae quo ab, officia blanditiis necessitatibus libero
        atque. Facere, odit officiis?
      </div>
    )
  );
};

export default MyProfile;

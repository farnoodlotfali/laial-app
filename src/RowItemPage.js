import { Divider, IconButton, Tooltip } from '@material-ui/core';
import {
  Favorite,
  GetAppRounded,
  PlayArrowRounded,
  PlaylistAdd,
  Visibility,
} from '@material-ui/icons';
import { useContext, useEffect } from 'react';
import { useParams } from 'react-router';
import axios from './axios/axios';
import AppContext from './contexts/appContext';
import playerContext from './player/playerContext';
import './RowItemPage.css';
import Flickity from 'react-flickity-component';
import Spinner from './spinner/Spinner';
import RowItem from './RowItem';
import authContext from './auth/authContext';
import { Button, Modal } from 'react-bootstrap';
import { useState } from 'react';
import { Link } from 'react-router-dom';
const urls = [
  {
    url:
      'https://dl.ganja2music.com/Ganja2Music/128/Archive/B/Behnam%20Bani/Single/Behnam%20Bani%20-%20Khoshhalam%20(128).mp3',
    name: 'rewq',
    id: 111,
  },
  {
    url:
      'https://files.musico.ir/Song/Ehsan%20Daryadel%20-%20Koochamoon%20(320).mp3',
    name: 'darya',
    id: 323,
  },
  {
    url: 'http://dl.musicdam.net/Downloads/mp3/Hayedeh%20-%20Soghati%20128.mp3',
    name: 'hayde2',
    id: 881,
  },
  {
    url:
      'http://dl.musicdam.net/Downloads/mp3/Hayedeh%20-%20Bordi%20Az%20Yadam%20128.mp3',
    name: 'darya1',
    id: 413,
  },
  {
    url:
      'http://dl.musicdam.net/Downloads/mp3/Hayedeh%20-%20Badeh%20Foroosh%20128.mp3',
    name: 'hayde1',
    id: 901,
  },
];
const RowItemPage = () => {
  const [show, setShow] = useState(false);
  const [userInfo, setUserInfo] = useState({
    username: '',
    email: '',
    password: '',
  });
  const { username, email, password } = userInfo;

  const flickityOptions = {
    // initialIndex: 2,
    contain: true,
    prevNextButtons: false,
    pageDots: false,
    rightToLeft: true,
  };
  const {
    ChangeShowMusic,
    showMusic,
    getSongPage,
    dataSongPage,
    viewPage,
    loading,
    downloadUrl,
    viewsPage,
    like,
    getRecommender,
    recommender,
    likeSong,
  } = useContext(AppContext);
  const { setUrl, playMusic, setIds } = useContext(playerContext);
  const { error, login, loadUser, user } = useContext(authContext);
  const { isAuth } = useContext(authContext);
  // console.log(item);
  let params = useParams();
  useEffect(() => {
    getSongPage(params.slug);
    viewPage(params.slug);
    getRecommender();
    loadUser();
    // eslint-disable-next-line
  }, [params.slug, user]);
  // console.log(dataSongPage);
  // نشان دادن موزیک و پخش موزیک
  const playMusicAndShowMusicBar = async () => {
    setIds(
      dataSongPage?.media?.[0]?.telegram_id,
      dataSongPage?.media?.[0]?.id,
      dataSongPage?.media?.[0]?.duration,
      dataSongPage?.media?.[0]?.name,
      dataSongPage?.person?.[0]?.name
    );
    try {
      const res = await axios.downloader.get(
        `/${dataSongPage?.media?.[0]?.telegram_id}`
      );
      setUrl(res.data.download_link);

      if (!showMusic) {
        ChangeShowMusic();
      }
      playMusic();
    } catch (error) {
      console.log(error);
    }
  };

  const onchange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };
  return loading ? (
    <Spinner />
  ) : (
    <div className='rowItemPage py-4  '>
      <div className='musicInfo d-flex justify-content-around'>
        <div className='musicInfo__right '>
          <img
            className='musicInfo__image'
            src='https://www.ganja2music.com/Image/Post/10.2020/Behnam%20Bani%20-%20Khoshhalam.jpg'
            alt=''
          />
        </div>
        <div className='musicInfo__left text-light   justify-content-start align-items-center'>
          <div className='musicInfo__name mt-5 mb-3 d-flex'>
            نام آهنگ : {dataSongPage?.media?.[0]?.name}
          </div>{' '}
          <div className='musicInfo__singer mb-3 d-flex'>
            خواننده : {dataSongPage?.person?.[0]?.name}
          </div>
          <div className='musicInfo__mode mb-3 d-flex'>سبک : شور</div>
          <hr />
          <div className='actions d-flex justify-content-around'>
            <div onClick={playMusicAndShowMusicBar}>
              <Tooltip placement='bottom' title='پخش آهنگ'>
                <IconButton aria-label='play'>
                  <PlayArrowRounded
                    style={{ fontSize: '40px' }}
                    className='icon'
                  />
                </IconButton>
              </Tooltip>
            </div>

            <div className='favorite'>
              <IconButton
                aria-label='Favorite'
                onClick={() => (isAuth ? likeSong(params.slug) : setShow(true))}
              >
                <Favorite className='Favorite' fontSize='large' />
              </IconButton>
              {like}

              <Modal
                show={!isAuth && show}
                onHide={() => setShow(false)}
                className='favoritePopUp__login'
              >
                <Modal.Header closeButton>
                  <Modal.Title>
                    برای لایک کردن، باید وارد حساب کاربری شوید
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      login({
                        email,
                        password,
                      });
                    }}
                  >
                    <div className='formGp d-flex justify-content-around'>
                      <div className='inputBox'>
                        <input
                          required
                          onChange={onchange}
                          name='password'
                          value={password}
                          type='password'
                          placeholder='رمز ورود'
                          minLength='8'
                        />
                      </div>
                      <div className='inputBox '>
                        <input
                          onChange={onchange}
                          name='email'
                          type='email'
                          value={email}
                          placeholder='ایمیل'
                          required
                        />
                      </div>{' '}
                    </div>
                    <div className='error__msg__login pt-2 '>
                      {error?.error} *
                    </div>
                    <div className='notRegister pt-2'>
                      {' '}
                      <span> ثبت نام نکرده اید؟ </span>{' '}
                      <Link to='/register'>
                        {' '}
                        <span> ثبت نام </span>{' '}
                      </Link>
                    </div>
                    {/* <div className='formMsg pt-2'>{errorMsg}</div> */}
                    <div className='formGp__btn d-flex justify-content-around '>
                      <div className='inputBox__login'>
                        <input type='submit' value='ورود' />
                      </div>
                      <div className='inputBox__close'>
                        <button onClick={() => setShow(false)}>بستن</button>
                      </div>
                    </div>
                  </form>
                </Modal.Body>
                {/* <Modal.Footer>
                  <div className='inputBox'>
                    <input type='submit' value='ورود' />
                  </div>

                  <Button variant='secondary' onClick={() => setShow(false)}>
                    بستن
                  </Button>
                </Modal.Footer> */}
              </Modal>
            </div>

            <div>
              <a href={downloadUrl} className='download'>
                <Tooltip placement='bottom' title='دانلود'>
                  <IconButton aria-label='download'>
                    <GetAppRounded fontSize='large' />
                  </IconButton>
                </Tooltip>
              </a>
            </div>

            <div>
              <Tooltip placement='bottom' title='اضافه به لیست'>
                <IconButton aria-label='Add'>
                  <PlaylistAdd className='Add' fontSize='large' />
                </IconButton>
              </Tooltip>
            </div>
            <div className='view'>
              <IconButton aria-label='View'>
                <Visibility className='View' fontSize='large' />
              </IconButton>
              {viewsPage}
            </div>
          </div>
        </div>
      </div>

      <div className='rowList  mt-5  pt-5 '>
        <h3 className='text-light text-right pb-3 mr-4'>
          <span>پیشنهاداتی برای شما</span>
        </h3>
        <Flickity className='carousel  px-2 py-0' options={flickityOptions}>
          {recommender &&
            recommender.map((item, i) => {
              return (
                <RowItem
                  key={item.id}
                  logo={item.image}
                  media={item.media[0]}
                  person={item.person}
                  slug={item.slug}
                />
              );
            })}
        </Flickity>
      </div>
    </div>
  );
};

export default RowItemPage;

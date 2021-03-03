import React, {
  useReducer,
  useContext,
  useEffect,
  useRef,
  useState,
  Fragment,
} from 'react';
import '../MusicBar.css';
import PlayerContext from './playerContext';
import defualtPhoto from '.././assets/defualtPhoto.jpeg';
import playerReducer from './playerReducer';
import {
  ClickAwayListener,
  Drawer,
  ListItem,
  ListItemText,
  Slide,
  Slider,
  SwipeableDrawer,
} from '@material-ui/core';
import AppContext from '../contexts/appContext';
import { detect } from 'detect-browser';
import {
  ExpandLessRounded,
  ExpandMoreRounded,
  Pause,
  PlayArrowRounded,
  PlayCircleFilledRounded,
  PlaylistAddRounded,
  QueueMusic,
  RepeatRounded,
  ShuffleRounded,
  SkipNextRounded,
  SkipPreviousRounded,
  VolumeOff,
  VolumeUp,
} from '@material-ui/icons';
import {
  MUTE_MUSIC,
  PLAY_MUSIC,
  PAUSE_MUSIC,
  UNMUTE_MUSIC,
  CHANGE_VOLUME,
  CHANGE_DURATION,
  SET_PALYLIST,
  NEXT_MUSIC,
  PREVIOUS_MUSIC,
  SET_CURRENT_URL,
  SET_IDS,
  SET_LOADING,
  SET_PROGRESS,
  CHANGE_SHOW_MUSICBAR_ON_MOBILE_RATIO,
  CHANGE_SHUFFLE,
} from './types';
import { useLocation } from 'react-router';
import PhoneMusicBar from '../PhoneMusicBar';
import axios from '../axios/axios';
import authContext from '../auth/authContext';
import SpinnerLoading from '../spinner/SpinnerLoading';
// eslint-disable-next-line

const detectMob = () => {
  const toMatch = [
    /Android/i,
    /webOS/i,
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    /BlackBerry/i,
    /Windows Phone/i,
  ];
  return toMatch.some((toMatchItem) => {
    return navigator.userAgent.match(toMatchItem);
  });
};

const getTimeToday = () => {
  var today = new Date();
  let date =
    today.getFullYear() +
    '-' +
    (today.getMonth() + 1) +
    '-' +
    today.getDate() +
    '/' +
    today.getHours() +
    '-' +
    today.getMinutes() +
    '-' +
    today.getSeconds();
  return date;
};
const browser = () => {
  const browser = detect();
  // if (browser) {
  //   console.log(browser.name);
  //   console.log(browser.version);
  //   console.log(browser.os);
  // }

  return browser.name;
};

const Playerstate = (props) => {
  const { setWhichSongToSaveInPlaylist } = useContext(AppContext);
  const { isAuth } = useContext(authContext);

  const location = useLocation();
  const audioRef = useRef();
  const {
    showMusic,
    ChangeShowLeft,
    showLeft,
    addMusicToMAINPlaylist,
  } = useContext(AppContext);
  const initialState = {
    playList: [],
    playing: false,
    loading: false,
    mute: false,
    seek: false,
    shuffle: false,
    duration: 0,
    totalDuration: 0,
    currentUrl: null,
    audioElement: null,
    volume: 1,
    telegramId: null,
    songId: null,
    songPhoto: null,
    songName: '',
    songSinger: '',
    currentProgress: 0,
    showMusicBarOnMoblieRatio: false,
  };
  const [state, dispatch] = useReducer(playerReducer, initialState);
  const { playList } = state;

  const [loop, setLopp] = useState(false);
  const [musicChangeList, setMusicChangeList] = useState([]);
  // const [showMusiBar, setShowMusicBar] = useState(false);
  // const [playList, setPlayList] = useState([]);

  useEffect(() => {
    //   حرکت خواهد کردprogress اگر در حال پخش بود

    if (state.playing && !state.loading) {
      //progress سرعت جلو رفتن
      const timer = setInterval(() => {
        if (audioRef?.current && audioRef?.current?.ended && !state.seek) {
          nextMusic();
        } else if (
          audioRef?.current?.paused &&
          state.currentUrl !== null &&
          !state.loading
        ) {
          audioRef?.current?.play();
        }

        let progress = parseFloat(
          (audioRef?.current?.currentTime * 100) / audioRef?.current?.duration
        ).toFixed(2);
        setNewProgress(progress);
        dispatch({
          type: CHANGE_DURATION,
          payload: {
            currentTime: audioRef.current.currentTime,
          },
        });
      }, 1000);
      return () => {
        clearInterval(timer);
      };
    }
  }, [state.playing, state.loading, state.seek]);

  const setShowMusicBarOnMoblieRatio = () => {
    dispatch({ type: CHANGE_SHOW_MUSICBAR_ON_MOBILE_RATIO });
  };

  const setNewProgress = (progress) => {
    progress = parseFloat(progress);
    dispatch({
      type: SET_PROGRESS,
      payload: progress === NaN ? 0 : progress,
    });
  };
  const setIds = (tId, id, duration, name, singer, photo) => {
    if (audioRef.current.played) {
      audioRef.current.pause();
    }
    dispatch({
      type: SET_IDS,
      payload: {
        telegramId: tId,
        songId: id,
        totalDuration: duration,
        songName: name,
        songSinger: singer,
        songPhoto: photo,
      },
    });

    // set if user listen this song twice or more if true add to mainplaylist,

    if (JSON.parse(localStorage.getItem('mainPlaylist')) === null) {
      let mainPlaylist = [];
      const item = { songId: id, count: 1 };
      mainPlaylist.push(item);

      localStorage.setItem('mainPlaylist', JSON.stringify(mainPlaylist));
    } else {
      let mainPlaylist = JSON.parse(localStorage.getItem('mainPlaylist'));
      let item = mainPlaylist.find((x) => x.songId === id);

      if (item === undefined) {
        const newItem = { songId: id, count: 1 };
        mainPlaylist.push(newItem);
        localStorage.setItem('mainPlaylist', JSON.stringify(mainPlaylist));
      } else {
        let newMainPlaylist = mainPlaylist.filter((file) => {
          return file.songId !== id;
        });
        let newItem = { songId: id, count: item.count + 1 };
        newMainPlaylist.push(newItem);
        console.log(newMainPlaylist);

        localStorage.setItem('mainPlaylist', JSON.stringify(newMainPlaylist));
        addMusicToMAINPlaylist(id);
      }

      // console.log(item);
      // console.log(newMainPlaylist);
      // const item = { songId: id, count: 1 };
      // mainPlaylist.push(item);
      // localStorage.setItem('mainPlaylist', JSON.stringify(mainPlaylist));
    }
    // setIds({ telegramId: tId, songId: id });
  };

  const showPlaylist = () => {
    ChangeShowLeft(!showLeft);
  };

  const handleChange = (newDuration) => {
    // تنظیم مدت زمان هنگام کلیک
    // state.seek = true;
    state.seek = true;
    changeDuration(audioRef.current, newDuration);
    setNewProgress(newDuration);
  };
  const handleNext = () => {
    //  موزیک بعدی
    nextMusic(audioRef.current);
    // setProgress(0);
    setNewProgress(0);
  };
  const handlePrevious = () => {
    // موزیک قبلی
    previousMusic(audioRef.current);
    // setProgress(0);
    setNewProgress(0);
  };

  const setPlayList = (playlist) => {
    if (playlist !== state.playList) {
      dispatch({
        type: SET_PALYLIST,
        payload: playlist,
      });
    }
  };

  const zeroPad = (num, places) => String(num).padStart(places, '0');

  const playAndPauseMusic = (audioElement = audioRef.current) => {
    // پلی و استپ کردن آهنگ
    if (audioElement !== undefined) {
      if (state.playing) {
        audioElement.pause();
        dispatch({
          type: PAUSE_MUSIC,
        });
      } else {
        dispatch({
          type: PLAY_MUSIC,
        });

        audioElement.play();
      }
    }
  };

  const playMusic = (audioElement = audioRef.current) => {
    if (audioElement) {
      audioElement.pause();
      audioElement.load();

      // audioElement.play();
    }
    dispatch({
      type: PLAY_MUSIC,
    });
  };

  const muteAndUnmuteMusic = (audioElement) => {
    // میوت و آن-میوت کردن آهنگ
    if (audioElement !== undefined) {
      if (state.mute) {
        audioElement.muted = false;
        dispatch({
          type: UNMUTE_MUSIC,
        });
      } else {
        audioElement.muted = true;
        dispatch({
          type: MUTE_MUSIC,
        });
      }
    }
  };

  const changeVolume = (audioElement = audioRef.current, newVolume) => {
    // تغییر صدای آهنگ
    if (audioElement !== undefined) {
      audioElement.volume = newVolume / 100;
      dispatch({
        type: CHANGE_VOLUME,
        payload: newVolume / 100,
      });
    }
  };

  const setUrl = (url, playlist) => {
    if (playlist !== state.playList) {
      setPlayList(playlist);
    }
    // console.log(url);
    dispatch({
      type: SET_CURRENT_URL,
      payload: url,
    });
    // setProgress(0);
    setNewProgress(0);
  };

  const nextMusic = async (audioElement = audioRef.current) => {
    audioElement.pause();

    putToMusicChangeList(audioElement.currentTime, 'next');
    let last = null;
    // console.log(playList);
    if (playList !== undefined) {
      for (let i = 0; i < playList.length; i++) {
        if (state.songId === playList[i].media[0].id) {
          let which;
          if (state.shuffle) {
            which = Math.floor(Math.random() * Math.floor(playList?.length));
          } else {
            which = i + 1;
          }
          let chosen =
            playList[which] !== undefined ? playList[which] : playList[0];
          setIds(
            chosen.media[0]?.telegram_id,
            chosen.media[0]?.id,
            chosen.media[0]?.duration,
            chosen.media[0]?.name,
            chosen.person?.[0]?.name,
            chosen?.media?.[0]?.image !== null
              ? chosen?.media?.[0]?.image
              : chosen?.person?.[0]?.image.full_image_url
          );
          try {
            const res = await axios.downloader.get(
              `/${chosen.media[0]?.telegram_id}`
            );
            setUrl(res.data.download_link, playList);

            playMusic();
          } catch (error) {
            console.log(error);
          }
        }
      }
    }

    setNewProgress(0);
  };
  const previousMusic = async (audioElement = audioRef.current) => {
    audioElement.pause();

    putToMusicChangeList(audioElement.currentTime, 'previous');
    let last = null;
    if (playList !== undefined) {
      for (let i = 0; i < playList.length; i++) {
        if (state.songId === playList[i].media[0].id) {
          let which;
          if (state.shuffle) {
            which = Math.floor(Math.random() * Math.floor(playList?.length));
          } else {
            which = i - 1;
          }
          let chosen =
            playList[which] !== undefined
              ? playList[which]
              : playList[playList.length - 1];

          setIds(
            chosen.media[0]?.telegram_id,
            chosen.media[0]?.id,
            chosen.media[0]?.duration,
            chosen.media[0]?.name,
            chosen.person?.[0]?.name,
            chosen?.media?.[0]?.image !== null
              ? chosen?.media?.[0]?.image
              : chosen?.person?.[0]?.image.full_image_url
          );
          try {
            const res = await axios.downloader.get(
              `/${chosen.media[0]?.telegram_id}`
            );
            setUrl(res.data.download_link, playList);

            playMusic();
          } catch (error) {
            console.log(error);
          }
        }
      }
    }
    setNewProgress(0);
  };

  const changeDuration = (audioElement, newDuration) => {
    if (audioElement !== undefined) {
      audioElement.currentTime =
        (audioRef.current.duration * newDuration) / 100;
    }
  };

  const putToMusicChangeList = (Songtime, action) => {
    const schema = {
      listen_duration: Songtime,
      isMobile: detectMob(),
      browserName: browser(),
      userId: null,
      action: action,
      date: getTimeToday(),
      favorite: false,
      download: false,
      // songId: ids.songId,
      // telegramId: ids.telegramId,
      // destination_url: null,
      CurrentUrl: location.pathname,
    };

    musicChangeList.push(schema);
    // console.log(musicChangeList);
    setMusicChangeList(musicChangeList);
  };

  const changeShuffle = () => {
    dispatch({ type: CHANGE_SHUFFLE });
    // setShuffle(!shuffle);
  };
  const changeLoop = () => {
    setLopp(!loop);
  };

  return (
    <PlayerContext.Provider
      value={{
        playAndPauseMusic,
        muteAndUnmuteMusic,
        setPlayList,
        mute: state.mute,
        playing: state.playing,
        volume: state.volume,
        duration: state.duration,
        currentUrl: state.currentUrl,
        playList: state.playList,
        // playList: playList,
        // progress: state.progress,
        currentProgress: state.currentProgress,
        songSinger: state.songSinger,
        songName: state.songName,
        shuffle: state.shuffle,
        loop: loop,
        totalDuration: state.totalDuration,
        songId: state.songId,
        songPhoto: state.songPhoto,
        loading: state.loading,
        showMusicBarOnMoblieRatio: state.showMusicBarOnMoblieRatio,
        setShowMusicBarOnMoblieRatio,
        changeVolume,
        changeDuration,
        nextMusic,
        previousMusic,
        setUrl,
        playMusic,
        handleChange,
        changeShuffle,
        changeLoop,
        setIds,
      }}
    >
      {props.children}

      <Fragment>
        <div id='audio'>
          <audio
            ref={audioRef}
            className='player'
            autoPlay={state.playing}
            src={state.currentUrl}
            // src={'http://dl.rovzenews.ir/telegram/763/763.mp3'}
            // src={
            //   'https://files.musico.ir/Song/Ehsan%20Daryadel%20-%20Koochamoon%20(320).mp3'
            // }
            type='audio/mpeg'
            preload='metadata'
          ></audio>
        </div>

        {/* for mobile ratio */}
        <Fragment
        // for mobile ratio
        >
          <div className='phoneMusicBar__slide'>
            <SwipeableDrawer
              variant='persistent'
              className='phoneMusicBar__slide'
              anchor={'bottom'}
              open={state.showMusicBarOnMoblieRatio}
              onClose={() => setShowMusicBarOnMoblieRatio()}
              onOpen={() => setShowMusicBarOnMoblieRatio()}
            >
              <div className='player__zone d-flex text-light '>
                <div className='current-time align-self-center '>
                  {Math.floor(audioRef.current?.currentTime / 60) +
                    ':' +
                    zeroPad(Math.floor(audioRef.current?.currentTime % 60), 2)}
                </div>

                <div className='player'>
                  <Slider
                    variant='determinate'
                    value={state.currentProgress}
                    onChange={(e, newDuration) => handleChange(newDuration)}
                  />
                </div>

                <div className='last-time align-self-center '>
                  {' '}
                  {Math.floor(state.totalDuration / 60) +
                    ':' +
                    zeroPad(Math.floor(state.totalDuration % 60), 2)}
                </div>
              </div>

              <div className='d-flex text-light pb-2 px-2 justify-content-between'>
                <div className='player__actions d-flex justify-content-center '>
                  <div
                    className='icon playlist_sound_playlist d-flex justify-content-between align-self-end mr-2 align-self-center'
                    onClick={showPlaylist}
                  >
                    <QueueMusic style={{ fontSize: 22 }} />
                  </div>
                  <div className='mr-2 '>
                    {isAuth && (
                      <PlaylistAddRounded
                        style={{ fontSize: 22 }}
                        onClick={() =>
                          setWhichSongToSaveInPlaylist(state.songId)
                        }
                      />
                    )}
                  </div>
                  <div
                    onClick={() => changeShuffle()}
                    className={`icon mr-2 ${
                      state.shuffle ? 'icon-press' : ''
                    } align-self-center`}
                  >
                    <ShuffleRounded style={{ fontSize: 20 }} />
                  </div>

                  <div
                    onClick={changeLoop}
                    className={`icon mr-2  ${
                      loop ? 'icon-press' : ''
                    } align-self-center `}
                  >
                    <RepeatRounded style={{ fontSize: 20 }} />
                  </div>
                </div>
                <div className='d-flex mobileSound mr-2'>
                  <div
                    className='icon col-2 p-0 d-flex align-self-center mr-2'
                    onClick={() => muteAndUnmuteMusic(audioRef.current)}
                  >
                    {state.mute ? <VolumeOff /> : <VolumeUp />}
                  </div>

                  <Slider
                    className='mobileSound '
                    value={state.volume * 100}
                    onChange={(e, newVolume) =>
                      changeVolume(audioRef.current, newVolume)
                    }
                    aria-labelledby='continuous-slider'
                  />
                </div>
              </div>
            </SwipeableDrawer>
          </div>
          {state.currentUrl && (
            <Slide direction='up' timeout={500} in={showMusic}>
              <div className='phoneMusicBar bg-dark d-flex text-light'>
                <div
                  className='phoneMusicBar__left d-flex align-self-center 
          justify-content-start'
                >
                  <img
                    className='phoneMusicBar__img m-2'
                    src={
                      state.songPhoto !== null ? state.songPhoto : defualtPhoto
                    }
                    alt=''
                  />
                  <div className='phoneMusicBar__info align-self-center mr-2'>
                    <div className='phoneMusicBar__title'>
                      <div className='scroll'>
                        <span>{state.songName}</span>
                      </div>
                    </div>
                    <div className='phoneMusicBar__singer'>
                      <span>{state.songSinger}</span>
                    </div>
                  </div>
                </div>
                <div
                  className='phoneMusicBar__right d-flex align-self-center 
          justify-content-around'
                >
                  <div className='icon ' onClick={handleNext}>
                    <SkipNextRounded style={{ fontSize: '25px' }} />
                  </div>
                  <div className='icon '>
                    {/* SpinnerLoading */}
                    {state.loading ? (
                      <SpinnerLoading />
                    ) : state.playing ? (
                      <div
                        className=''
                        onClick={() => playAndPauseMusic(audioRef.current)}
                      >
                        <Pause style={{ fontSize: '25px' }} />
                      </div>
                    ) : (
                      <div
                        className=''
                        onClick={() => playAndPauseMusic(audioRef.current)}
                      >
                        <PlayCircleFilledRounded style={{ fontSize: '25px' }} />
                      </div>
                    )}
                  </div>
                  <div className='icon' onClick={handlePrevious}>
                    <SkipPreviousRounded style={{ fontSize: '25px' }} />
                  </div>
                  <div
                    className='icon'
                    onClick={() => setShowMusicBarOnMoblieRatio()}
                  >
                    {state.showMusicBarOnMoblieRatio ? (
                      <ExpandMoreRounded style={{ fontSize: '25px' }} />
                    ) : (
                      <ExpandLessRounded style={{ fontSize: '25px' }} />
                    )}
                  </div>
                </div>
              </div>
            </Slide>
          )}
        </Fragment>
        {/* for web ratio */}
        <Fragment
        //for web ratio
        >
          <Slide direction='up' timeout={500} in={showMusic}>
            <div
              className=' musicBar text-light'
              style={{ display: showMusic ? 'block' : 'none' }}
            >
              <div className='position d-flex justify-content-around'>
                <div className='musicBar__right'>
                  <div className='musicBar__info'>
                    <div className='musicBar__infoImage'>
                      <img
                        src={
                          state.songPhoto !== null
                            ? state.songPhoto
                            : defualtPhoto
                        }
                        alt='logo'
                      />
                    </div>
                    <div className='musicBar__infoDesc'>
                      <div className='infoDesc__title'>
                        <div className='scroll'>
                          <span>{state.songName}</span>
                        </div>
                      </div>
                      <div className='infoDesc__person'>{state.songSinger}</div>
                    </div>
                  </div>
                </div>
                <div className='player musicBar__center mt-3'>
                  <div className='player__actions d-flex justify-content-center '>
                    <div
                      onClick={() => changeShuffle()}
                      className={`icon mr-4 ${
                        state.shuffle ? 'icon-press' : ''
                      } align-self-center`}
                    >
                      <ShuffleRounded style={{ fontSize: 25 }} />
                    </div>
                    <div className='icon mr-4 ' onClick={handlePrevious}>
                      <SkipPreviousRounded style={{ fontSize: 35 }} />
                    </div>
                    <div className='icon mr-4 align-self-center '>
                      {state.loading ? (
                        <SpinnerLoading />
                      ) : state.playing ? (
                        <div
                          className=''
                          onClick={() => playAndPauseMusic(audioRef.current)}
                        >
                          <Pause style={{ fontSize: 35 }} />
                        </div>
                      ) : (
                        <div
                          className=''
                          onClick={() => playAndPauseMusic(audioRef.current)}
                        >
                          <PlayArrowRounded style={{ fontSize: 35 }} />
                        </div>
                      )}
                    </div>
                    <div className='icon mr-4  ' onClick={handleNext}>
                      <SkipNextRounded style={{ fontSize: 35 }} />
                    </div>
                    <div
                      onClick={changeLoop}
                      className={`icon mr-4  ${
                        loop ? 'icon-press' : ''
                      } align-self-center `}
                    >
                      <RepeatRounded style={{ fontSize: 25 }} />
                    </div>
                  </div>
                  <div className='player__zone d-flex mt-2'>
                    <div className='current-time align-self-center text-right'>
                      {Math.floor(audioRef.current?.currentTime / 60) +
                        ':' +
                        zeroPad(
                          Math.floor(audioRef.current?.currentTime % 60),
                          2
                        )}
                    </div>
                    {/* ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                    <ClickAwayListener onClickAway={() => (state.seek = false)}>
                      <div
                        className='player mt-1 align-self-center mx-3 '
                        onMouseUp={() => (state.seek = false)}
                      >
                        <Slider
                          variant='determinate'
                          value={state.currentProgress}
                          onChange={(e, newDuration) =>
                            handleChange(newDuration)
                          }
                        />
                      </div>
                    </ClickAwayListener>

                    <div className='last-time align-self-center text-left '>
                      {Math.floor(state.totalDuration / 60) +
                        ':' +
                        zeroPad(Math.floor(state.totalDuration % 60), 2)}
                    </div>
                  </div>
                </div>
                <div className='playlist_sound   musicBar__left mt-3 mb-2'>
                  <div className='d-flex justify-content-around  '>
                    <div className='icon'>
                      {isAuth && (
                        <PlaylistAddRounded
                          fontSize='large'
                          onClick={() =>
                            setWhichSongToSaveInPlaylist(state.songId)
                          }
                        />
                      )}
                    </div>
                    <div
                      className='icon playlist_sound_playlist d-flex justify-content-end align-self-end mb-2 '
                      onClick={showPlaylist}
                    >
                      <QueueMusic fontSize='large' />
                    </div>
                  </div>

                  <div className='sound  d-flex '>
                    <div className='progressBar p-0  w-100 mt-1 '>
                      <Slider
                        value={state.volume * 100}
                        onChange={(e, newVolume) =>
                          changeVolume(audioRef.current, newVolume)
                        }
                        aria-labelledby='continuous-slider'
                      />
                    </div>
                    <div
                      className='icon col-2 p-0 d-flex align-self-center mr-2'
                      onClick={() => muteAndUnmuteMusic(audioRef.current)}
                    >
                      {state.mute ? <VolumeOff /> : <VolumeUp />}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Slide>
        </Fragment>
      </Fragment>
      {/* ) : (
        <></>
      )} */}
    </PlayerContext.Provider>
  );
};

export default Playerstate;

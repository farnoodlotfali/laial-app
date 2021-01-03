import React, {
  useReducer,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import MusicBar from '../MusicBar';
import PlayerContext from './playerContext';
import playerReducer from './playerReducer';
import Parser from 'html-react-parser';
import { Slide, Slider } from '@material-ui/core';
import AppContext from '../contexts/appContext';
import logo from '../assets/0.jpg';
import {
  Pause,
  PlayArrowRounded,
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
} from './types';
import NotFound from '../NotFound';
const urls = [
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
const Playerstate = (props) => {
  const audioRef = useRef();
  const { showMusic, ChangeShowLeft } = useContext(AppContext);
  const initialState = {
    playList: [],
    playing: false,
    load: false,
    mute: false,
    duration: 0,
    totalDuration: 0,
    currentUrl: null,
    audioElement: null,
    volume: 1,
  };
  const [state, dispatch] = useReducer(playerReducer, initialState);

  const showPlaylist = () => {
    ChangeShowLeft(true);
  };
  const zeroPad = (num, places) => String(num).padStart(places, '0');
  const [Time, setTime] = useState('0:00');
  const [shuffle, setShuffle] = useState(false);
  const [loop, setLopp] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // setPlayList(playList);
    //   حرکت خواهد کردprogress اگر در حال پخش بود
    if (state.playing) {
      //progress سرعت جلو رفتن

      const timer = setInterval(() => {
        if (audioRef.current.currentTime == audioRef.current.duration) {
          nextMusic();
        }
        setProgress((prevProgress) =>
          prevProgress >= 100
            ? 0
            : prevProgress + 100 / audioRef.current.duration
        );
        dispatch({
          type: CHANGE_DURATION,
          payload: {
            currentTime: audioRef.current.currentTime,
            duration: audioRef.current.duration,
          },
        });
      }, 1000);
      return () => {
        clearInterval(timer);
      };
    }
  }, [state.playing]);

  const handleChange = (newDuration) => {
    // تنظیم مدت زمان هنگام کلیک
    changeDuration(audioRef.current, newDuration);
    setProgress(newDuration);
  };
  const handleNext = () => {
    //  موزیک بعدی
    nextMusic(audioRef.current);
    setProgress(0);
  };
  const handlePrevious = () => {
    // console.log(1);
    // موزیک قبلی
    previousMusic(audioRef.current);
    setProgress(0);
  };

  const setPlayList = (playlist) => {
    // console.log(playList);

    dispatch({
      type: SET_PALYLIST,
      payload: playlist,
    });
    // console.log(playList);
  };
  const setUrl = (url, playlist) => {
    setPlayList(playlist);

    // console.log(state.pervUrl);
    dispatch({
      type: SET_CURRENT_URL,
      payload: url,
    });
    setProgress(0);
  };

  const playAndPauseMusic = async (audioElement = audioRef.current) => {
    // console.log(audioRef.current.duration);
    // پلی و استپ کردن آهنگ
    if (audioElement !== undefined) {
      if (await state.playing) {
        audioElement.pause();
        dispatch({
          type: PAUSE_MUSIC,
        });
      } else {
        dispatch({
          type: PLAY_MUSIC,
        });

        // audioElement.pause();
        // audioElement.load();
        audioElement.play();
        // setTimeout(() => {
        //   setTime(null);
        // }, 100);
      }
    }
  };

  const playMusic = (audioElement = audioRef.current) => {
    // console.log(audioRef.current.duration);

    // console.log(state.totalDuration);

    dispatch({
      type: PLAY_MUSIC,
    });
    if (audioElement) {
      audioElement.pause();
      audioElement.load();
      audioElement.play();
    }
    setTimeout(() => {
      setTime(null);
    }, 100);
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

  const nextMusic = (audioElement = audioRef.current) => {
    setTime('0:00');
    let last = null;
    let oldSrc = audioElement.childNodes[0].attributes.src.value;
    if (state.playList != undefined) {
      for (let i = 0; i < state.playList.length; i++) {
        if (oldSrc == state.playList[i].url) {
          // console.log(i == state.playList.length - 1 && !loop);
          if (i == state.playList.length - 1) {
            last = true;
          }
          // if (shuffle) {
          let random =
            Math.floor(Math.random() * (state.playList.length - 1)) + 0;
          // }
          // console.log(random);
          if (state.playList[shuffle ? random : i + 1] !== undefined) {
            // console.log(state.playList[shuffle ? random : i + 1].url);
            dispatch({
              type: NEXT_MUSIC,
              payload: state.playList[shuffle ? random : i + 1].url,
            });
          } else {
            dispatch({
              type: NEXT_MUSIC,
              payload: state.playList[0].url,
            });
          }
        }
      }
    }

    if (audioElement) {
      audioElement.pause();
      audioElement.load();
      audioElement.play();
      dispatch({
        type: PLAY_MUSIC,
      });
    }

    setProgress(0);
    setTimeout(() => {
      setTime(null);
    }, 100);
  };
  const previousMusic = (audioElement = audioRef.current) => {
    setTime('0:00');
    let oldSrc = audioElement.childNodes[0].attributes.src.value;
    for (let i = 0; i < state.playList.length; i++) {
      if (oldSrc == state.playList[i].url) {
        if (state.playList[i - 1] !== undefined) {
          dispatch({
            type: PREVIOUS_MUSIC,
            payload: state.playList[i - 1].url,
          });
        } else {
          dispatch({
            type: PREVIOUS_MUSIC,
            payload: state.playList[state.playList.length - 1].url,
          });
        }
      }
    }
    setProgress(0);
    if (audioElement) {
      audioElement.pause();
      audioElement.load();
      audioElement.play();
      dispatch({
        type: PLAY_MUSIC,
      });
    }
    setTimeout(() => {
      setTime(null);
    }, 100);
  };

  const changeDuration = (audioElement, newDuration) => {
    // console.log(audioElement.duration);

    if (audioElement !== undefined) {
      audioElement.currentTime =
        (audioRef.current.duration * newDuration) / 100;
    }
  };

  const changeShuffle = () => {
    setShuffle(!shuffle);
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
        progress: progress,
        shuffle: shuffle,
        loop: loop,
        totalDuration: state.totalDuration,
        changeVolume,
        changeDuration,
        nextMusic,
        previousMusic,
        setUrl,
        playMusic,
        handleChange,
        changeShuffle,
        changeLoop,
      }}
    >
      {/* <MusicBar url={state.currentUrl} /> */}
      {state.currentUrl !== null ? (
        <Slide direction='down' timeout={500} in={showMusic}>
          <div
            className='container musicBar text-light'
            style={{ marginTop: showMusic ? '0px' : '-110px' }}
          >
            <div className='row'>
              <div className='col-md-4'>
                <div className='musicBar__info'>
                  <div className='musicBar__infoImage'>
                    <img src={logo} alt='logo' />
                  </div>
                  <div className='musicBar__infoDesc'>
                    <div className='infoDesc__title'>
                      دودمه شب دهم محرم الحرام
                    </div>
                    <div className='infoDesc__person'>حاج مهدی رسولی</div>
                  </div>
                </div>
              </div>
              <div className='player col-md-6 mt-3'>
                <audio
                  ref={audioRef}
                  className='player'
                  autoPlay={state.playing}
                >
                  <source src={state.currentUrl} type='audio/mpeg' />
                </audio>
                <div className='player__actions d-flex justify-content-center '>
                  <div
                    onClick={() => changeShuffle(!shuffle)}
                    className={`icon mr-4 ${
                      shuffle ? 'icon-press' : ''
                    } align-self-center`}
                  >
                    <ShuffleRounded style={{ fontSize: 25 }} />
                  </div>
                  <div className='icon mr-4 ' onClick={handlePrevious}>
                    <SkipPreviousRounded style={{ fontSize: 35 }} />
                  </div>
                  <div
                    className='icon mr-4  '
                    onClick={() => playAndPauseMusic(audioRef.current)}
                  >
                    {state.playing ? (
                      <Pause style={{ fontSize: 35 }} />
                    ) : (
                      <PlayArrowRounded style={{ fontSize: 35 }} />
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
                  <div className='current-time align-self-center '>
                    {Math.floor(audioRef.current?.currentTime / 60) +
                      ':' +
                      zeroPad(
                        Math.floor(audioRef.current?.currentTime % 60),
                        2
                      )}
                  </div>
                  <div className='player mt-1 align-self-center mx-3 '>
                    <Slider
                      variant='determinate'
                      value={progress}
                      onChange={(e, newDuration) => handleChange(newDuration)}
                    />
                  </div>
                  <div className='last-time align-self-center '>
                    {Time == null
                      ? Math.floor(audioRef.current?.duration / 60) +
                        ':' +
                        zeroPad(Math.floor(audioRef.current?.duration % 60), 2)
                      : Time}
                  </div>
                </div>
              </div>
              <div className='playlist_sound  col-sm-3 col-md-2 mt-3'>
                <div
                  className='icon playlist_sound_playlist d-flex justify-content-end align-self-end mb-2 '
                  onClick={showPlaylist}
                >
                  <QueueMusic fontSize='large' />
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
      ) : (
        <></>
      )}
      {props.children}
    </PlayerContext.Provider>
  );
};

export default Playerstate;

import React, { useContext, useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppContext from './contexts/appContext';
import logo from './assets/0.jpg';
import './MusicBar.css';
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
import { LinearProgress, Slide, Slider } from '@material-ui/core';
import PlayerContext from './player/playerContext';
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

const MusicBar = ({ playList = urls }) => {
  const audioRef = useRef();
  const { showMusic, ChangeShowLeft } = useContext(AppContext);
  const {
    setPlayList,
    playAndPauseMusic,
    playing,
    mute,
    muteAndUnmuteMusic,
    changeVolume,
    volume,
    duration,
    changeDuration,
    nextMusic,
    previousMusic,
    currentUrl,
  } = useContext(PlayerContext);
  // console.log(duration);

  const showPlaylist = () => {
    ChangeShowLeft(true);
  };
  const zeroPad = (num, places) => String(num).padStart(places, '0');

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setPlayList(playList);
    //   حرکت خواهد کردprogress اگر در حال پخش بود
    if (playing) {
      //progress سرعت جلو رفتن

      const timer = setInterval(() => {
        setProgress((prevProgress) =>
          prevProgress >= 100
            ? 0
            : prevProgress + 100 / audioRef.current.duration
        );
      }, 1000);
      return () => {
        clearInterval(timer);
      };
    }
  }, [playing, playList]);

  const handleChange = (newDuration) => {
    changeDuration(audioRef.current, newDuration);
    setProgress(newDuration);
  };
  const handleNext = () => {
    nextMusic(audioRef.current);
    setProgress(0);
  };
  const handlePrevious = () => {
    previousMusic(audioRef.current);
    setProgress(0);
  };
  return (
    // <div className='musicBar text-light'>
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
                <div className='infoDesc__title'>دودمه شب دهم محرم الحرام</div>
                <div className='infoDesc__person'>حاج مهدی رسولی</div>
              </div>
            </div>
          </div>
          <div className='player col-md-6 mt-3'>
            <audio ref={audioRef} className='player' autoPlay={playing}>
              <source src={currentUrl} type='audio/mpeg' />
            </audio>
            <div className='player__actions d-flex justify-content-center '>
              <div className='icon mr-4  align-self-center'>
                <ShuffleRounded style={{ fontSize: 25 }} />
              </div>
              <div className='icon mr-4 ' onClick={handlePrevious}>
                <SkipPreviousRounded style={{ fontSize: 35 }} />
              </div>
              <div
                className='icon mr-4  '
                onClick={() => playAndPauseMusic(audioRef.current)}
              >
                {playing ? (
                  <Pause style={{ fontSize: 35 }} />
                ) : (
                  <PlayArrowRounded style={{ fontSize: 35 }} />
                )}
              </div>
              <div className='icon mr-4  ' onClick={handleNext}>
                <SkipNextRounded style={{ fontSize: 35 }} />
              </div>
              <div className='icon mr-4 align-self-center '>
                <RepeatRounded style={{ fontSize: 25 }} />
              </div>
            </div>
            <div className='player__zone d-flex mt-2'>
              <div className='current-time align-self-center '>
                {Math.floor(audioRef.current?.currentTime / 60) +
                  ':' +
                  zeroPad(Math.floor(audioRef.current?.currentTime % 60), 2)}
              </div>
              <div className='player mt-1 align-self-center mx-3 '>
                <Slider
                  variant='determinate'
                  value={progress}
                  onChange={(e, newDuration) => handleChange(newDuration)}
                />
              </div>
              <div className='last-time align-self-center '>
                {
                  // audioRef?.current?.duration
                  Math.floor(audioRef.current?.duration / 60) +
                    ':' +
                    zeroPad(Math.floor(audioRef.current?.duration % 60), 2)
                }
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
                  value={volume * 100}
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
                {mute ? <VolumeOff /> : <VolumeUp />}
              </div>
            </div>

            {/* <div className='playlist mt-3'> */}

            {/* </div> */}
          </div>
        </div>
        {/* <div className='col-3 bg-danger'>dsds</div> */}
      </div>
    </Slide>
    // </div>
  );
};

export default MusicBar;

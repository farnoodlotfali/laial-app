import React, { useReducer } from 'react';
import PlayerContext from './playerContext';
import playerReducer from './playerReducer';
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
} from './types';

const Playerstate = (props) => {
  const initialState = {
    playList: [],
    playing: false,
    mute: false,
    shuffle: false,
    loop: false,
    duration: 0,
    currentUrl: 0,
    volume: 1,
  };
  const [state, dispatch] = useReducer(playerReducer, initialState);

  const setPlayList = (playList) => {
    // console.log(playList);
    state.currentUrl =
      'https://files.musico.ir/Song/Ehsan%20Daryadel%20-%20Koochamoon%20(320).mp3';

    dispatch({
      type: SET_PALYLIST,
      payload: playList,
    });
  };

  const playAndPauseMusic = async (audioElement) => {
    // پلی و استپ کردن آهنگ
    // console.log(audioElement.currentTime);
    if (audioElement !== undefined) {
      if (await state.playing) {
        audioElement.pause();
        dispatch({
          type: PAUSE_MUSIC,
        });
      } else {
        audioElement.play();
        dispatch({
          type: PLAY_MUSIC,
          payload: audioElement.duration,
        });
      }
    }
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

  const changeVolume = (audioElement, newVolume) => {
    // تغییر صدای آهنگ
    if (audioElement !== undefined) {
      audioElement.volume = newVolume / 100;
      dispatch({
        type: CHANGE_VOLUME,
        payload: newVolume / 100,
      });
    }
  };

  const nextMusic = async (audioElement) => {
    let oldSrc = audioElement.childNodes[0].attributes.src.value;

    for (let i = 0; i < state.playList.length; i++) {
      if (oldSrc == state.playList[i].url) {
        if ((await state.playList[i + 1]) !== undefined) {
          dispatch({
            type: NEXT_MUSIC,
            payload: state.playList[i + 1].url,
          });
        } else {
          dispatch({
            type: NEXT_MUSIC,
            payload: state.playList[0].url,
          });
        }
      }
    }
    if (audioElement) {
      audioElement.pause();
      audioElement.load();
      audioElement.play();
    }
  };
  const previousMusic = async (audioElement) => {
    let oldSrc = audioElement.childNodes[0].attributes.src.value;
    for (let i = 0; i < state.playList.length; i++) {
      if (oldSrc == state.playList[i].url) {
        if ((await state.playList[i - 1]) !== undefined) {
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
    if (audioElement) {
      audioElement.pause();
      audioElement.load();
      audioElement.play();
    }
  };

  const changeDuration = (audioElement, newDuration) => {
    if (audioElement !== undefined) {
      audioElement.currentTime = (audioElement.duration * newDuration) / 100;
    }
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
        changeVolume,
        changeDuration,
        nextMusic,
        previousMusic,
      }}
    >
      {props.children}
    </PlayerContext.Provider>
  );
};

export default Playerstate;

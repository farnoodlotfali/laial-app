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
  SET_LOADING,
  SET_IDS,
  SET_PROGRESS,
  SEEKING,
  CHANGE_SHOW_MUSICBAR_ON_MOBILE_RATIO,
} from './types';
// eslint-disable-next-line
export default (state, action) => {
  switch (action.type) {
    case PLAY_MUSIC:
      return {
        ...state,
        playing: true,
      };
    case PAUSE_MUSIC:
      return {
        ...state,
        playing: false,
      };
    case MUTE_MUSIC:
      return {
        ...state,
        mute: true,
      };
    case UNMUTE_MUSIC:
      return {
        ...state,
        mute: false,
      };
    case CHANGE_VOLUME:
      return {
        ...state,
        volume: action.payload,
      };
    case CHANGE_DURATION:
      return {
        ...state,
        duration: action.payload.currentTime,
        // currentProgress: action.payload.currentProgress,
      };
    case SET_PALYLIST:
      return {
        ...state,
        playList: action.payload,
      };
    case NEXT_MUSIC:
      return {
        ...state,
        currentUrl: action.payload,
      };
    case PREVIOUS_MUSIC:
      return {
        ...state,
        currentUrl: action.payload,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
        playing: false,
      };
    case SET_CURRENT_URL:
      // console.log(action.payload);
      return {
        ...state,
        currentUrl: action.payload,
        loading: false,
      };
    case SET_PROGRESS:
      return {
        ...state,
        currentProgress: action.payload,
        // seek: false,
      };
    case SEEKING:
      return {
        ...state,
        seeking: action.payload,
      };
    case CHANGE_SHOW_MUSICBAR_ON_MOBILE_RATIO:
      return {
        ...state,
        showMusicBarOnMoblieRatio: !state.showMusicBarOnMoblieRatio,
      };
    case SET_IDS:
      return {
        ...state,
        playing: false,
        loading: true,
        totalDuration: action.payload.totalDuration,
        telegramId: action.payload.telegramId,
        songId: action.payload.songId,
        songSinger: action.payload.songSinger,
        songName: action.payload.songName,
      };

    default:
      return { ...state };
  }
};

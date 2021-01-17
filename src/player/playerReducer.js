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
      return {
        ...state,
        // songId: action.payload.songId,

        // telegramId: action.payload.telegramId,
        // totalDuration: action.payload.totalDuration,
        // currentUrl: action.payload.currentUrl,
        currentUrl: action.payload,

        loading: false,
      };
    case SET_IDS:
      return {
        playing: false,
        loading: true,
        volume: 1,
        totalDuration: action.payload.totalDuration,
        telegramId: action.payload.telegramId,
        songId: action.payload.songId,
      };

    default:
      return state;
  }
};

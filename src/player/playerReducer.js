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
      // console.log(action.payload);
      return {
        ...state,
        percentage: action.payload,
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
        playing: true,
      };
    case PREVIOUS_MUSIC:
      return {
        ...state,
        currentUrl: action.payload,
        playing: true,
      };
    default:
      return state;
  }
};

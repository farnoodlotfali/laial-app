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
  SET_PROGRESS,
  CHANGE_SHOW_MUSICBAR_ON_MOBILE_RATIO,
  CHANGE_SHUFFLE,
  CHANGE_LOOP_STATE,
  FORCE_STOP,
} from "./types";
// eslint-disable-next-line
export default (state, action) => {
  switch (action.type) {
    case PLAY_MUSIC:
      return {
        ...state,
        playing: true,
        loading: false,
        loading: false,
      };
    case PAUSE_MUSIC:
      return {
        ...state,
        playing: false,
      };
    case FORCE_STOP:
      return {
        ...state,
        playing: false,
        loading: false,
        forceStop: true,
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
        playList: action.payload.playList,
        canDeleteSong: action.payload.canDeleteSong,
      };
    case CHANGE_SHUFFLE:
      return {
        ...state,
        shuffle: !state.shuffle,
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

    case SET_CURRENT_URL:
      return {
        ...state,
        currentUrl: action.payload,
      };
    case SET_PROGRESS:
      return {
        ...state,
        currentProgress: action.payload,
      };

    case CHANGE_LOOP_STATE:
      switch (state.noneOrLoopOrRepeat) {
        case 0:
          return {
            ...state,
            noneOrLoopOrRepeat: 1,
            loop: true,
            repeatOne: false,
          };
        case 1:
          return {
            ...state,
            noneOrLoopOrRepeat: 2,
            loop: false,
            repeatOne: true,
          };
        default:
          return {
            ...state,
            noneOrLoopOrRepeat: 0,
            loop: false,
            repeatOne: false,
          };
      }

    case CHANGE_SHOW_MUSICBAR_ON_MOBILE_RATIO:
      return {
        ...state,
        showMusicBarOnMoblieRatio: !state.showMusicBarOnMoblieRatio,
      };
    case SET_IDS:
      return {
        ...state,
        playing: false,
        isThisSongAddedToRecentlyViewdPlaylist: false,
        loading: true,
        totalDuration: action.payload.totalDuration,
        telegramId: action.payload.telegramId,
        songId: action.payload.songId,
        songSinger: action.payload.songSinger,
        songName: action.payload.songName,
        songPhoto: action.payload.songPhoto,
        postId: action.payload.postId,
        songSlug: action.payload.songSlug,
      };

    default:
      return { ...state };
  }
};

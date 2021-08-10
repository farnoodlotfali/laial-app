import React, {
  useReducer,
  useContext,
  useEffect,
  useRef,
  useState,
  Fragment,
} from "react";
import "./Player.css";
import PlayerContext from "./playerContext";
import playerReducer from "./playerReducer";
import AppContext from "../contexts/appContext";
import { detect } from "detect-browser";

import {
  MUTE_MUSIC,
  PLAY_MUSIC,
  PAUSE_MUSIC,
  UNMUTE_MUSIC,
  CHANGE_VOLUME,
  SET_PALYLIST,
  FORCE_STOP,
  SET_CURRENT_URL,
  SET_IDS,
  SET_PROGRESS,
  CHANGE_SHOW_MUSICBAR_ON_MOBILE_RATIO,
  CHANGE_SHUFFLE,
  CHANGE_LOOP_STATE,
  CHANGE_SEEK,
} from "./types";
import { useLocation } from "react-router";
import axios from "../axios/axios";
import authContext from "../auth/authContext";
import PlayerOnWeb from "./PlayerOnWeb";
import PlayerOnMobile from "./PlayerOnMobile";

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
    "-" +
    (today.getMonth() + 1) +
    "-" +
    today.getDate() +
    "/" +
    today.getHours() +
    "-" +
    today.getMinutes() +
    "-" +
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
  const { isAuth, forceLogin, checkIfForce, changeShowLoginModal } =
    useContext(authContext);
  const location = useLocation();
  const audioRef = useRef();
  const {
    ChangeShowLeft,
    showLeft,
    addMusicToMAINPlaylist,
    removeThisSongHasBeenbAdd,
    changeHomeMeta,
    LimitListPlayNonLogin,
  } = useContext(AppContext);
  const initialState = {
    playList: [],
    playing: false,
    loading: false,
    mute: false,
    forceStop: false,
    seek: false,
    shuffle: false,
    loop: false,
    repeatOne: false,
    noneOrLoopOrRepeat: 0,
    duration: 0,
    totalDuration: 0,
    currentUrl: null,
    audioElement: null,
    volume: 1,
    telegramId: null,
    postId: null,
    songId: null,
    songSlug: null,
    songPhoto: null,
    songName: "",
    songSinger: "",
    currentProgress: 0,
    progressToZero: false,
    showMusicBarOnMoblieRatio: false,
    canDeleteSong: false,
    isThisSongAddedToRecentlyViewdPlaylist: false,
    song_meta_description: null,
    song_meta_title: null,
  };
  const [state, dispatch] = useReducer(playerReducer, initialState);
  const { playList } = state;

  const [musicChangeList, setMusicChangeList] = useState([]);

  useEffect(() => {
    // جهت آپدیت عکس ایکون
    const MusicPhotoIcon = document.getElementById("musicPhoto");
    const titlePageSong = document.getElementById("titlePageSong");
    state.songPhoto !== null && (MusicPhotoIcon.href = state.songPhoto);
    state.song_meta_title !== null &&
      (titlePageSong.innerText = state.song_meta_title);
  }, [state.songPhoto, state.song_meta_title, state.playing]);

  const setShowMusicBarOnMoblieRatio = () => {
    dispatch({ type: CHANGE_SHOW_MUSICBAR_ON_MOBILE_RATIO });
  };

  const setNewProgress = (progress) => {
    progress = parseFloat(progress);
    dispatch({
      type: SET_PROGRESS,
      payload: isNaN(progress) ? 0 : progress,
    });
  };
  const setIds = (
    tId,
    id,
    duration,
    name,
    singer,
    photo,
    postId,
    songSlug,
    newTitle,
    newDesc
  ) => {
    dispatch({
      type: SET_IDS,
      payload: {
        telegramId: tId,
        songId: id,
        totalDuration: duration,
        songName: name,
        songSinger: singer,
        songPhoto: photo,
        postId: postId,
        songSlug: songSlug,
        newTitle: newTitle,
        newDesc: newDesc,
      },
    });
    // set if user listen this song twice or more if true add to mainplaylist,
    if (isAuth) {
      if (JSON.parse(localStorage.getItem("mainPlaylist")) === null) {
        let mainPlaylist = [];
        const item = { postId: postId, count: 1 };
        mainPlaylist.push(item);

        localStorage.setItem("mainPlaylist", JSON.stringify(mainPlaylist));
      } else {
        let mainPlaylist = JSON.parse(localStorage.getItem("mainPlaylist"));
        let item = mainPlaylist.find((x) => x.postId === postId);

        if (item === undefined) {
          const newItem = { postId: postId, count: 1 };
          mainPlaylist.push(newItem);
          localStorage.setItem("mainPlaylist", JSON.stringify(mainPlaylist));
        } else {
          let newMainPlaylist = mainPlaylist.filter((file) => {
            return file.postId !== postId;
          });
          let newItem = { postId: postId, count: item.count + 1 };
          newMainPlaylist.push(newItem);

          localStorage.setItem("mainPlaylist", JSON.stringify(newMainPlaylist));
          addMusicToMAINPlaylist(postId);
        }
      }
    } else {
      if (JSON.parse(localStorage.getItem("limitListTo10")) === null) {
        const limitListTo10 = [];
        const item = { postId: postId };
        limitListTo10.push(item);
        localStorage.setItem("limitListTo10", JSON.stringify(limitListTo10));
      } else {
        // if there is no user in the site, and if he had listen 10 music, force him to login or sign up

        let limitListTo10 = JSON.parse(localStorage.getItem("limitListTo10"));

        if (limitListTo10.length >= LimitListPlayNonLogin) {
          forceLogin();
        } else {
          let hasThisItem = limitListTo10.some((x) => x.postId === postId);
          if (!hasThisItem) {
            const item = { postId: postId };
            limitListTo10.push(item);
            localStorage.setItem(
              "limitListTo10",
              JSON.stringify(limitListTo10)
            );
          }
        }
      }
    }
  };

  const showPlaylist = () => {
    ChangeShowLeft(!showLeft);
  };

  const handleChange = (newDuration) => {
    // تنظیم مدت زمان هنگام کلیک

    changeDuration(audioRef.current, newDuration);
    setNewProgress(newDuration);
  };
  const handleNext = () => {
    //  موزیک بعدی
    nextMusic(audioRef.current);
    setNewProgress(0);
  };
  const handlePrevious = () => {
    // موزیک قبلی
    previousMusic(audioRef.current);
    setNewProgress(0);
  };

  const setPlayList = (playlist, canDeleteSong = false) => {
    if (playlist !== state.playList) {
      dispatch({
        type: SET_PALYLIST,
        payload: {
          playList: playlist,
          canDeleteSong: canDeleteSong,
        },
      });
    }
  };

  // const zeroPad = (num, places) => String(num).padStart(places, "0");

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

  const playMusic = async (audioElement = audioRef.current) => {
    if (audioElement) {
      audioElement.load();
      // await audioElement.play();
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

  const setUrl = (url, playlist = []) => {
    if (playlist !== state.playList) {
      setPlayList(playlist);
    }
    setNewProgress(0);
    removeThisSongHasBeenbAdd();
    dispatch({
      type: SET_CURRENT_URL,
      payload: url,
    });
  };

  const nextMusic = async (audioElement = audioRef.current) => {
    audioElement.pause();
    putToMusicChangeList(audioElement.currentTime, "next");
    setNewProgress(0);

    if (playList !== undefined) {
      for (let i = 0; i < playList.length; i++) {
        if (
          playList[i]?.post
            ? state.songId === playList[i].post.media[0].id
            : state.songId === playList[i].media[0].id
        ) {
          let which;
          if (state.shuffle) {
            which = Math.floor(Math.random() * Math.floor(playList?.length));
          } else {
            which = i + 1;
          }
          let chosen = playList[which]?.post
            ? playList[which] !== undefined
              ? playList[which].post
              : state.loop
              ? playList[0].post
              : -1
            : playList[which] !== undefined
            ? playList[which]
            : state.loop
            ? playList[0]
            : -1;
          if (chosen !== -1) {
            if (checkIfForce()) {
              changeShowLoginModal(true);
            } else {
              const sendTitle = chosen?.meta_title
                ? chosen?.meta_title
                : chosen?.title && chosen?.title !== ""
                ? chosen?.title
                : chosen?.media?.name;
              const sendDescription = chosen?.meta_description
                ? chosen?.meta_description
                : chosen?.description && chosen?.description !== ""
                ? chosen?.description
                : chosen?.media?.name;

              setIds(
                chosen.media[0]?.telegram_id,
                chosen.media[0]?.id,
                chosen.media[0]?.duration,
                chosen?.title ? chosen?.title : chosen.media[0]?.name,
                chosen.person?.[0]?.name,
                chosen?.image?.full_image_url
                  ? chosen?.image?.full_image_url
                  : chosen?.media?.[0]?.image !== null
                  ? chosen?.media?.[0]?.image
                  : chosen?.person?.[0]?.image.full_image_url,
                chosen.id,
                chosen.slug,
                chosen?.meta_title
                  ? chosen?.meta_title
                  : chosen?.title && chosen?.title !== ""
                  ? chosen?.title
                  : chosen?.media?.name,
                chosen?.meta_description
                  ? chosen?.meta_description
                  : chosen?.description && chosen?.description !== ""
                  ? chosen?.description
                  : chosen?.media?.name
              );

              if (chosen.media[0]?.path) {
                setUrl(chosen.media[0]?.path, playList);
                playMusic();
              } else {
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
              changeHomeMeta(sendTitle, sendDescription);
            }
          } else {
            dispatch({
              type: PAUSE_MUSIC,
            });
          }
        }
      }
    }
  };
  const previousMusic = async (audioElement = audioRef.current) => {
    audioElement.pause();

    putToMusicChangeList(audioElement.currentTime, "previous");
    setNewProgress(0);

    if (playList !== undefined) {
      for (let i = 0; i < playList.length; i++) {
        if (
          playList[i]?.post
            ? state.songId === playList[i].post.media[0].id
            : state.songId === playList[i].media[0].id
        ) {
          let which;
          if (state.shuffle) {
            which = Math.floor(Math.random() * Math.floor(playList?.length));
          } else {
            which = i - 1;
          }
          let chosen = playList[which]?.post
            ? playList[which] !== undefined
              ? playList[which].post
              : playList[playList.length - 1].post
            : playList[which] !== undefined
            ? playList[which]
            : playList[playList.length - 1];
          if (checkIfForce()) {
            changeShowLoginModal(true);
          } else {
            const sendTitle = chosen?.meta_title
              ? chosen?.meta_title
              : chosen?.title && chosen?.title !== ""
              ? chosen?.title
              : chosen?.media?.name;
            const sendDescription = chosen?.meta_description
              ? chosen?.meta_description
              : chosen?.description && chosen?.description !== ""
              ? chosen?.description
              : chosen?.media?.name;

            setIds(
              chosen.media[0]?.telegram_id,
              chosen.media[0]?.id,
              chosen.media[0]?.duration,
              chosen?.title ? chosen?.title : chosen.media[0]?.name,
              chosen.person?.[0]?.name,
              chosen?.image?.full_image_url
                ? chosen?.image?.full_image_url
                : chosen?.media?.[0]?.image !== null
                ? chosen?.media?.[0]?.image
                : chosen?.person?.[0]?.image.full_image_url,
              chosen.id,
              chosen.slug,
              chosen?.meta_title
                ? chosen?.meta_title
                : chosen?.title && chosen?.title !== ""
                ? chosen?.title
                : chosen?.media?.name,
              chosen?.meta_description
                ? chosen?.meta_description
                : chosen?.description && chosen?.description !== ""
                ? chosen?.description
                : chosen?.media?.name
            );

            if (chosen.media[0]?.path) {
              setUrl(chosen.media[0]?.path, playList);
              playMusic();
            } else {
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
            changeHomeMeta(sendTitle, sendDescription);
          }
        }
      }
    }
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

      CurrentUrl: location.pathname,
    };

    musicChangeList.push(schema);
    setMusicChangeList(musicChangeList);
  };

  const changeShuffle = () => {
    dispatch({ type: CHANGE_SHUFFLE });
  };

  const repeatSongAgain = (audioElement = audioRef.current) => {
    audioElement.pause();
    audioElement.load();
    setNewProgress(0);
    audioElement.play();
  };

  const changeNoneOrLoopOrRepeat = () => {
    dispatch({ type: CHANGE_LOOP_STATE });
  };
  const PauseMusicKey = () => {
    if (audioRef.current.paused) {
      if (!audioRef.current.ended) {
        dispatch({
          type: PAUSE_MUSIC,
        });
      }
    }
  };
  const playMusicKey = (audioElement = audioRef.current) => {
    if (audioElement !== undefined) {
      if (!state.playing) {
        dispatch({
          type: PLAY_MUSIC,
        });
      }
    }
  };
  const playThisListFromMyProflie = async (listShow) => {
    console.log(listShow?.[0]?.post);
    setIds(
      listShow?.[0]?.post.media[0]?.telegram_id,
      listShow?.[0]?.post.media[0]?.id,
      listShow?.[0]?.post.media[0]?.duration,
      listShow?.[0]?.post?.title
        ? listShow?.[0]?.post?.title
        : listShow?.[0]?.post.media[0]?.name,
      listShow?.[0]?.post.person?.[0]?.name,
      listShow?.[0]?.post?.media?.[0]?.image !== null
        ? listShow?.[0]?.post?.media?.[0]?.image
        : listShow?.[0]?.post?.person?.[0]?.image.full_image_url,
      listShow?.[0]?.post.id,
      listShow?.[0]?.post?.slug,
      listShow?.[0]?.post?.meta_title
        ? listShow?.[0]?.post?.meta_title
        : listShow?.[0]?.post?.title,
      listShow?.[0]?.post?.meta_description
        ? listShow?.[0]?.post?.meta_description
        : listShow?.[0]?.post?.description
    );
    if (listShow?.[0]?.post.media[0]?.path) {
      setUrl(listShow?.[0]?.post.media[0]?.path, listShow);
      playMusic();
    } else {
      try {
        const res = await axios.downloader.get(
          `/${listShow?.[0]?.post.media[0]?.telegram_id}`
        );
        setUrl(res.data.download_link, listShow);

        playMusic();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const changeSeek = (newval) => {
    dispatch({
      type: CHANGE_SEEK,
      payload: newval,
    });
  };
  return (
    <PlayerContext.Provider
      value={{
        playAndPauseMusic,
        muteAndUnmuteMusic,
        setPlayList,
        playing: state.playing,
        volume: state.volume,
        duration: state.duration,
        currentUrl: state.currentUrl,
        playList: state.playList,
        noneOrLoopOrRepeat: state.noneOrLoopOrRepeat,
        currentProgress: state.currentProgress,
        songSinger: state.songSinger,
        songName: state.songName,
        shuffle: state.shuffle,
        loop: state.loop,
        totalDuration: state.totalDuration,
        songId: state.songId,
        songPhoto: state.songPhoto,
        loading: state.loading,
        showMusicBarOnMoblieRatio: state.showMusicBarOnMoblieRatio,
        canDeleteSong: state.canDeleteSong,
        postId: state.postId,
        seek: state.seek,
        forceStop: state.forceStop,
        songSlug: state.songSlug,
        progressToZero: state.progressToZero,
        mute: state.mute,
        setShowMusicBarOnMoblieRatio,
        changeNoneOrLoopOrRepeat,
        changeVolume,
        changeDuration,
        nextMusic,
        previousMusic,
        setUrl,
        playMusic,
        handleChange,
        changeShuffle,
        setIds,
        playThisListFromMyProflie,
        handlePrevious,
        handleNext,
        showPlaylist,
        changeSeek,
      }}
    >
      {props.children}
      <Fragment>
        <div id="audio">
          <audio
            onError={(e) => console.log("error on player", e.response)}
            id="audio2"
            onLoadedMetadata={() => {
              if (checkIfForce()) {
                changeShowLoginModal(true);
                dispatch({
                  type: FORCE_STOP,
                });
              } else {
                audioRef.current.play();
                dispatch({
                  type: PLAY_MUSIC,
                });
              }
            }}
            onEnded={() => {
              if (audioRef?.current && audioRef?.current?.ended) {
                if (state.repeatOne) {
                  repeatSongAgain();
                } else nextMusic();
              } else if (audioRef?.current?.ended) {
                dispatch({ type: PAUSE_MUSIC });
              }
            }}
            onPause={PauseMusicKey}
            onPlay={playMusicKey}
            ref={audioRef}
            className="player"
            src={state.currentUrl}
            type="audio/mpeg"
            preload="metadata"
          ></audio>
        </div>

        {/* for mobile ratio */}
        <PlayerOnMobile audioRef={audioRef} />

        {/* for web ratio */}
        <PlayerOnWeb audioRef={audioRef} />
      </Fragment>
    </PlayerContext.Provider>
  );
};

export default Playerstate;

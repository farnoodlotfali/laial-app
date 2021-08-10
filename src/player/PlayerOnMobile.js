import { useContext } from "react";
import authContext from "../auth/authContext";
import appContext from "../contexts/appContext";
import playerContext from "./playerContext";
import defualtPhoto from "../assets/defualtPhoto.jpeg";
import { Drawer, Slide, Slider } from "@material-ui/core";
import {
  ExpandLessRounded,
  ExpandMoreRounded,
  Pause,
  PlayCircleFilledRounded,
  PlaylistAddRounded,
  QueueMusic,
  RepeatOneRounded,
  RepeatRounded,
  ShuffleRounded,
  SkipNextRounded,
  SkipPreviousRounded,
  VolumeOff,
  VolumeUp,
} from "@material-ui/icons";
import { Fragment } from "react";
import Time from "./Time";
import Bar from "./Bar";
import { Link } from "react-router-dom";
import SpinnerLoading from "../spinner/SpinnerLoading";
const PlayerOnMobile = ({ audioRef }) => {
  const { showMusic, setWhichSongToSaveInPlaylist } = useContext(appContext);
  const {
    songSlug,
    songPhoto,
    songName,
    songSinger,
    changeShuffle,
    handlePrevious,
    handleNext,
    playAndPauseMusic,
    forceStop,
    changeNoneOrLoopOrRepeat,
    handleChange,
    postId,
    showPlaylist,
    changeVolume,
    muteAndUnmuteMusic,
    mute,
    loading,
    noneOrLoopOrRepeat,
    playing,
    shuffle,
    volume,
    totalDuration,
    showMusicBarOnMoblieRatio,
    setShowMusicBarOnMoblieRatio,
  } = useContext(playerContext);
  const { isAuth, changeShowLoginModal } = useContext(authContext);
  const zeroPad = (num, places) => String(num).padStart(places, "0");

  return (
    <Fragment
    // for mobile ratio
    >
      <div className="phoneMusicBar__slide">
        <Drawer
          variant="persistent"
          className="phoneMusicBar__slide"
          anchor={"bottom"}
          open={showMusicBarOnMoblieRatio}
          onClose={() => setShowMusicBarOnMoblieRatio()}
        >
          <div className="player__zone d-flex text-light ">
            <div className="current-time align-self-center ">
              <Time />
            </div>

            <div className="player">
              <Bar loading={loading} handleChange={handleChange} />
            </div>

            <div className="last-time align-self-center ">
              {Math.floor(totalDuration / 60) +
                ":" +
                zeroPad(Math.floor(totalDuration % 60), 2)}
            </div>
          </div>

          <div className="d-flex text-light pb-2 px-2 justify-content-between">
            <div className="player__actions d-flex justify-content-around w-100">
              <div
                className="icon playlist_sound_playlist d-flex justify-content-between align-self-end mr-2 align-self-center"
                onClick={showPlaylist}
              >
                <QueueMusic style={{ fontSize: 22 }} />
              </div>
              <div className="mr-2 ">
                {isAuth && (
                  <PlaylistAddRounded
                    style={{ fontSize: 22 }}
                    onClick={() => setWhichSongToSaveInPlaylist(postId)}
                  />
                )}
              </div>
              <div
                onClick={() => changeShuffle()}
                className={`icon__shuffle mr-2 ${
                  shuffle ? "icon__shuffle__press" : ""
                } align-self-center`}
              >
                <ShuffleRounded style={{ fontSize: 20 }} />
              </div>

              {noneOrLoopOrRepeat === 0 ? (
                <div
                  onClick={() => changeNoneOrLoopOrRepeat()}
                  className={` mr-2 icon__loop align-self-center `}
                >
                  <RepeatRounded style={{ fontSize: 20 }} />
                </div>
              ) : noneOrLoopOrRepeat === 1 ? (
                <div
                  onClick={() => changeNoneOrLoopOrRepeat()}
                  className={`mr-2 icon__loop__press align-self-center `}
                >
                  <RepeatRounded style={{ fontSize: 20 }} />
                </div>
              ) : (
                <div
                  onClick={() => changeNoneOrLoopOrRepeat()}
                  className={`mr-2 icon__repeatOne__press align-self-center `}
                >
                  <RepeatOneRounded style={{ fontSize: 20 }} />
                </div>
              )}
            </div>
            <div className="d-flex mobileSound mr-2 w-75">
              <div
                className="icon col-2 p-0 d-flex align-self-center mr-2"
                onClick={() => muteAndUnmuteMusic(audioRef.current)}
              >
                {mute ? <VolumeOff /> : <VolumeUp />}
              </div>

              <Slider
                className="mobileSound "
                value={volume * 100}
                onChange={(e, newVolume) =>
                  changeVolume(audioRef.current, newVolume)
                }
                aria-labelledby="continuous-slider"
              />
            </div>
          </div>
        </Drawer>
      </div>
      <Slide direction="up" timeout={500} in={showMusic}>
        <div className="phoneMusicBar bg-dark d-flex text-light">
          <div className="phoneMusicBar__left d-flex align-self-center justify-content-start">
            {songSlug ? (
              <Link to={`/song/${songSlug}`}>
                <img
                  className="phoneMusicBar__img m-2"
                  src={songPhoto !== null ? songPhoto : defualtPhoto}
                  alt=""
                />
              </Link>
            ) : (
              <img
                className="phoneMusicBar__img m-2"
                src={songPhoto !== null ? songPhoto : defualtPhoto}
                alt=""
              />
            )}

            <div className="phoneMusicBar__info align-self-center mr-2">
              <div className="phoneMusicBar__title">
                <div className="scroll">
                  {songSlug ? (
                    <Link to={`/song/${songSlug}`}>
                      <span>{songName}</span>
                    </Link>
                  ) : (
                    <span>{songName}</span>
                  )}
                </div>
              </div>
              <div className="phoneMusicBar__singer">
                <span>{songSinger}</span>
              </div>
            </div>
          </div>
          <div className="phoneMusicBar__right d-flex align-self-center justify-content-around">
            <div className="iconPhone " onClick={handleNext}>
              <SkipNextRounded style={{ fontSize: "25px" }} />
            </div>
            <div className="iconPhone ">
              {loading ? (
                <SpinnerLoading />
              ) : playing ? (
                <div
                  className=""
                  onClick={() => playAndPauseMusic(audioRef.current)}
                >
                  <Pause style={{ fontSize: "25px" }} />
                </div>
              ) : (
                <div
                  className=""
                  onClick={() =>
                    !forceStop
                      ? playAndPauseMusic(audioRef.current)
                      : changeShowLoginModal(true)
                  }
                >
                  <PlayCircleFilledRounded style={{ fontSize: "25px" }} />
                </div>
              )}
            </div>
            <div className="iconPhone" onClick={handlePrevious}>
              <SkipPreviousRounded style={{ fontSize: "25px" }} />
            </div>
            <div
              className="icon"
              onClick={() => setShowMusicBarOnMoblieRatio()}
            >
              {showMusicBarOnMoblieRatio ? (
                <ExpandMoreRounded style={{ fontSize: "25px" }} />
              ) : (
                <ExpandLessRounded style={{ fontSize: "25px" }} />
              )}
            </div>
          </div>
        </div>
      </Slide>
    </Fragment>
  );
};

export default PlayerOnMobile;

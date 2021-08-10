import { useContext } from "react";
import appContext from "../contexts/appContext";
import playerContext from "./playerContext";
import defualtPhoto from "../assets/defualtPhoto.jpeg";
import authContext from "../auth/authContext";
import { ClickAwayListener, Slide, Slider } from "@material-ui/core";
import {
  Pause,
  PlayArrowRounded,
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
import SpinnerLoading from "../spinner/SpinnerLoading";
import { Link } from "react-router-dom";
const PlayerOnWeb = ({ audioRef }) => {
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
    changeSeek,
  } = useContext(playerContext);
  const { isAuth, changeShowLoginModal } = useContext(authContext);

  const zeroPad = (num, places) => String(num).padStart(places, "0");

  return (
    <Fragment>
      <Slide direction="up" timeout={500} in={showMusic}>
        <div
          className=" musicBar text-light"
          style={{ display: showMusic ? "block" : "none" }}
        >
          <div className="position d-flex justify-content-around pt-2">
            <div className="musicBar__right align-self-center">
              <div className="musicBar__info">
                <div className="musicBar__infoImage ">
                  {songSlug ? (
                    <Link to={`/song/${songSlug}`}>
                      <img
                        src={songPhoto !== null ? songPhoto : defualtPhoto}
                        alt=""
                      />
                    </Link>
                  ) : (
                    <img
                      src={songPhoto !== null ? songPhoto : defualtPhoto}
                      alt=""
                    />
                  )}
                </div>
                <div className="musicBar__infoDesc">
                  <div className="infoDesc__title">
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
                  <div className="infoDesc__person text-center">
                    {songSinger}
                  </div>
                </div>
              </div>
            </div>
            <div className="player musicBar__center align-self-center ">
              <div className="player__actions d-flex justify-content-center ">
                <div
                  onClick={() => changeShuffle()}
                  className={`icon__shuffle mr-4 ${
                    shuffle ? "icon__shuffle__press" : ""
                  } align-self-center`}
                >
                  <ShuffleRounded style={{ fontSize: 20 }} />
                </div>
                <div className="icon mr-4 " onClick={handlePrevious}>
                  <SkipPreviousRounded style={{ fontSize: 30 }} />
                </div>
                <div className="icon mr-4 align-self-center ">
                  {loading ? (
                    <>
                      <SpinnerLoading />
                    </>
                  ) : playing ? (
                    <div
                      className=""
                      onClick={() => playAndPauseMusic(audioRef.current)}
                    >
                      <Pause style={{ fontSize: 30 }} />
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
                      <PlayArrowRounded style={{ fontSize: 30 }} />
                    </div>
                  )}
                </div>
                <div className="icon mr-4  " onClick={handleNext}>
                  <SkipNextRounded style={{ fontSize: 30 }} />
                </div>
                {noneOrLoopOrRepeat === 0 ? (
                  <div
                    onClick={() => changeNoneOrLoopOrRepeat()}
                    className={`mr-4  icon__loop align-self-center `}
                  >
                    <RepeatRounded style={{ fontSize: 20 }} />
                  </div>
                ) : noneOrLoopOrRepeat === 1 ? (
                  <div
                    onClick={() => changeNoneOrLoopOrRepeat()}
                    className={`mr-4 icon__loop__press align-self-center `}
                  >
                    <RepeatRounded style={{ fontSize: 20 }} />
                  </div>
                ) : (
                  <div
                    onClick={() => changeNoneOrLoopOrRepeat()}
                    className={`mr-4 icon__repeatOne__press align-self-center `}
                  >
                    <RepeatOneRounded style={{ fontSize: 20 }} />
                  </div>
                )}
              </div>
              <div className="player__zone d-flex mt-2">
                <div className="current-time align-self-center text-right">
                  <Time />
                </div>
                <ClickAwayListener onClickAway={() => changeSeek(false)}>
                  <div
                    className="player mt-1 align-self-center mx-3 "
                    onMouseUp={() => changeSeek(false)}
                  >
                    <Bar loading={loading} handleChange={handleChange} />
                  </div>
                </ClickAwayListener>

                <div className="last-time align-self-center text-left ">
                  {Math.floor(totalDuration / 60) +
                    ":" +
                    zeroPad(Math.floor(totalDuration % 60), 2)}
                </div>
              </div>
            </div>
            <div className="playlist_sound   musicBar__left  ">
              <div className="d-flex justify-content-around  ">
                <div className="icon">
                  {isAuth && (
                    <PlaylistAddRounded
                      fontSize="large"
                      onClick={() => setWhichSongToSaveInPlaylist(postId)}
                    />
                  )}
                </div>
                <div
                  className="icon playlist_sound_playlist d-flex justify-content-end align-self-end "
                  onClick={showPlaylist}
                >
                  <QueueMusic fontSize="large" />
                </div>
              </div>

              <div className="sound  d-flex ">
                <div className="progressBar p-0  w-100 mt-1 ">
                  <Slider
                    value={volume * 100}
                    onChange={(e, newVolume) =>
                      changeVolume(audioRef.current, newVolume)
                    }
                    aria-labelledby="continuous-slider"
                  />
                </div>
                <div
                  className="icon col-2 p-0 d-flex align-self-center mr-2"
                  onClick={() => muteAndUnmuteMusic(audioRef.current)}
                >
                  {mute ? <VolumeOff /> : <VolumeUp />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Slide>
    </Fragment>
  );
};

export default PlayerOnWeb;

import { SwipeableDrawer } from "@material-ui/core";
import {
  Close,
  Pause,
  PlayArrowRounded,
  RepeatOneRounded,
  RepeatRounded,
  Shuffle,
  SkipNextRounded,
  SkipPreviousRounded,
} from "@material-ui/icons";
import { useContext, useEffect } from "react";
import AppContext from "./contexts/appContext";
import defualtPhoto from "./assets/defualtPhoto.jpeg";
import "./Left.css";
import playerContext from "./player/playerContext";
import SongOnLeft from "./SongOnLeft";
import Bar from "./player/Bar";
import Time from "./player/Time";
import authContext from "./auth/authContext";
import SpinnerLoading from "./spinner/SpinnerLoading";

const Left = () => {
  const { showLeft, ChangeShowLeft, showMusic } = useContext(AppContext);
  const { changeShowLoginModal } = useContext(authContext);
  const {
    playList,
    currentProgress,
    handleChange,
    previousMusic,
    nextMusic,
    playAndPauseMusic,
    playing,
    // eslint-disable-next-line
    totalDuration,
    changeShuffle,
    shuffle,
    songSinger,
    songName,
    songPhoto,
    noneOrLoopOrRepeat,
    changeNoneOrLoopOrRepeat,
    loading,
    forceStop,
  } = useContext(playerContext);

  // console.log(playList);
  const removeLeft = () => {
    ChangeShowLeft(false);
  };
  useEffect(() => {}, [currentProgress]);
  const zeroPad = (num, places) => String(num).padStart(places, "0");
  return (
    <SwipeableDrawer
      // direction="right" timeout={500} in={showLeft}
      anchor={"left"}
      open={showLeft}
      onClose={() => ChangeShowLeft(false)}
      onOpen={() => ChangeShowLeft(true)}
    >
      <div
        className={`playList text-light ${
          showMusic ? "padding__showMusic__110" : "padding__showMusic__50"
        } `}
      >
        <div className="bg__gray">
          <div className="playerInfo d-flex ">
            <Close className="closeBtn" onClick={removeLeft} fontSize="large" />
            {songName !== "" && (
              <>
                <div className="info__image mr-3">
                  <img
                    src={songPhoto !== null ? songPhoto : defualtPhoto}
                    alt=""
                  />
                </div>
                <div className="info mr-3">
                  <div className="info__title mb-2">{songName}</div>
                  <div className="info__person mb-4"> {songSinger}</div>
                </div>
              </>
            )}
          </div>
          <div className="icons d-flex justify-content-around mt-3 mb-4">
            <div
              className={`icon__shuffle align-self-center ${
                shuffle ? "icon__shuffle__press" : ""
              } align-items-center`}
              onClick={() => changeShuffle()}
            >
              <Shuffle style={{ fontSize: 25 }} />
              {shuffle && <span className="icon__title">shuffle</span>}
            </div>
            <div className="icon  " onClick={() => previousMusic()}>
              <SkipPreviousRounded style={{ fontSize: 35 }} />
            </div>
            {loading ? (
              <div className="leftside_spinner">
                <SpinnerLoading />
              </div>
            ) : (
              <div
                className="icon  "
                onClick={() =>
                  !forceStop ? playAndPauseMusic() : changeShowLoginModal(true)
                }
              >
                {playing ? (
                  <Pause style={{ fontSize: 35 }} />
                ) : (
                  <PlayArrowRounded style={{ fontSize: 35 }} />
                )}
              </div>
            )}

            <div className="icon  " onClick={() => nextMusic()}>
              <SkipNextRounded style={{ fontSize: 35 }} />
            </div>
            {noneOrLoopOrRepeat === 0 ? (
              <div
                onClick={() => changeNoneOrLoopOrRepeat()}
                className={` icon__loop align-self-center `}
              >
                <RepeatRounded style={{ fontSize: 25 }} />
              </div>
            ) : noneOrLoopOrRepeat === 1 ? (
              <div
                onClick={() => changeNoneOrLoopOrRepeat()}
                className={`icon__loop__press align-self-center `}
              >
                <RepeatRounded style={{ fontSize: 25 }} />
              </div>
            ) : (
              <div
                onClick={() => changeNoneOrLoopOrRepeat()}
                className={`icon__repeatOne__press align-self-center `}
              >
                <RepeatOneRounded style={{ fontSize: 25 }} />
              </div>
            )}
          </div>
          <div className="playlist__musicBar m d-flex mb-4 mt-2 justify-content-center">
            <div className="player__zone d-flex  col-10 p-0">
              <div className="current-time  d-flex align-items-center">
                <Time />
              </div>
              <div className="player d-flex align-items-center mx-2">
                <Bar
                  loading={loading}
                  currentProgress={currentProgress}
                  handleChange={handleChange}
                />
                {/* <Slider
                  variant="determinate"
                  value={currentProgress}
                  onChange={(e, newDuration) => handleChange(newDuration)}
                /> */}
              </div>
              <div className="last-time d-flex align-items-center">
                {Math.floor(totalDuration / 60) +
                  ":" +
                  zeroPad(Math.floor(totalDuration % 60), 2)}
              </div>
            </div>
          </div>
        </div>
        {playList && playList.length !== 0 ? (
          <div className="songs ">
            {playList?.map((item, i) => (
              <SongOnLeft
                key={item.id}
                item={item.post ? item.post : item}
                playlist={playList}
                zeroPad={zeroPad}
                number={i + 1}
                // isFileItem={item.fileItem ? true : false}
              />
            ))}
          </div>
        ) : (
          <div className="playList__songs__empty">لیست خالی است</div>
        )}
      </div>
    </SwipeableDrawer>
  );
};

export default Left;

import { Pause, PlayArrowRounded } from "@material-ui/icons";
import { useContext } from "react";
import { Badge } from "react-bootstrap";
import AppContext from "./contexts/appContext";
import defualtPhoto from "./assets/defualtPhoto.jpeg";
import "./RowItem.css";
import { Link } from "react-router-dom";
import playerContext from "./player/playerContext";
import axios from "./axios/axios";
import Axios from "axios";
// import logo from "./assets/0.jpg";
import SpinnerLoading from "./spinner/SpinnerLoading";
import authContext from "./auth/authContext";
import PlaySvg from "./svgs/PlaySvg";
// import { LazyLoadImage } from "react-lazy-load-image-component";
const CancelToken = Axios.CancelToken;

let cancel;
const RowItem = ({ media, person, slug, context, isRow }) => {
  // let { slug } = useParams();
  // eslint-disable-next-line
  const { ChangeShowMusic, ChangeshowCenter, showMusic } = useContext(
    AppContext
  ); // eslint-disable-next-line
  const {
    playMusic,
    playing,
    songId,
    loading,
    setUrl,
    setIds,
    playAndPauseMusic,
  } = useContext(playerContext);

  const { testAuth } = useContext(authContext);
  // console.log(context);
  const playMusicAndShowMusicBar = async () => {
    // نشان دادن موزیک و پخش موزیک
    if (!showMusic) {
      ChangeShowMusic();
    }
    if (media?.id === songId) {
      playAndPauseMusic();
    } else {
      setIds(
        media?.telegram_id,
        media?.id,
        media?.duration,
        media?.name,
        person?.[0]?.name,
        media?.image !== null ? media?.image : person?.[0]?.image.full_image_url
      );
      if (cancel !== undefined) {
        cancel();
      }
      // console.log(media?.name, person?.[0]?.name);
      try {
        const res = await axios.downloader.get(`/${media?.telegram_id}`, {
          cancelToken: new CancelToken(function executor(c) {
            cancel = c;
          }),
        });
        // console.log();
        setUrl(res.data.download_link, context);
        // if (!showMusic) {
        //   ChangeShowMusic();
        // }
        playMusic();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const truncate = (str, no_words) => {
    return str?.split(" ").splice(0, no_words).join(" ");
  };
  return (
    <div className="carousel-cellRowItem rowItem ">
      {isRow && media?.id === songId && (
        <>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </>
      )}

      <div className="rowItem__image">
        {isRow ? (
          <img
            data-flickity-lazyload={
              "data:image/jpeg;base64,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"
            }
            // src={
            //   media?.[0]?.image !== null && media?.[0]?.image !== undefined
            //     ? media?.[0]?.image
            //     : person?.[0]?.image.full_image_url !== null
            //     ? person?.[0]?.image.full_image_url
            //     : defualtPhoto
            // }
            alt="logo"
          />
        ) : (
          <img
            src={
              "data:image/jpeg;base64,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"
            }
            // src={
            //   media?.[0]?.image !== null && media?.[0]?.image !== undefined
            //     ? media?.[0]?.image
            //     : person?.[0]?.image.full_image_url !== null
            //     ? person?.[0]?.image.full_image_url
            //     : defualtPhoto
            // }
            alt="logo"
          />
        )}

        {/* <img src={logo} alt="logo" /> */}

        {/* mobile ratio  */}
        {loading && media?.id === songId ? (
          <div className="rowItem__playing">
            <SpinnerLoading />
          </div>
        ) : playing && media?.id === songId ? (
          <div className=" moblie_play" onClick={() => playAndPauseMusic()}>
            <Pause style={{ fontSize: "100px" }} />
          </div>
        ) : (
          <div className=" moblie_play" onClick={playMusicAndShowMusicBar}>
            <PlayArrowRounded style={{ fontSize: "100px" }} />
          </div>
        )}

        {/* web ratio  */}
        {loading && media?.id === songId ? (
          <div className="play__music___spinner">
            <SpinnerLoading />
          </div>
        ) : playing && media?.id === songId ? (
          <div className=" play__music" onClick={() => playAndPauseMusic()}>
            <Pause />
          </div>
        ) : (
          <div className=" play__music">
            <PlaySvg playMusicAndShowMusicBar={playMusicAndShowMusicBar} />
            {/* <SpinnerLoading /> */}
          </div>
        )}
        <Badge className="badge bg-light">{/* شور */}</Badge>
        {/* </Link> */}
      </div>
      {/* <div className='rowItem__onHover'>
        <div className='rowItem__icons'>
          <div className='rowItem__icon' onClick={playMusicAndShowMusicBar}>
            <PlayCircleFilled fontSize='large' />
          </div>
          <div className='rowItem__icon' onClick={ChangeshowCenter}>
            <PlaylistAdd fontSize='large' />
          </div>
        </div>
      </div>{' '} */}
      <div className="rowItem__info ">
        <Link
          to={`/song/${slug}`}
          className="visit "
          onClick={() => testAuth()}
        >
          <h4 className="rowItem__title text-center">
            {truncate(media?.name, 4)}
            {/* {media?.name} */}
          </h4>
        </Link>
        <Link
          to={`/person/${person?.[0]?.slug}`}
          className="visit "
          onClick={() => testAuth()}
        >
          <h4 className="rowItem__person text-center">
            {/* حاج محمد شریفی */}
            {person?.[0]?.name}
          </h4>
        </Link>
      </div>
    </div>
  );
};

export default RowItem;

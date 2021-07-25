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
const RowItem = ({
  media,
  person,
  slug,
  context,
  isRow,
  postId,
  meta_description,
  meta_title,
  description,
  title,
  logo,
}) => {
  // let { slug } = useParams();
  // eslint-disable-next-line
  const {
    ChangeShowMusic,
    showMusic,
    changeHomeMeta,
    addMusicToRecentlyViewed,
  } = useContext(AppContext); // eslint-disable-next-line
  const {
    playMusic,
    playing,
    songId,
    loading,
    setUrl,
    setIds,
    playAndPauseMusic,
  } = useContext(playerContext);

  const { changeShowLoginModal, checkIfForce, user } = useContext(authContext);
  // console.log(media?.name);
  const playMusicAndShowMusicBar = async () => {
    // نشان دادن موزیک و پخش موزیک

    // ارسال متا تایتل ها (توضیحات) آهنگ به صفحه اصلی
    if (checkIfForce()) {
      changeShowLoginModal(true);
    } else {
      sendToHome();
      user !== null && addMusicToRecentlyViewed(1, postId);
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
          logo?.full_image_url
            ? logo?.full_image_url
            : media?.image !== null
            ? media?.image
            : person?.[0]?.image.full_image_url,
          postId,
          slug
        );
        if (cancel !== undefined) {
          cancel();
        }

        if (media.path) {
          setUrl(media.path, context);
          playMusic();
        } else {
          try {
            const res = await axios.downloader.get(`/${media?.telegram_id}`, {
              cancelToken: new CancelToken(function executor(c) {
                cancel = c;
              }),
            });

            setUrl(res.data.download_link, context);
            // if (!showMusic) {
            //   ChangeShowMusic();
            // }
            playMusic();
          } catch (error) {
            console.log(error);
          }
        }

        // const songPhotoUrl = logo?.full_image_url
        //   ? logo?.full_image_url
        //   : media?.image !== null
        //   ? media?.image
        //   : person?.[0]?.image.full_image_url;
        // const MusicPhotoIcon = document.getElementById("musicPhoto");
        // songPhotoUrl !== null && (MusicPhotoIcon.href = songPhotoUrl);
        // console.log(MusicPhotoIcon.href);
      }
    }
  };

  const truncate = (str, no_words) => {
    return str?.split(" ").splice(0, no_words).join(" ");
  };
  const sendToHome = () => {
    const sendTitle = meta_title
      ? meta_title
      : title !== null && title !== ""
      ? title
      : media?.name;
    const sendDescription = meta_description
      ? meta_description
      : description !== null && description !== ""
      ? description
      : media?.name;

    changeHomeMeta(sendTitle, sendDescription);
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
        {/* {isRow ? (
          <img
            data-flickity-lazyload={
              logo?.full_image_url
                ? logo?.full_image_url
                : media?.[0]?.image !== null && media?.[0]?.image !== undefined
                ? media?.[0]?.image
                : person?.[0]?.image?.full_image_url !== null
                ? person?.[0]?.image?.full_image_url
                : defualtPhoto
            }
            alt="logo"
          />
        ) : ( */}
        <img
          src={
            logo?.full_image_url
              ? logo?.full_image_url
              : media?.[0]?.image !== null && media?.[0]?.image !== undefined
              ? media?.[0]?.image
              : person?.[0]?.image?.full_image_url !== null
              ? person?.[0]?.image?.full_image_url
              : defualtPhoto
          }
          alt="logo"
        />
        {/* )} */}

        {/* mobile ratio  */}
        {loading && media?.id === songId ? (
          <div className="rowItem__playing">
            <SpinnerLoading />
            <div className="prepareSong">در حال آماده سازی</div>
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
            <div className="prepareSong">در حال آماده سازی</div>
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

      <div className="rowItem__info ">
        <Link
          to={`/song/${slug}`}
          className="visit "
          // onClick={() => testAuth()}
        >
          {/* <h4 className="rowItem__title">{truncate(media?.name, 4)}</h4> */}
          <h4 className="rowItem__title text-center">
            <div className="scroll__rowItem__title">
              {/* {truncate(media?.name, 4)} */}
              {title ? title : media?.name}
            </div>
            <div className="steady__rowItem__title">
              {truncate(title ? title : media?.name, 4)}
              {/* {media?.name} */}
            </div>
            {/* {media?.name} */}
          </h4>
        </Link>
        <Link
          to={`/person/${person?.[0]?.slug}`}
          className="visit "
          // onClick={() => testAuth()}
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

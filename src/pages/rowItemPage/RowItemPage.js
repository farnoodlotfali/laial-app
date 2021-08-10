import { IconButton, Tooltip } from "@material-ui/core";
import {
  Favorite,
  GetAppRounded,
  Pause,
  PlaylistAdd,
  Visibility,
} from "@material-ui/icons";
import { Fragment, useContext, useEffect } from "react";
import { useParams } from "react-router";
import "./RowItemPage.css";
import Flickity from "react-flickity-component";
import Spinner from "../../spinner/Spinner";
import { Modal } from "react-bootstrap";
import { useState } from "react";
import defualtPhoto from "../../assets/defualtPhoto.jpeg";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import PlaySvg from "../../svgs/PlaySvg";
import SpinnerLoading from "../../spinner/SpinnerLoading";
import appContext from "../../contexts/appContext";
import playerContext from "../../player/playerContext";
import authContext from "../../auth/authContext";
import RowItem from "../../RowItem";
import axios from "../../axios/axios";

const RowItemPage = () => {
  const [show, setShow] = useState(false);
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    password: "",
  });
  const { email, password } = userInfo;
  const flickityOptions = {
    // initialIndex: 2,
    contain: true,
    prevNextButtons: false,
    pageDots: false,
    rightToLeft: true,
  };
  const {
    ChangeShowMusic,
    showMusic,
    getSongPage,
    dataSongPage,
    viewPage,
    pageLoading,
    downloadUrl,
    viewsPage,
    like,
    getRecommender,
    recommender,
    likeSong,
    setWhichSongToSaveInPlaylist,
    addToLikedSongPlaylist,
    addMusicToRecentlyViewed,
  } = useContext(appContext);
  const {
    setUrl,
    playMusic,
    setIds,
    playing,
    loading,
    songId,
    playAndPauseMusic,
  } = useContext(playerContext);

  const { error, login, loadUser, user, isAuth, checkIfForce } =
    useContext(authContext);

  let params = useParams();
  useEffect(() => {
    getSongPage(params.slug);
    viewPage(params.slug);
    getRecommender();
    loadUser();
    // گرفته میشود و در حال حاضر کامنت است  getSongPage  ادرس دانلود اهنگ در
    // eslint-disable-next-line
  }, [params.slug, user]);
  // نشان دادن موزیک و پخش موزیک
  const playMusicAndShowMusicBar = async () => {
    if (dataSongPage?.media?.[0]?.id === songId) {
      playAndPauseMusic();
    } else {
      setIds(
        dataSongPage?.media?.[0]?.telegram_id,
        dataSongPage?.media?.[0]?.id,
        dataSongPage?.media?.[0]?.duration,
        dataSongPage?.title
          ? dataSongPage?.title
          : dataSongPage?.media?.[0]?.name,
        dataSongPage?.person?.[0]?.name,
        dataSongPage?.image?.full_image_url
          ? dataSongPage?.image?.full_image_url
          : dataSongPage?.media?.[0]?.image !== null
          ? dataSongPage?.media?.[0]?.image
          : dataSongPage?.person?.[0]?.image.full_image_url,
        dataSongPage?.id,
        dataSongPage?.slug,
        dataSongPage?.meta_title
          ? dataSongPage?.meta_title
          : dataSongPage?.title,
        dataSongPage?.meta_description
          ? dataSongPage?.meta_description
          : dataSongPage?.description
      );
      if (dataSongPage?.media?.[0]?.path) {
        setUrl(dataSongPage?.media?.[0]?.path, recommender);
        if (!showMusic) {
          ChangeShowMusic();
        }
        playMusic();
      } else {
        try {
          const res = await axios.downloader.get(
            `/${dataSongPage?.media?.[0]?.telegram_id}`
          );
          // console.log(res.data.download_link);recommender
          setUrl(res.data.download_link, recommender);
          if (!showMusic) {
            ChangeShowMusic();
          }
          playMusic();
        } catch (error) {
          console.log(error);
        }
      }
      user !== null && addMusicToRecentlyViewed(1, dataSongPage?.id);
    }
  };
  const onchange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };
  // console.log(downloadUrl);
  return (
    <Fragment>
      {!playing && (
        <Helmet>
          <title>
            {dataSongPage?.meta_title !== null
              ? dataSongPage?.meta_title
              : dataSongPage?.title
              ? dataSongPage?.title
              : dataSongPage?.media?.[0]?.name}
          </title>
          <meta
            name="title"
            content={
              dataSongPage?.meta_title !== null
                ? dataSongPage?.meta_title
                : dataSongPage?.media?.[0]?.name
            }
          />
          <meta
            name="description"
            content={
              dataSongPage?.meta_description
                ? dataSongPage?.meta_description
                : dataSongPage?.description
            }
          />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={dataSongPage?.slug} />
          <meta
            property="og:title"
            content={
              dataSongPage?.meta_title !== null
                ? dataSongPage?.meta_title
                : dataSongPage?.media?.[0]?.name
            }
          />
          <meta
            property="og:description"
            content={
              dataSongPage?.meta_description
                ? dataSongPage?.meta_description
                : dataSongPage?.description
            }
          />
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content="http:app.7negare.ir/" />
          <meta
            property="twitter:title"
            content={
              dataSongPage?.meta_title !== null
                ? dataSongPage?.meta_title
                : dataSongPage?.media?.[0]?.name
            }
          />
          <meta
            property="twitter:description"
            content={
              dataSongPage?.meta_description
                ? dataSongPage?.meta_description
                : dataSongPage?.description
            }
          />
          {/* {dataSongPage['image'] && (
          <meta property='twitter:image' content={dataSongPage['image']} />
        )} */}
        </Helmet>
      )}

      {pageLoading ? (
        <Spinner />
      ) : (
        <div className="rowItemPage py-4  ">
          <div className="musicInfo d-flex px-2 justify-content-around mt-4">
            <div className="musicInfo__right ">
              <div className="musicInfo__image_section">
                <img
                  className="musicInfo__image "
                  src={
                    dataSongPage?.image?.full_image_url
                      ? dataSongPage?.image?.full_image_url
                      : dataSongPage?.media?.[0]?.image !== null &&
                        dataSongPage?.media?.[0]?.image !== undefined
                      ? dataSongPage?.media?.[0]?.image
                      : dataSongPage?.person?.[0]?.image.full_image_url !== null
                      ? dataSongPage?.person?.[0]?.image.full_image_url
                      : defualtPhoto
                  }
                  alt=""
                />
                {loading && songId === dataSongPage?.media?.[0]?.id ? (
                  <div className="rowItemPage_play__laoding_spinner">
                    <SpinnerLoading />
                  </div>
                ) : playing && songId === dataSongPage?.media?.[0]?.id ? (
                  <div
                    className=" rowItemPage_play__music"
                    onClick={() => playAndPauseMusic()}
                  >
                    <Pause />
                  </div>
                ) : (
                  <div className=" rowItemPage_play__music">
                    <PlaySvg
                      playMusicAndShowMusicBar={playMusicAndShowMusicBar}
                    />
                  </div>
                )}
              </div>

              <div className="actions d-flex justify-content-around mt-4">
                <div className="favorite">
                  <IconButton
                    aria-label="Favorite"
                    onClick={() =>
                      isAuth
                        ? likeSong(params.slug) &
                          addToLikedSongPlaylist(dataSongPage.id)
                        : setShow(true)
                    }
                  >
                    <Favorite
                      className="Favorite"
                      style={{ fontSize: "30px" }}
                    />
                  </IconButton>
                  {like}

                  <Modal
                    show={!isAuth && show}
                    onHide={() => setShow(false)}
                    className="favoritePopUp__login"
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>
                        برای لایک کردن، باید وارد حساب کاربری شوید
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          login({
                            email,
                            password,
                          });
                        }}
                      >
                        <div className="formGp d-flex justify-content-around">
                          <div className="inputBox">
                            <input
                              required
                              onChange={onchange}
                              name="password"
                              value={password}
                              type="password"
                              placeholder="رمز ورود"
                              minLength="8"
                            />
                          </div>
                          <div className="inputBox ">
                            <input
                              onChange={onchange}
                              name="email"
                              type="email"
                              value={email}
                              placeholder="ایمیل"
                              required
                            />
                          </div>
                        </div>
                        <div className="error__msg__login pt-2 ">
                          {error?.error} *
                        </div>
                        <div className="notRegister pt-2">
                          <span> ثبت نام نکرده اید؟ </span>
                          <Link to="/register">
                            <span> ثبت نام </span>
                          </Link>
                        </div>
                        <div className="formGp__btn d-flex justify-content-around ">
                          <div className="inputBox__login">
                            <input type="submit" value="ورود" />
                          </div>
                          <div className="inputBox__close">
                            <button onClick={() => setShow(false)}>بستن</button>
                          </div>
                        </div>
                      </form>
                    </Modal.Body>
                  </Modal>
                </div>
                {!checkIfForce() && (
                  <div>
                    <a href={downloadUrl} className="download">
                      <Tooltip placement="bottom" title="دانلود">
                        <IconButton aria-label="download">
                          <GetAppRounded style={{ fontSize: "30px" }} />
                        </IconButton>
                      </Tooltip>
                    </a>
                  </div>
                )}

                <div
                  onClick={() => setWhichSongToSaveInPlaylist(dataSongPage?.id)}
                >
                  <Tooltip placement="bottom" title="اضافه به لیست">
                    <IconButton aria-label="Add">
                      <PlaylistAdd
                        className="Add"
                        style={{ fontSize: "30px" }}
                      />
                    </IconButton>
                  </Tooltip>
                </div>
                <div className="view">
                  <IconButton aria-label="View">
                    <Visibility className="View" style={{ fontSize: "30px" }} />
                  </IconButton>
                  {viewsPage}
                </div>
              </div>
            </div>
            <div className="musicInfo__left text-light   justify-content-start align-items-center">
              <div className="musicInfo__name mt-5 mb-3 d-flex  ">
                نام اثر :
                {dataSongPage?.title
                  ? dataSongPage?.title
                  : dataSongPage?.media?.[0]?.name}
              </div>
              <div className="musicInfo__mode_singer">
                <div className="musicInfo__singer mb-3 d-flex ml-5">
                  نام خواننده : {dataSongPage?.person?.[0]?.name}
                </div>
                <div className="musicInfo__mode mb-3 d-flex">سبک : شور</div>
              </div>

              <div className=" mb-3 d-flex text-right">
                توضیحات :
                {dataSongPage?.description
                  ? dataSongPage?.description
                  : dataSongPage?.meta_description}
              </div>
            </div>
          </div>
          <hr />

          <div className="rowList  pt-5 ">
            <h5 className="text-light text-right pb-3 mr-4">
              <span>پیشنهاداتی برای شما</span>
            </h5>
            <Flickity
              className={`carousel  px-2 py-0  ${showMusic && "mb-5"} `}
              options={flickityOptions}
            >
              {recommender &&
                recommender.map((item, i) => {
                  return (
                    <RowItem
                      context={recommender}
                      key={item.id}
                      postId={item.id}
                      isRow={true}
                      logo={item.image}
                      media={item.media[0]}
                      person={item.person}
                      slug={item.slug}
                      meta_description={item.meta_description}
                      meta_title={item.meta_title}
                      description={item.description}
                      title={item.title}
                    />
                  );
                })}
            </Flickity>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default RowItemPage;

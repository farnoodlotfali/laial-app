import { useContext } from "react";
import { IconButton, Tooltip } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import playerContext from "./player/playerContext";
import defualtPhoto from "./assets/defualtPhoto.jpeg";
import s from "./assets/z.gif";
import axios from "./axios/axios";
import appContext from "./contexts/appContext";
// eslint-disable-next-line
const SongOnLeft = ({ item, playlist, number, zeroPad }) => {
  const { setUrl, playList, playMusic, setIds, songId } = useContext(
    playerContext
  );
  const { ChangeShowMusic, showMusic } = useContext(appContext);
  const paly = async () => {
    setIds(
      item.media[0]?.telegram_id,
      item.media[0]?.id,
      item.media[0]?.duration,
      item.media[0]?.name,
      item.person?.[0]?.name,
      item?.media?.[0]?.image !== null
        ? item?.media?.[0]?.image
        : item?.person?.[0]?.image.full_image_url
    );

    try {
      const res = await axios.downloader.get(`/${item.media[0]?.telegram_id}`);
      setUrl(res.data.download_link, playList);

      if (!showMusic) {
        ChangeShowMusic();
      }
      playMusic();
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(item);
  return (
    <div className="songOnLeft">
      <div className="song d-flex my-5 justify-content-between">
        <div className="song__right d-flex">
          <div className="number align-self-center">{number}</div>
          <div className="song__image" onClick={() => paly()}>
            <img
              src={
                item?.media?.[0]?.image !== null
                  ? item?.media?.[0]?.image
                  : item?.person?.[0]?.image.full_image_url !== null
                  ? item?.person?.[0]?.image.full_image_url
                  : defualtPhoto
              }
              alt=""
            />
            {item.media[0]?.id === songId ? (
              <img
                src={s}
                alt=""
                style={{ position: "absolute", left: "0", opacity: "0.4" }}
              />
            ) : (
              // <div className="overlay">
              //   <div className="now playing" id="music">
              //     <span className="bar n1">A</span>
              //     <span className="bar n2">B</span>
              //     <span className="bar n3">G</span>
              //     <span className="bar n4">H</span>
              //   </div>
              // </div>
              ""
            )}
          </div>
          <div className="song__info mr-3 align-self-center ">
            <div className="song__title">{item.media[0].name}</div>
            <div className="song__person ">{item.person[0].name}</div>
          </div>
          <div className="song__center d-flex align-self-center"></div>
        </div>

        <div className="song__left d-flex">
          <div className="song__time align-self-center text-muted">
            {Math.floor(item.media[0].duration / 60) +
              ":" +
              zeroPad(Math.floor(item.media[0].duration % 60), 2)}
          </div>
          <div className="deleteSongBtn d-flex align-self-center ">
            <Tooltip placement="right" title="Delete ">
              <IconButton aria-label="delete" color="inherit">
                <Delete fontSize="inherit" />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SongOnLeft;

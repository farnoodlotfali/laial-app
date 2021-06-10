import { DeleteRounded, PlayArrowRounded } from "@material-ui/icons";
import { useContext } from "react";
import { Link } from "react-router-dom";
import defualtPhoto from "./assets/defualtPhoto.jpeg";
import axios from "./axios/axios";
import appContext from "./contexts/appContext";
import playerContext from "./player/playerContext";

const MyProfileSong = ({ item, zeroPad, truncate, deleteBtn, playlist }) => {
  const { ChangeShowMusic, showMusic, removeSongFromPlaylist } =
    useContext(appContext);
  const { setUrl, playMusic, setIds } = useContext(playerContext);
  const paly = async () => {
    setIds(
      item?.post.media[0]?.telegram_id,
      item?.post.media[0]?.id,
      item?.post.media[0]?.duration,
      item?.post.media[0]?.name,
      item?.post.person?.[0]?.name,
      item?.post?.media?.[0]?.image !== null
        ? item?.post?.media?.[0]?.image
        : item?.post?.person?.[0]?.image.full_image_url,
      item?.post.id
    );
    if (item?.post.media[0]?.path) {
      // console.log("path");
      setUrl(item?.post.media[0]?.path, playlist);
      playMusic();
      if (!showMusic) {
        ChangeShowMusic();
      }
    } else {
      try {
        const res = await axios.downloader.get(
          `/${item?.post.media[0]?.telegram_id}`
        );
        setUrl(res.data.download_link, playlist);

        if (!showMusic) {
          ChangeShowMusic();
        }
        playMusic();
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="myProfileSong">
      <div className="song d-flex">
        <div className="songImg">
          <img
            src={
              item?.post?.media?.[0]?.image !== null &&
              item?.post?.media?.[0]?.image !== undefined
                ? item?.post?.media?.[0]?.image
                : item?.post?.person?.[0]?.image.full_image_url !== null
                ? item?.post?.person?.[0]?.image.full_image_url
                : defualtPhoto
            }
            alt="songlogo"
          />
          <div
            className="myProfileSong_playbtn"
            onClick={() => {
              paly();
            }}
          >
            <PlayArrowRounded />
          </div>
        </div>
        <div className="songInfo">
          <span className="songName">
            <Link to={`/song/:${item?.post?.slug}`}>
              {truncate(item?.post?.media?.[0]?.name, 4)}
            </Link>
          </span>
          <span className="songSinger">{item?.post?.person?.[0]?.name}</span>
        </div>
        <div className="songTime">
          <span>
            {item?.post?.media?.[0]?.duration &&
              Math.floor(item?.post?.media?.[0]?.duration / 60) +
                ":" +
                zeroPad(Math.floor(item?.post?.media?.[0]?.duration % 60), 2)}
          </span>
          {deleteBtn && (
            <div
              className="listItemsShow__delete"
              onClick={() =>
                removeSongFromPlaylist(
                  item?.post?.PostIdForDeleteFromUserPlaylist
                )
              }
            >
              <DeleteRounded />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfileSong;

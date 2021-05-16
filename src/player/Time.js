import { useEffect, useState, useContext } from "react";
import appContext from "../contexts/appContext";
import playerContext from "./playerContext";

const Time = () => {
  const { addMusicToRecentlyViewed, thisSongHasBeenAddedToRecentlyViwed } =
    useContext(appContext);
  const { postId } = useContext(playerContext);
  const zeroPad = (num, places) => String(num).padStart(places, "0");
  const [time, settime] = useState(0);
  const [x, setx] = useState(false);

  useEffect(() => {
    const audio = document.getElementById("audio2");

    const setAudioTime = () => {
      settime(
        Math.floor(audio?.currentTime / 60) +
          ":" +
          zeroPad(Math.floor(audio?.currentTime % 60), 2)
      );
      // console.log(
      //   parseFloat((audio?.duration / 3).toFixed(1)) ===
      //     parseFloat((audio?.currentTime).toFixed(1))
      // );
      if (
        !thisSongHasBeenAddedToRecentlyViwed &&
        parseFloat((audio?.duration / 3).toFixed(1)) ===
          parseFloat((audio?.currentTime).toFixed(1))
      ) {
        // console.log(111);
        // setx(true);
        addMusicToRecentlyViewed(1, postId);
      }
    };

    audio?.addEventListener("timeupdate", setAudioTime);
    return () => {
      audio?.removeEventListener("timeupdate", setAudioTime);
    };
  }, [postId, thisSongHasBeenAddedToRecentlyViwed]);

  // console.log(addToRecentlyViewed);
  return <>{time}</>;
};

export default Time;

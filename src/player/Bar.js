import { Slider } from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import playerContext from "./playerContext";
const Bar = ({
  loading,
  // currentProgress,
  handleChange,
  className = "",
}) => {
  const { progressToZero } = useContext(playerContext);

  //   console.log(audio);
  const [progress, setprogress] = useState(0);
  useEffect(() => {
    const audio = document.getElementById("audio2");
    const setAudioTime = () => {
      setprogress(
        parseFloat(((audio?.currentTime * 100) / audio?.duration).toFixed(2))
      );
      if (progressToZero) {
        setprogress(0);
      }
    };

    audio?.addEventListener("timeupdate", setAudioTime);
    return () => {
      // audio.removeEventListener("loadeddata", setAudioData);
      audio?.removeEventListener("timeupdate", setAudioTime);
    };
  }, [progressToZero]);

  // console.log(parseFloat(progress.toFixed(0)) === 33);
  return (
    <Slider
      disabled={loading}
      className={className}
      variant="determinate"
      value={progress}
      onChange={(e, newDuration) => handleChange(newDuration)}
    />
  );
};

export default Bar;

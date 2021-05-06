import { Slider } from "@material-ui/core";
import { useEffect, useState } from "react";
const Bar = ({ loading, currentProgress, handleChange, className = "" }) => {
  //   console.log(audio);
  const [progress, setprogress] = useState(0);

  useEffect(() => {
    const audio = document.getElementById("audio2");

    const setAudioTime = () => {
      setprogress(
        parseFloat(((audio?.currentTime * 100) / audio?.duration).toFixed(2))
      );
    };

    audio?.addEventListener("timeupdate", setAudioTime);
    return () => {
      // audio.removeEventListener("loadeddata", setAudioData);
      audio?.removeEventListener("timeupdate", setAudioTime);
    };
  }, []);

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

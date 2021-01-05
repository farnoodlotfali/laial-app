import React, { useState } from 'react';
import { useRef } from 'react';

// https://files.musico.ir/Song/Ehsan%20Daryadel%20-%20Koochamoon%20(320).mp3
const urls = [
  {
    url:
      'https://files.musico.ir/Song/Ehsan%20Daryadel%20-%20Koochamoon%20(320).mp3',
    name: 'darya',
    id: 323,
  },
  {
    url:
      'http://dl.musicdam.net/Downloads/mp3/Hayedeh%20-%20Badeh%20Foroosh%20128.mp3',
    name: 'hayde1',
    id: 901,
  },
  {
    url:
      'http://dl.musicdam.net/Downloads/mp3/Hayedeh%20-%20Bordi%20Az%20Yadam%20128.mp3',
    name: 'darya1',
    id: 413,
  },
  {
    url: 'http://dl.musicdam.net/Downloads/mp3/Hayedeh%20-%20Soghati%20128.mp3',
    name: 'hayde2',
    id: 881,
  },
];

const Test = () => {
  const audioRef = useRef();

  const state = {
    id: 0,
    playing: false,
    loaded: false,
    loop: false,
    isChangeTime: false,
    mute: false,
    volume: 1.0,
    seek: 0.0,
    isSeeking: false,
  };
  const [source, setSource] = useState(urls[state.id]);

  const handlePlay = () => {
    // console.log(document.getElementById('player').volume);
    document.getElementById('player').play();
  };
  const handlePause = () => {
    document.getElementById('player').pause();
  };
  const handleVolumeUp = () => {
    let volume = document.getElementById('player');
    if (volume.volume !== 1) {
      volume.volume = 0.9;
    }
  };
  const handleVolumeDown = () => {
    let volume = document.getElementById('player');
    if (volume.volume - 0.1 > 0) {
      volume.volume = 0.5;
    }
  };
  const handleMute = () => {
    let volume = document.getElementById('player');
    volume.muted ? (volume.muted = false) : (volume.muted = true);
  };
  const handleNext = () => {
    // console.log(source);
    for (let i = 0; i < urls.length; i++) {
      if (source.name === urls[i].name) {
        console.log(i);

        setSource(urls[i + 1]);
        if (urls[i + 1] === undefined) {
          setSource(urls[0]);
        }
        console.log(source);
      }
    }

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
      audioRef.current.play();
    }
  };
  // console.log(audioRef.current.childNodes[1].attributes.id.value);
  return (
    <div className=''>
      <audio
        ref={audioRef}
        id='player'
        onCanPlayThrough={() => console.log(900)}
        // onTimeUpdate={() => console.log(200)}
      >
        {' '}
        <source src={source.url} type='audio/mpeg' id={source.id} />
      </audio>
      <div>
        <button onClick={handlePlay}>Play</button>
        <button onClick={handlePause}>Pause</button>
        <button onClick={handleVolumeUp}>Vol +</button>
        <button onClick={handleVolumeDown}>Vol -</button>
        <button onClick={handleNext}>next</button>
        <button onClick={handleMute}>mute</button>
      </div>
    </div>
  );
};

export default Test;

/*const useAudio = (url) => {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [playing]);

  useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false));
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false));
    };
  }, []);

  return [playing, toggle];
};

const Test = () => {
  const [playing, toggle] = useAudio(
    'https://files.musico.ir/Song/Ehsan%20Daryadel%20-%20Koochamoon%20(320).mp3'
  );

  const play = async () => {
    try {
      const audio = new Audio(
        'https://files.musico.ir/Song/Ehsan%20Daryadel%20-%20Koochamoon%20(320).mp3'
      );
      const player = await audio.play();
      if (player) {
        //Older browsers may not return a promise, according to the MDN website
        player.catch(function (error) {
          console.error(error);
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  play();
  return (
    <div className='test'>
      <button onClick={toggle}>{playing ? 'Pause' : 'Play'}</button> 
      <button onClick={Next}>next </button> 
    </div>
  );
};

export default Test;*/

//   const [music, setmusic] = useState(null);
//   useEffect(() => {
//     const getUrl = async () => {
//       try {
//         const res = await axios.get(
//           'http://downloader.7negare.ir/download/693'
//         );
//         // console.log(res.data.download_link);
//         setmusic(res.data.download_link);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     getUrl();
//   }, []);
//   console.log(music);

import React, { useState } from 'react';
import { useRef } from 'react';
import ReactPlayer from 'react-player';
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

  // const q = () => {
  //   let audio = document.createElement('audio');
  //   audio.setAttribute('ref', 'audioRef');
  //   audio.setAttribute('className', 'player');
  //   audio.setAttribute('type', 'audio/mpeg');
  //   audio.setAttribute('preload', 'metadata');
  //   audio.setAttribute('autoPlay', '{state.playing}');
  //   audio.setAttribute('src', '{state.currentUrl}');
  //   document.getElementById('audio').appendChild(audio);
  // };
  // return (
  //   <div className=''>
  //     <div id='audio'>
  //       <button onClick={q}>create</button>
  //     </div>
  //   </div>
  // <div className=''>
  //   <ReactPlayer
  //     ref={audioRef}
  //     playing={true}
  //     controls={true}
  //     autoPlay={true}
  //     // url='https://files.musico.ir/Song/Ehsan%20Daryadel%20-%20Koochamoon%20(320).mp3'
  //     url='http://dl.rovzenews.ir/telegram/760/760.mp3'

  //     // src='https://files.musico.ir/Song/Ehsan%20Daryadel%20-%20Koochamoon%20(320).mp3'
  //     // onPlay={(e) => console.log(audioRef.current.duration)}
  //     // other props here
  //   />
  // </div>
  // );
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

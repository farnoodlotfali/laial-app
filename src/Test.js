// import {
//   Pause,
//   PauseCircleFilledRounded,
//   PlayArrowRounded,
//   SkipNext,
//   SkipNextOutlined,
//   SkipPreviousRounded,
// } from "@material-ui/icons";
// import { useEffect, useRef, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "./axios/axios";
// import SpinnerLoading from "./spinner/SpinnerLoading";
// import "./Test.css";
// import Axios from "axios";

// import defualtPhoto from "./assets/defualtPhoto.jpeg";
// import Flickity from "react-flickity-component";
// import { Fragment } from "react";
// import { Slider } from "@material-ui/core";
// const CancelToken = Axios.CancelToken;

// let cancel;
// const audio = document.createElement("audio");

// const Test = () => {
//   const audioRef = useRef();

//   const flickityOptions = {
//     // initialIndex: 2,
//     fullscreen: true,
//     lazyLoad: 5,

//     contain: true,
//     prevNextButtons: false,
//     pageDots: false,
//     rightToLeft: true,
//   };
//   const [songs, setSongs] = useState(null);
//   const [context, setcontext] = useState(null);
//   const [audioOp, setAudioOp] = useState({
//     loading: false,
//     songId: null,
//     playing: false,
//     telegram_id: null,
//     download_link: null,
//     duration: 0,
//     currentTime: 0,
//     progress: 0,
//   });
//   useEffect(() => {
//     const getSongs = async () => {
//       try {
//         const res = await axios.instanceApi.get("/page/home/");
//         // console.log(res.data.data[0].block[0].data.context);
//         setcontext(res.data.data[0].block[0].data.context);
//         setSongs(res.data.data[0].block[0].data.context);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     songs === null && getSongs();
//   }, [audioOp]);

//   const truncate = (str, no_words) => {
//     return str?.split(" ").splice(0, no_words).join(" ");
//   };

//   const getUrl = async (song) => {
//     // console.log(audioOp);
//     try {
//       const res = await axios.downloader.get(
//         `/${song.media?.[0].telegram_id}`,
//         {
//           cancelToken: new CancelToken(function executor(c) {
//             cancel = c;
//           }),
//         }
//       );
//       // console.log(res.data);
//       setAudioOp({
//         ...audioOp,
//         download_link: res.data.download_link,
//         songId: song.id,
//         telegram_id: song.media[0]?.telegram_id,
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const stopSong = () => {
//     // audioRef.current.pause();
//   };
//   useEffect(() => {
//     // console.log(909);download_link":"http://dl.rovzenews.ir/telegram/1283/1283.mp3","status":200}
//     audio.src =
//       // "http://dl.rovzenews.ir/telegram/1283/1283.mp3";
//       //   "http://dl.sarimusic.net/1395/08/30/Hayedeh/Hayedeh%20-%20Badeh%20Forush.mp3";
//       "https://files.musico.ir/Song/Ehsan%20Daryadel%20-%20Koochamoon%20(320).mp3";
//     audio.pause();
//     audio.load();
//     audio.addEventListener("loadedmetadata", async () => {
//       await audio.play();
//     });
//   }, [audioOp.download_link]);
//   const makeAudio = () => {
//     audioRef.current = audio;
//   };

//   const handleLoadedMetadata = () => {
//     console.log(222);
//     audioRef.current.play();

//     setAudioOp({
//       ...audioOp,
//       duration: audioRef.current.duration,
//       currentTime: audioRef.current.currentTime,
//     });

//     // console.log(audioRef.current.duration);
//   };
//   const play = async () => {
//     audioRef.current.play();
//     setAudioOp({
//       ...audioOp,
//       playing: true,
//     });
//   };
//   const pause = () => {
//     audioRef.current.pause();
//     setAudioOp({
//       ...audioOp,
//       playing: false,
//     });
//   };
//   const handleChange = (e, newDuration) => {
//     console.log(newDuration);
//     console.log(e);
//     e.preventDefault();
//     const adTime = (audio.duration * newDuration) / 100;
//     setAudioOp({
//       ...audioOp,
//       progress: newDuration,
//       currentTime: adTime,
//     });
//     audio.currentTime = adTime;
//   };

//   return (
//     <Fragment>
//       <div className="audioPlace">
//         {/* <audio
//           ref={audioRef}
//           // src={
//           //   "https://files.musico.ir/Song/Ehsan%20Daryadel%20-%20Koochamoon%20(320).mp3"
//           // }
//           // src={
//           //   "http://dl.sarimusic.net/1395/08/30/Hayedeh/Hayedeh%20-%20Badeh%20Forush.mp3"
//           // }
//           src={audioOp.download_link}
//           onLoadedMetadata={() => handleLoadedMetadata()}
//         /> */}
//       </div>

//       <div className="test text-white">
//         <Flickity className="carousel col px-2 py-0" options={flickityOptions}>
//           {songs?.map((song) => {
//             return (
//               <div className="carousel-cellRowItem rowItem " key={song.id}>
//                 {/* {isRow && media?.id === songId && (
//           <>
//             <span></span>
//             <span></span>
//             <span></span>
//             <span></span>
//           </>
//         )} */}

//                 <div className="rowItem__image">
//                   <img
//                     src={
//                       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYAHZ0lpBtlP8lXebTIEtnA5-gDxLrPaL-CA&usqp=CAU"
//                     }
//                     alt="logo"
//                   />

//                   {audioOp.loading && song.media?.id === audioOp.songId ? (
//                     <div className="play__music___spinner">
//                       <SpinnerLoading />
//                     </div>
//                   ) : audioOp.playing && song.media?.id === audioOp.songId ? (
//                     <div
//                       className=" play__musisc"
//                       //  onClick={() => playAndPauseMusic()}
//                     >
//                       <Pause />
//                     </div>
//                   ) : (
//                     <div
//                       className=" play__musics"
//                       onClick={() => stopSong() & getUrl(song)}
//                     >
//                       <PlayArrowRounded

//                       // playMusicAndShowMusicBar={playMusicAndShowMusicBar}
//                       />
//                     </div>
//                   )}
//                 </div>

//                 <div className="rowItem__info ">
//                   <Link to={`/song/${song.slug}`} className="visit ">
//                     <h4 className="rowItem__title text-center">
//                       <div className="scroll__rowItem__title">
//                         {truncate(song.media[0]?.name, 4)}
//                       </div>
//                     </h4>
//                   </Link>
//                   <Link
//                     to={`/person/${song.person?.[0]?.slug}`}
//                     className="visit "
//                   >
//                     <h4 className="rowItem__person text-center">
//                       {song.person?.[0]?.name}
//                     </h4>
//                   </Link>
//                 </div>
//               </div>
//             );
//           })}
//         </Flickity>
//       </div>

//       <div className="pal p-5 mx-5 ">
//         <div className="actiooo d-flex justify-content-center">
//           <div className=" next">
//             <SkipPreviousRounded
//               style={{ fontSize: "50px", cursor: "pointer" }}
//             />
//           </div>
//           {!audioOp.playing ? (
//             <div className=" play__music" onClick={() => play()}>
//               <PlayArrowRounded
//                 style={{ fontSize: "50px", cursor: "pointer" }}
//               />
//             </div>
//           ) : (
//             <div className=" play__music" onClick={() => pause()}>
//               <PauseCircleFilledRounded
//                 style={{ fontSize: "50px", cursor: "pointer" }}
//               />
//             </div>
//           )}
//           <div className=" next">
//             <SkipNextOutlined style={{ fontSize: "50px", cursor: "pointer" }} />
//           </div>
//         </div>
//         <Slider
//           variant="determinate"
//           value={audioOp.progress}
//           onChange={(e, newDuration) => handleChange(e, newDuration)}
//         />
//       </div>
//     </Fragment>
//   );
// };

// export default Test;

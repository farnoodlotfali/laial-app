import React, { useEffect, useState } from 'react';
import ReactHowler from 'react-howler';
import raf from 'raf'; // requestAnimationFrame polyfill
const urls = [
  'https://files.musico.ir/Song/Ehsan%20Daryadel%20-%20Koochamoon%20(320).mp3',
  'http://dl.musicdam.net/Downloads/mp3/Hayedeh%20-%20Badeh%20Foroosh%20128.mp3',
];
// console.log(urls[0]);
const FullControl = () => {
  let player = null;
  let _raf = null;
  const [state, setState] = useState({
    id: 0,
    playing: false,
    loaded: false,
    loop: false,
    mute: false,
    volume: 1.0,
    seek: 0.0,
    isSeeking: false,
  });

  //   this.handleToggle = this.handleToggle.bind(this);
  //   this.handleOnLoad = this.handleOnLoad.bind(this);
  //   this.handleOnEnd = this.handleOnEnd.bind(this);
  //   this.handleOnPlay = this.handleOnPlay.bind(this);
  //   this.handleStop = this.handleStop.bind(this);
  //   this.renderSeekPos = this.renderSeekPos.bind(this);
  //   this.handleLoopToggle = this.handleLoopToggle.bind(this);
  //   this.handleMuteToggle = this.handleMuteToggle.bind(this);
  //   this.handleMouseDownSeek = this.handleMouseDownSeek.bind(this);
  //   this.handleMouseUpSeek = this.handleMouseUpSeek.bind(this);
  //   this.handleSeekingChange = this.handleSeekingChange.bind(this);
  //   this.next = this.next.bind(this);

  //   useEffect(() => {
  //     clearRAF();
  //   }, []);
  const handleToggle = () => {
    setState({
      playing: !state.playing,
    });
  };
  const handleToggleStop = () => {
    setState({
      playing: false,
    });
  };

  const handleOnLoad = () => {
    setState({
      loaded: true,
      duration: player.duration(),
    });
  };

  const handleOnPlay = () => {
    setState({
      playing: true,
    });
    renderSeekPos();
  };

  const handleOnEnd = () => {
    setState({
      playing: false,
    });
    clearRAF();
  };

  const handleStop = () => {
    player.stop();
    setState({
      playing: false, // Need to update our local state so we don't immediately invoke autoplay
    });
    renderSeekPos();
  };

  const handleLoopToggle = () => {
    setState({
      loop: !state.loop,
    });
  };

  const handleMuteToggle = () => {
    setState({
      mute: !state.mute,
    });
  };

  const handleMouseDownSeek = () => {
    setState({
      isSeeking: true,
    });
  };

  const handleMouseUpSeek = (e) => {
    setState({
      isSeeking: false,
    });

    player.seek(e.target.value);
  };

  const handleSeekingChange = (e) => {
    setState({
      seek: parseFloat(e.target.value),
    });
  };

  const renderSeekPos = () => {
    if (!state.isSeeking) {
      setState({
        seek: player.seek(),
      });
    }
    if (state.playing) {
      _raf = raf(renderSeekPos);
    }
  };

  const clearRAF = () => {
    raf.cancel(_raf);
  };
  const next = () => {
    setState({
      playing: false,
      id: state.id === 0 ? 1 : 0,
      playing: true,
    });
  };

  return (
    <div className='full-control'>
      <ReactHowler
        src={[urls[state.id]]}
        playing={state.playing}
        onLoad={handleOnLoad}
        onPlay={handleOnPlay}
        onEnd={handleOnEnd}
        loop={state.loop}
        mute={state.mute}
        volume={state.volume}
        ref={(ref) => (player = ref)}
      />

      <p>{state.loaded ? 'Loaded' : 'Loading'}</p>

      <div className='toggles'>
        <label>
          Loop:
          <input
            type='checkbox'
            checked={state.loop}
            onChange={handleLoopToggle}
          />
        </label>
        <label>
          Mute:
          <input
            type='checkbox'
            checked={state.mute}
            onChange={handleMuteToggle}
          />
        </label>
      </div>

      <p>
        {'Status: '}
        {state.seek}
        {' / '}
        {state.duration ? state.duration : 'NaN'}
      </p>

      <div className='volume'>
        <label>
          Volume:
          <span className='slider-container'>
            <input
              type='range'
              min='0'
              max='1'
              step='.05'
              value={state.volume}
              onChange={(e) => setState({ volume: parseFloat(e.target.value) })}
            />
          </span>
          {state.volume}
        </label>
      </div>

      <div className='seek'>
        <label>
          Seek:
          <span className='slider-container'>
            <input
              type='range'
              min='0'
              max={state.duration ? state.duration : 0}
              step='.01'
              value={state.seek}
              onChange={handleSeekingChange}
              onMouseDown={handleMouseDownSeek}
              onMouseUp={handleMouseUpSeek}
            />
          </span>
        </label>
      </div>

      <button onClick={handleToggle}>{state.playing ? 'Pause' : 'Play'}</button>
      <button onClick={handleStop}>Stop</button>
      <button onClick={next}>next</button>
    </div>
  );
};

export default FullControl;

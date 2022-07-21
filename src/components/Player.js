
import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {FaVolumeUp, FaVolumeOff, FaVolumeDown, FaPlay} from "react-icons/fa";
import {ImPlay3} from "react-icons/im";
import {IoMdPause} from "react-icons/io";

import { IconContext } from "react-icons";
import styled from "styled-components";

import WaveSurfer from "wavesurfer.js";
import {playerPlay, playerVolume, playerTime} from "../redux/modules/playerSlice";


function Player() {
  const dispatch = useDispatch();

  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);

  const formWaveSurferOptions = ref => ({
    container: ref,
    waveColor: "lightgrey",
    progressColor: "#8A51FB",
    cursorColor: "#8A51FB",
    barWidth: 2,
    barRadius: 0,
    responsive: true,
    height: 35,
    //normalize by the maximum peak instead of 1.0
    normalize: true,
    //improve rendering speed of large waveforms
    partialRender: true
  });

  const [display, setDisplay] = useState(false);
  const [song, setSong] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [currentTime, setCurrentTime] = useState(0);
  
  const detail = useSelector((state)=> state.Song.detail);

  const playerInfo = useSelector((state)=> state.Player.player);
  const [_display, _song, _playing, _volume, _time] = useSelector((state) => [
    state.Player.player?.display,
    state.Player.player?.currentSong,
    state.Player.player?.isPlaying,
    state.Player.player?.volume,
    state.Player.player?.currentTime,
  ])
    
  useEffect(()=>{
    setDisplay(_display);    
    setSong(_song);
    setPlaying(_playing);
    setVolume(_volume);
  },[playerInfo])

  

  useEffect(()=>{
    if (_song) {
    const options = formWaveSurferOptions(waveformRef.current);
      wavesurfer.current = WaveSurfer.create(options);
      wavesurfer.current.load(_song);

      wavesurfer.current.on("ready", function(){
      wavesurfer.current.setVolume(volume);
      setVolume(volume);
      })

      wavesurfer.current.on("finish", function() {
        console.log("finished playing!")
      })
  
      return() => wavesurfer.current.destroy();
    }

  },[_song])

  useEffect(()=>{
    wavesurfer.current?.playPause();
  },[playing])

  useEffect(()=>{
    setCurrentTime(_time);
    if (_time>0) {
      wavesurfer.current?.play(_time)
    }
  },[_time])

  const handlePlayPause = () => {
    dispatch(playerPlay(playing));
  };

  const onPlayTimeChange = () =>{
    setTimeout(()=> {
    let _currentTime = wavesurfer.current.getCurrentTime();
    setCurrentTime(_currentTime);
    console.log(_currentTime);
    dispatch(playerTime(_currentTime));
    },300);
  }

  const onvolumechange = e =>{
    const {target} = e;
    const newVolume = +target.value;

    if (newVolume) {
      setVolume(newVolume);
      dispatch(playerVolume(newVolume))
      wavesurfer.current.setVolume(newVolume || 1);
    }
  }


  return (
    <PlayerContainer display={display}>
      <div className="player-flex-wrap">
        <div className="player-play">
          <button 
          className="sidemg sm-play-button"
          onClick={handlePlayPause}>
          <IconContext.Provider value={{ className: "sm-play-icon" }}>
          {!playing ? <ImPlay3 id="play-btn" /> : <IoMdPause/> }
          </IconContext.Provider>  
        </button>
        <div className="player-block-waveform">
          <div 
          id="waveform" 
          ref={waveformRef}
          onClick={onPlayTimeChange}
          />      
        </div>
        <Controls className="controls" color={"#8A51FB"}>
          {volume > 0.01 && volume < 0.5 ? <FaVolumeDown id="volume-icon"/> 
          : volume > 0.5? <FaVolumeUp id="volume-icon"/>
          : <FaVolumeOff id="volume-icon"/>}
          <input
            className="volume-control"
            type="range"
            id="volume"
            name="volume"
            // volume 0 = 1
            min="0.01"
            max="1"
            step="0.025"
            onChange={onvolumechange}
            defaultValue={volume}
            value={volume}
          />       
        </Controls>
      </div>
      {detail?
      (
      <div className="player-block-songinfo">
        <img 
        className="player-songinfo-img"
        src={detail.albumImageUrl}
        alt={detail.musicTitle}
        />
        <div className="player-songinfo-text">
          <p className="player-title">{detail.title}</p>
          <p className="player-artist">{detail.artist}</p>
        </div>
      </div>
      )
      : null}
      </div>
    </PlayerContainer>
  )
}

export default Player;


const PlayerContainer = styled.div`
  width: 100%;
  height: 70px;
  position: fixed;
  bottom: 0;
  /* background: linear-gradient(280deg, #f0f0f0, var(--secondary-color)); */
  background: linear-gradient(var(--secondary-color), 10%, #fff );
  z-index:999;
  display: ${(props) => props.display ? 'block' : 'none'};
`


let Controls = styled.div`
display: flex;
align-items: center;
margin-left:10px;

#volume-icon {
  color:  ${(props) => props.color};
}

input[type=range] {
  width:100px;
  -webkit-appearance: none;
  margin-left:10px;
}

input[type=range]:focus {
  outline: none;
}
/*webkit (Chrome)의 경우*/
input[type=range]::-webkit-slider-runnable-track {
  width: 100px;
  height: 10px;
  border-radius: 10px;
  cursor: pointer;
  animate: 0.2s;
  background: ${(props) => props.color};
}
input[type=range]::-webkit-slider-thumb {
  border: 1px solid ${(props) => props.color};
  border-radius: 20px;
  height: 20px;
  width: 20px;
  background: #ffffff;
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -5px; 
}


`
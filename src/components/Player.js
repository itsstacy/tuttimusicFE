
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
    waveColor: "grey",
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
  console.log(_display, _song, _playing, _volume);
    
  useEffect(()=>{
    setDisplay(_display);    
    setSong(_song);
    setPlaying(_playing);
    setVolume(_volume);
  },[playerInfo])

  useEffect(()=>{
    wavesurfer.current?.playPause();
  },[playing])

  useEffect(()=>{
    setCurrentTime(_time&&_time);
    if (currentTime) {
      wavesurfer.current?.play(currentTime)
    }
  },[_time])

  useEffect(()=>{
    if (_song) {
    const options = formWaveSurferOptions(waveformRef.current);
      wavesurfer.current = WaveSurfer.create(options);
      console.log(_song)
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

  const onPlayTimeChange = () =>{
    setTimeout(()=> {
    let _currentTime = wavesurfer.current.getCurrentTime();
    setCurrentTime(_currentTime);
    dispatch(playerTime(_currentTime));
    },300);
  }


  const handlePlayPause = () => {
    dispatch(playerPlay(playing));
  };

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
          <p className="player-title">{detail.musicTitle}</p>
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
  height: 80px;
  position: fixed;
  bottom: 0;
  background-color: var(--secondary-color);
  z-index:999;
  display: ${(props) => props.display ? 'block' : 'none'};
`
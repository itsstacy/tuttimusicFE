
import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import {ImPlay3} from "react-icons/im";
import {IoMdPause} from "react-icons/io";
import {FaVolumeUp, FaVolumeOff, FaVolumeDown} from "react-icons/fa";
import BeatLoader from "react-spinners/BeatLoader";

const formWaveSurferOptions = ref => ({
  container: ref,
  waveColor:"grey",
  progressColor: "orange",
  cursorColor: "orange",
  barWidth:3,
  barRadius: 2,
  responsive: true,
  height:120,
  //normalize by the maximum peak instead of 1.0
  normalize: true,
  //improve rendering speed of large waveforms
  partialRender: true
});

function Waveform(props) {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const [playing, setPlay] = useState(false);
  const [volume, setVolume] = useState(0.5);
  console.log(props.songUrl);

  // create new WaveSurfer
  // https://wavesurfer-js.org/docs/methods.html
  useEffect(()=>{
    setPlay(false);

    const options = formWaveSurferOptions(waveformRef.current);
    console.log(waveformRef.current);
    wavesurfer.current = WaveSurfer.create(options);

    wavesurfer.current.load(props.songUrl);

    wavesurfer.current.on("ready", function(){
      if (wavesurfer.current) {
        wavesurfer.current.setVolume(volume);
        setVolume(volume);
      }
    })
    wavesurfer.current.on("finish", function() {
      console.log("finished playing!")
    })

    return() => wavesurfer.current.destroy();

}, [props.songUrl]);

  const handlePlayPause = () => {
    setPlay(!playing);
    wavesurfer.current.playPause();
  };

  const onvolumechange = e =>{
    const {target} = e;
    const newVolume = +target.value;

    if (newVolume) {
      setVolume(newVolume);
      wavesurfer.current.setVolume(newVolume || 1);
    }
  }

  return (
    <>
      {props.loading ? (
      <div className="spinner-wrap">
        <BeatLoader color={"grey"} loading={props.loading} size={10}/>
      </div>
    ):(
    <>
      <div className="detail-info-wrap mgtop50">
        <div className="flex-wrap between">          
          <div className="flex-wrap">
            <button 
              className="play-button btn"
              onClick={handlePlayPause}>
              {!playing ? <ImPlay3/> : <IoMdPause/> }
            </button>
          </div>
          <div className="flex-wrap">
            <div className="controls">
              {volume > 0.01 && volume < 0.5 ? <FaVolumeDown/> 
              : volume > 0.5? <FaVolumeUp/>
              : <FaVolumeOff/>}
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
              />            
            </div>
          </div>
        </div> 
        {/* <button className="add-playlist btn">
        <span><BiPlus/></span> 플레이리스트 추가
        </button> */}
      </div>

      <div className="detail-wavefom">

        <div id="waveform" ref={waveformRef}/>
        
      </div>
    </>
    )}
    </>
  )
}

export default Waveform;

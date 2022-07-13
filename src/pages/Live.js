import React, { useEffect, useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import BeatLoader from "react-spinners/BeatLoader";

import Streamer from '../elements/Streamer';
import Subscribers from '../elements/Subscribers';
import Chatbox from "../elements/Chatbox";


// FACECHAT




// TEXTCHAT


function Live() {
  const navigate = useNavigate();
  let params = useParams();
  
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  const useName = localStorage.getItem("useName");
  const token = localStorage.getItem("token");

  useEffect(()=>{
    console.log(token)
    setLoading(true);

    // axios
    // .get("https://seyeolpersonnal.shop/", {
    //   headers: {Authorization:token? token:""}
    // })
    // .then((response)=>{
    //   setData(response.data.data)
    
    //   console.log(response.data.data.userInfoDto)
      
    // })
    // .catch((error)=>{
    //   console.log(error)
    // })

    setTimeout(()=> {
      setLoading(false);
    },300)
    window.scrollTo(0,0);


  },[])


  return (
    <div className="live-wrap">
      <div className="live-box">
      <div className="live-box-left">
        <div className="live-view">
          <Streamer session="session1" streamer="streamer1"/>
          <Subscribers session="session1" subscriber="username"/>
        </div>
        <div className="live-info">
        <div id="live-info-image"></div>
          <div className="live-info-user">
            <div id="live-info-user-name">닉네임</div>
            <div id="live-info-user-live">LIVE</div>
          </div>
          <div className="live-info-title">
            <div id="live-info-title-main">차차의 라이브</div>
            <div id="live-info-title-sub">안녕하세요 귀여운 차차입니다ㅎㅎ</div>
          </div>
        </div>
        </div>

        <div className="live-box-right">

        <div className="live-chat">
          <Chatbox streamer="streamer1"/>
          <div id="live-chat-title">실시간 채팅</div>
          <div className="live-chat-list">
            <div className="live-chat-list-box">
              
              <div id="live-chat-user-image" className="live-chat-user-image-other"></div>
              <div className="live-chat-list-info-wrap">
                <div className="live-chat-list-info">
                  <div id="live-chat-list-name">닉네임</div>
                  <div id="live-chat-list-time">2시간 전</div>
                </div>
                <div id="live-chat-list-text">채팅 내용이 들어갑니다.</div>
              </div>
            </div>
            <div className="live-chat-box">
            <input type="text" id="live-chat-user-input" placeholder="채팅을 입력해 주세요."></input>
            <button id="live-chat-user-button">등록</button>
          </div>
          </div>
        </div>
        </div>
      </div>


    </div>
  )
}


export default Live;
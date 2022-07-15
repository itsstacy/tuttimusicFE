import React, { useEffect, useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import BeatLoader from "react-spinners/BeatLoader";

import Streamer from '../elements/Streamer';
import Subscribers from '../elements/Subscribers';
import Chatbox from "../elements/Chatbox";


function Live() {
  const navigate = useNavigate();

  //PARAMS=STREAMER'S NAME
  let params = useParams();
  console.log(params);
  
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  const userProfileUrl = localStorage.getItem("userProfileUrl");
  const userName = localStorage.getItem("userName");
  const token = localStorage.getItem("token");

  useEffect(()=>{
    console.log(token);
    setLoading(true);

    axios
    .get(`https://seyeolpersonnal.shop/chatRoom/${params.artist}`, {
      headers: {Authorization:token? token:""}
    })
    .then((response)=>{
      console.log(response.data.liveRoomListDto);
      setData(response.data.liveRoomListDto);      
    })
    .catch((error)=>{
      console.log(error)
    })

    setTimeout(()=> {
      setLoading(false);
    },300)
    window.scrollTo(0,0);

  },[])

  console.log(data)

  return (
  <div className="live-wrap">  
  {loading? (
      <div className="spinner-wrap">
        <BeatLoader color={"grey"} loading={loading} size={10}/>
      </div>
    ):(
      <div className="live-box">
      <div className="live-box-left">
        <div className="live-view">
          {data.artist===userName?
          <Streamer session={`session${data.id}`} streamer={data.artist}/>
          :
          <Subscribers session={`session${data.id}`} subscriber={userName}/>
          }         
          
        </div>
        <div className="live-info">
        <img 
        id="live-info-image"
        src={data.profileImageUrl}
        alt={data.artist}
        />
          <div className="live-info-user">
            <div id="live-info-user-name">{data.artist}</div>
            <div id="live-info-user-live">LIVE</div>
          </div>
          <div className="live-info-title">
            <div id="live-info-title-main">{data.roomTitle}</div>
            <div id="live-info-title-sub">{data.description}</div>
          </div>
        </div>
        </div>
        <div className="live-box-right">
        <div className="live-chat">
            <Chatbox streamer={data.artist} session={`session${data.id}`} subscriber={userName} userProfileUrl={userProfileUrl} />
            {/* <div className="live-chat-list-box"> */}
              

            {/* </div> */}
         </div>   
      </div>

      </div>
    )}    
    
      
    </div>
  )
}


export default Live;
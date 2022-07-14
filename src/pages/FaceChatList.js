import axios from 'axios';
import React, {useEffect, useState} from 'react';

import {SERVER_URL} from "../redux/modules/songSlice";
import BeatLoader from "react-spinners/BeatLoader";
import { useNavigate } from "react-router-dom";


function FaceChatList() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const liveList = ['live1', 'live2', 'live3', 'live4', 'live5', 'live6', 'live7'];
    const token = localStorage.getItem("token");
    const [roomList, setRoomList] = useState(null);

    useEffect(()=>{
    setLoading(true);

    axios
    .get(`${SERVER_URL}/chatRoom`, {
    headers: {Authorization: token ? token : ""}
    })
    .then((response) => {
    console.log(response.data.results);
    setRoomList(response.data.results);
    window.scrollTo(0, 0);
    })
    .catch((error) => {
    console.log(error);
    });

    setTimeout(()=> {
        setLoading(false);
    },300)
    window.scrollTo(0,0);

    },[])


    const enterRoom=(params)=>{
        navigate(`/live/`+params)
    }

    return(
        <div>
            <div className="facechat-list">
                <div className='facechat-header'>
                    <div className="facechat-list-title">
                        라이브 중인 채널
                    </div>
                    <button className='facechat-button btn'>라이브 시작하기</button>   
                </div>
                
                {loading? (
                <div className="spinner-wrap">
                    <BeatLoader color={"grey"} loading={loading} size={10}/>
                </div>
                ):(
                <div className="facechat-list-container">
                    <div className="facechat-live-list">
                    {
                    roomList.map((live, index) => {
                        return (
                            <div 
                            className="facechat-live-box"
                            onClick={()=>{
                                enterRoom(live.artist)
                            }}
                            >
                                <div className="main-thumbnail">
                                    <img 
                                    className='main-thumbnail'
                                    src={live.thumbnailImageUrl} 
                                    alt={live.roomTitle}
                                    />
                                </div>
                                <div className="facechat-live-info">
                                    <div className="facechat-live-pofileimg">
                                        <img 
                                        className='facechat-live-pofileimg'
                                        src={live.profileImageUrl} 
                                        alt={live.artist}
                                        />
                                    </div>
                                    <div className="facechat-info-box">
                                        <p className="facechat-info-title">{live.roomTitle}</p>
                                        <p className="facechat-info-artist">{live.artist}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                    }
                    </div>
                </div>   
                )}            
            </div>
        </div>
    )
}

export default FaceChatList;

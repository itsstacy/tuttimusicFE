import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import '../styles/App.css';
import { useNavigate, useParams } from "react-router-dom";

import { FaYoutube } from 'react-icons/fa';
import { RiInstagramFill } from 'react-icons/ri';
import { BsPersonPlus, BsPersonCheck } from 'react-icons/bs';
import axios from 'axios';

import Tab1 from '../elements/Tab1';
import Tab2 from '../elements/Tab2';
import Tab3 from '../elements/Tab3';
import Tab4 from '../elements/Tab4';
import Tab5 from '../elements/Tab5';
import Tab6 from '../elements/Tab6';

import { useDispatch } from "react-redux";
import { followAnArtist } from "../redux/modules/songSlice"
import { style } from 'wavesurfer.js';

function UserPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  

  const [tab, setTab] = useState(0);
  const [data, setData] = useState(null);

  const [likeVideoList, setLikeVideoList] = useState([]);
  const [uploadVideoList, setUploadVideoList] = useState([]);
  const [followingList, setFollowingList] = useState([]);
  const [likeList, setLikeList] = useState([]);
  const [uploadList, setUploadList] = useState([]);
  const [userInfoDto, setUserInfoDto] = useState([]);
  const [isFollow, setIsFollow] = useState(null);
  const [count, setCount] = useState(null);

  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    setLoading(true);
    axios
    .get("https://seyeolpersonnal.shop/user/profile/"+params.artist, {
      headers: {Authorization:token? token:""}
    })
    .then((response)=>{
      console.log(response.data.data);
      setUploadVideoList(response.data.data.uploadVideoList)
      setLikeVideoList(response.data.data.likeVideoList)
      setFollowingList(response.data.data.followingList)
      setUploadList(response.data.data.uploadList)
      setUserInfoDto(response.data.data.userInfoDto)
      setLikeList(response.data.data.likeList)
      setIsFollow(response.data.isFollow)
      console.log(response.data.data.userInfoDto.followerCount)
      setCount(response.data.data.userInfoDto.followerCount)
    })
    .catch((error)=>{
      console.log(error)
    })

    setTimeout(()=> {
      setLoading(false);
    },500)
    window.scrollTo(0,0);
  },[params.artist])

  const FollowThisArtist =()=>{
    const data = {
      token: token,
      artist: userInfoDto.artist,
    }
    dispatch(followAnArtist(data));
    if (isFollow===false) {
      setCount(count+1)
    } else {
      setCount(count-1)
    }
    setIsFollow(!isFollow);

  }

  return (
    // Frame 61 ?????? ??????
    <div className='mypage-container'>

      {/* Frame 59  ???????????? ??????*/}
      <div className='mypage-header'>

        <img 
        className='header-porfile-img' 
        src={userInfoDto.profileImage}
        alt={userInfoDto.artist}/>
        <div className='header-profile-info'>
          <div className='header-artist'>
            <div className='row-wrap'>
            <p className='header-artist-name'>{userInfoDto.artist}
            </p>
            {/* <Button 
            isFollow ={isFollow}
            onClick={()=>{
              FollowThisArtist()
            }}            
            >
            {isFollow===false?
            "Follow"
            : "Following"
            }
            </Button>   */}
            </div>
            <p className='header-artist-info'>{userInfoDto.profileText}</p>  
            {/* <div className='header-sns'>
            <FaYoutube className='sns-icon'/><p>{userInfoDto.youtubeUrl}</p>
            <RiInstagramFill className='sns-icon'/><p>{userInfoDto.instagramUrl}</p>
            </div>   */}
            <div className='header-sns'>
              {userInfoDto.youtubeUrl ? <FaYoutube className='sns-icon' onClick={()=>{window.open(userInfoDto.youtubeUrl)}}/> : null}
              {userInfoDto.instagramUrl ? <RiInstagramFill className='sns-icon' onClick={()=>{window.open(userInfoDto.instagramUrl)}}/> : null}
            </div>
            
          </div>

          <div className='header-follow-container'>
            <div className='header-follow'>
                  <div className='follow-follower'>
                    <p>?????????</p>
                  </div>
                  <div className='follow-follower-count'>
                    <p>{count}</p>
                  </div>
                  <div className='follow-follower'>
                    <p>?????????</p>
                  </div>
                  <div className='follow-follower-count'>
                    <p>{userInfoDto.followingCount}</p>
                  </div>
            </div>

            <button 
            className='primary follow-follower-button'
            isFollow ={isFollow}
            onClick={()=>{
              FollowThisArtist()
            }}            
            >
            {isFollow===false?
            <div className='icon-separate'><BsPersonPlus className='follow-follower-icon'/><p className='follow-follower-button-text'>?????????</p></div>
            : <div className='icon-separate'><BsPersonCheck className='follow-follower-icon'/><p className='follow-follower-button-text'>?????????</p></div>
            }
            </button>
          </div>
        </div>

      </div>

      <div className='mypage-body'>
        <div className='body-bar'>
            <p className='body-bar-menu' onClick={()=>{setTab(0)}}>??????</p>
            <p className='body-bar-menu'  onClick={()=>{setTab(1)}}>????????????</p>
            <p className='body-bar-menu' onClick={()=>{setTab(2)}}>????????????</p>
            <p className='body-bar-menu' onClick={()=>{setTab(3)}}>?????????</p>
            <p className='body-bar-menu' onClick={()=>{setTab(4)}}>???????????????</p>
            <p className='body-bar-menu' onClick={()=>{setTab(5)}}>???????????????</p>
            {/* <TabContent tab={tab}/> */}
        </div> 

        <div className='body-contents'>
          {tab ===0?
          (<Tab1 followingList={followingList} likeList={likeList} uploadList={uploadList} likeVideoList={likeVideoList} uploadVideoList={uploadVideoList} />)
          :tab ===1?
          (<Tab2/>)
          :tab ===2?
          (<Tab3/>)
          :tab ===3?
          (<Tab4/>)
          :tab ===4?
          (<Tab5/>)
          :tab ===5?
          (<Tab6/>)
          : null
          }
        </div>
      </div>
    </div>
  )
}

export default UserPage;

const Button = styled.div`
  border: 1px solid black;
  display: inline;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  margin-left: 30px;
  
`
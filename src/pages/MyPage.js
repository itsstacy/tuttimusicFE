import React, {useEffect, useState} from 'react';
import '../styles/App.css';


import { FaYoutube } from 'react-icons/fa';
import { RiInstagramFill } from 'react-icons/ri';
import { FiSettings } from 'react-icons/fi';
import axios from 'axios';

import Tab1 from '../elements/Tab1';
import Tab2 from '../elements/Tab2';
import Tab3 from '../elements/Tab3';
import Tab4 from '../elements/Tab4';
import Tab5 from '../elements/Tab5';
import Tab6 from '../elements/Tab6';

import BeatLoader from "react-spinners/BeatLoader";
import { useNavigate } from 'react-router-dom';


function MyPage() {

  const navigate = useNavigate();

  const [tab, setTab] = useState(0);

  const [data, setData] = useState(null);

  const [followingList, setFollowingList] = useState([]);
  const [likeList, setLikeList] = useState([]);
  const [likeVideoList, setLikeVideoList] = useState([]);
  const [uploadList, setUploadList] = useState([]);
  const [uploadVideoList, setUploadVideoList] = useState([]);
  const [userInfoDto, setUserInfoDto] = useState([]);


  console.log(userInfoDto);


  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    console.log(token)

    setLoading(true);
    
    axios
    .get("https://seyeolpersonnal.shop/user/mypage", {
      headers: {Authorization:token? token:""}
    })
    .then((response)=>{
      setData(response.data.data)
      setFollowingList(response.data.data.followingList)
      setUploadList(response.data.data.uploadList)
      setUploadVideoList(response.data.data.uploadVideoList)
      setUserInfoDto(response.data.data.userInfoDto)
      setLikeList(response.data.data.likeList)
      setLikeVideoList(response.data.data.likeVideoList)

      console.log(response.data.data.userInfoDto)
      
    })
    .catch((error)=>{
      console.log(error)
    })

    console.log(1)
    setTimeout(()=> {
      setLoading(false);
    },300)
    window.scrollTo(0,0);
  },[])

  console.log(data)
  

  return (


    // Frame 61 전체 영역
    <div className='mypage-container'>

      {/* Frame 59  회원정보 부분*/}
      <div className='mypage-header'>

        <img 
        className='header-porfile-img' 
        src={userInfoDto.profileImage}
        alt={userInfoDto.artist}/>

        <div className='header-profile-info'>
          <div className='header-artist'>
            <p className='header-artist-name'>{userInfoDto.artist}</p>
            <p className='header-artist-info'>{userInfoDto.profileText}</p>  

            <div className='header-sns'>
              {userInfoDto.youtubeUrl ? <FaYoutube className='sns-icon sns-youtube' onClick={()=>{window.open(userInfoDto.youtubeUrl)}}/> : null}
              {userInfoDto.instagramUrl ? <RiInstagramFill className='sns-icon sns-instagram' onClick={()=>{window.open(userInfoDto.instagramUrl)}}/> : null}
            </div>
          </div>

          <div className='header-follow-container'>
            <div className='header-follow'>
                <div className='follow-follower'>
                  <p>팔로워</p>
                </div>
                <div className='follow-follower-count'>
                  <p>{userInfoDto.followerCount}</p>
                </div>
                <div className='follow-follower'>
                  <p>팔로잉</p>
                </div>
                <div className='follow-follower-count'>
                  <p>{userInfoDto.followingCount}</p>
                </div>
            </div>

             {/* navigate 함수로 myedit 페이지로 갈 때, userInfoDto에 담아져있는 데이터를 state로 가져감 */}
            <button className='primary follow-follower-button' onClick={()=>{navigate('/myedit', {state : userInfoDto})}}>
              <FiSettings className='follow-follower-icon'/><p className='follow-follower-button-text'>프로필 설정</p>
            </button>

          </div>
          
        </div>

      </div>
      
      <div className='mypage-body'>
        <div className='body-bar'>
            <p className='body-bar-menu' onClick={()=>{setTab(0)}}>전체</p>
            <p className='body-bar-menu'  onClick={()=>{setTab(1)}}>관심음악</p>
            <p className='body-bar-menu' onClick={()=>{setTab(2)}}>관심영상</p>
            <p className='body-bar-menu' onClick={()=>{setTab(3)}}>팔로잉</p>
            <p className='body-bar-menu' onClick={()=>{setTab(4)}}>업로드음악</p>
            <p className='body-bar-menu' onClick={()=>{setTab(5)}}>업로드영상</p>
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


// function TabContent({tab}) {
//   if (tab == 0) {
//     return(
//       <>
//       <LikeList/> 
//       <FollowingList/>
//       <UploadList/>
//       </>
//     )
    
//   } 
//   if (tab == 1) {
//     return <LikeList/> 
//   } 
//   if (tab == 2) {
//     return <FollowingList/>
//   }
//   if (tab == 3) {
//     return <UploadList/>
//   }
// }



export default MyPage;
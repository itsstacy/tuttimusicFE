import React, {useEffect, useState} from 'react';
import '../styles/App.css';
import LikeList from '../elements/LikeList'
import FollowingList from '../elements/FollowingList';
import UploadList from '../elements/UploadList';

import { FaYoutube } from 'react-icons/fa';
import { RiInstagramFill } from 'react-icons/ri'
import axios from 'axios';

import BeatLoader from "react-spinners/BeatLoader";

function MyPage() {

  const [tab, setTab] = useState(0);

  const [data, setData] = useState(null);

  const [followingList, setFollowingList] = useState([]);
  const [likeList, setLikeList] = useState([]);
  const [uploadList, setUploadList] = useState([]);
  const [userInfoDto, setUserInfoDto] = useState(null);



  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    console.log(token)

    setLoading(true);
    
    axios
    .get("http://52.79.234.195/user/mypage", {
      headers: {Authorization:token? token:""}
    })
    .then((response)=>{
      setData(response.data.data)
      setFollowingList(response.data.data.followingList)
      setUploadList(response.data.data.uploadList)
      setUserInfoDto(response.data.data.userinfo)
      setLikeList(response.data.data.likeList)
    })
    .catch((error)=>{
      console.log(error)
    })

    console.log(1)
    setTimeout(()=> {
      setLoading(false);
    },500)
    window.scrollTo(0,0);
  },[])

  console.log(loading)


  return (

    

    // Frame 61 전체 영역
    <div className='mypage-container'>

      {/* Frame 59  회원정보 부분*/}
      <div className='mypage-header'>

        <div className='header-porfile-img'/>

        <div className='header-profile-info'>
          <div className='header-artist'>
            <p className='header-artist-name'>닉네임</p>
            <p className='header-artist-info'>자신을 소개하는 내용이 들어갑니다.</p>  
            <div className='header-sns'>
            <FaYoutube className='sns-icon'/><p>유튜브</p>
            <RiInstagramFill className='sns-icon'/><p>인스타</p>
            </div>  
          </div>
          <div className='header-follow'>
                <div className='follow-follower'>
                  <p>팔로워</p>
                </div>
                <div className='follow-follower-count'>
                  <p>33</p>
                </div>
                <div className='follow-follower'>
                  <p>팔로잉</p>
                </div>
                <div className='follow-follower-count'>
                  <p>20</p>
                </div>
          </div>
        </div>

      </div>
      
      {/* Frame 60 */}
      <div className='mypage-body'>

        {/* Fram 54 */}
        <div className='body-bar'>
            <p className='body-bar-menu' onClick={()=>{setTab(0)}}>전체</p>
            <p className='body-bar-menu'  onClick={()=>{setTab(1)}}>관심 음악</p>
            <p className='body-bar-menu' onClick={()=>{setTab(2)}}>팔로잉</p>
            <p className='body-bar-menu' onClick={()=>{setTab(3)}}>업로드 음악</p>
            {/* <TabContent tab={tab}/> */}
        </div> 

        {/* Frame 52 곡 정보 부부 map으로 작업 */}
        <div className='body-contents'>

          
          <div className='body-like'>
            <p className='body-font'>관심 음악</p>

              {/* 로딩 중 스피너 나오는 부분 */}
              {loading? (
              <div className="spinner-wrap">
                <BeatLoader color={"grey"} loading={loading} size={10}/>
              </div>
                ):(
              <div className='body-like-list'>
                    {
                      //앞에 LikeList는 가져오는 컴포넌트, 두번째 likeList는 변수명 {}=> 내려줄 값, state값(props값)
                    <LikeList likeList={likeList}/>
                    } 
                    
              </div>     
              )}  
          </div>
      

          
          <div className='body-following'>
            <p className='body-font'>팔로잉</p>
              {loading? (
              <div className="spinner-wrap">
                <BeatLoader color={"grey"} loading={loading} size={10}/>
              </div>
            ):(
                <div className='body-like-list'>
                <FollowingList followingList={followingList}/>
                </div>
                )}
            
          </div>
          

          
          <div className='body-like'>
            <p className='body-font'>업로드한 음악</p>
              {loading? (
              <div className="spinner-wrap">
                <BeatLoader color={"grey"} loading={loading} size={10}/>
              </div>
            ):(
                <div className='body-like-list'>
                      <UploadList uploadList={uploadList}/>
                    </div>
                )}
            
          </div>


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
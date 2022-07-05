import React, {useEffect, useState} from 'react';
import '../styles/App.css';

import { FaYoutube } from 'react-icons/fa';
import { RiInstagramFill } from 'react-icons/ri'
import axios from 'axios';

import BeatLoader from "react-spinners/BeatLoader";

function MyPage() {

  // let [tab, setTab] = useState(0);
  const [data, setData] = useState(null);

  const [followingList, setFollowingList] = useState(null);
  const [likeList, setLikeList] = useState(null);
  const [uploadList, setUploadList] = useState(null);
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
            <FaYoutube className='sns-icon'/><p>youtube_id</p>
            <RiInstagramFill className='sns-icon'/><p>instagram_id</p>
            </div>  
          </div>
          <div className='header-follow'>
                <div className='follow-follower'>
                  <p>팔로워</p>
                </div>
                <div className='follow-follower-count'>
                  <p>33</p>
                </div>
                  <p>|</p>
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
            <p className='body-bar-menu'>전체</p>
            <p className='body-bar-menu'>관심 음악</p>
            <p className='body-bar-menu'>팔로잉</p>
            <p className='body-bar-menu'>업로드 음악</p>
            
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
                    {/* <div className='body-card'>
                      <img src="https://music-phinf.pstatic.net/20210825_63/1629883297884wU7In_PNG/VIBE_%BF%A9%B8%A7_%BB%C7%BC%DB%BB%C7%BC%DB%C0%BD%BE%C7%C1%A6%BD%C0%B1%E2.png" className='body-card-img'/>
                      <p className='body-title'>Title</p>
                      <p className='body-artist'>Artist</p>
                    </div> */}
                    {
                    likeList&&likeList.map((song, Index)=>{
                      return(
                        <div className='body-card'>
                          <img src={song.albumImageUrl} className='body-card-img'/>
                          <p className='body-title'>{song.title}</p>
                          <p className='body-artist'>{song.artist}</p>
                        </div>
                      )
                    })
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
                // <div className='body-like-list'>
                //       <div className='body-following-card'>
                //         <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKJd5EPOWibW59EuALDpuzpnCRLhHfDp0udw&usqp=CAU" className='body-circle'/>
                //         <p className='body-title'>Artist</p>            
                //       </div>
                //   </div>
                <div className='body-like-list'>
                {
                  followingList.map((song, index)=>{
                    return(
                            <div className='body-following-card'>
                              <img src={song.profileImage} className='body-circle'/>
                              <p className='body-title'>{song.artist}</p>            
                            </div>
                    )
                  })
                } 
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
                      {/* <div className='body-card'>
                        <img src="https://music-phinf.pstatic.net/20210825_63/1629883297884wU7In_PNG/VIBE_%BF%A9%B8%A7_%BB%C7%BC%DB%BB%C7%BC%DB%C0%BD%BE%C7%C1%A6%BD%C0%B1%E2.png" className='body-card-img'/>
                        <p className='body-title'>Title</p>
                        <p className='body-artist'>Artist</p>
                      </div> */}
                      {
                        uploadList.map((song, index)=>{
                          return(
                            <div className='body-card'>
                              <img src={song.albumImageUrl} className='body-card-img'/>
                              <p className='body-title'>{song.title}</p>
                              <p className='body-artist'>{song.artist}</p>
                            </div> 
                          )
                        })
                      }
                    </div>
                )}
            
          </div>


        </div>
      </div>
    </div>
  )
}

export default MyPage;
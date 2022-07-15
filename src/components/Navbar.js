import React, {useState} from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import {useDispatch } from "react-redux";

import { BiSearchAlt2 } from "react-icons/bi"
import { FaCaretDown } from "react-icons/fa"
import {searchMusic} from "../redux/modules/songSlice";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("token");

  console.log("토큰 ==>", token)

  const [toggleState, setToggleState] = React.useState(false);

  const userProfileUrl = localStorage.getItem("userProfileUrl");
  const userName = localStorage.getItem("userName");

  const ClickLogout = () => {
    setToggleState(false);
    localStorage.clear();
    navigate("/");
  }

  const ClickMyPage = () => {
    setToggleState(false);
    navigate("/mypage");
  }

  //search 
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState();



React.useEffect(()=>{
  if (!token) {
    if (location.pathname === "/upload") {
      window.alert("로그인이 필요합니다.")
      navigate(-1);
    }
  }

},[])


  return (
    <>
    <NavBar>
      <div className="nav-wrap">
        <div 
          className="logo"
          onClick={()=>{
            navigate('/')
        }}>
          tutti
        </div>
        <div className="nav">
          <ul>
            <li onClick={()=>{
              navigate('/')
            }}>
              Home
            </li>
            <li onClick={()=>{
              navigate('/musicfeed')
            }}>
              Feed
            </li>
            <li onClick={()=>{
              navigate('/facechatlist')
            }}>
              LIVE
            </li>
          </ul>
        </div>
        <div className="search">
          <input 
          type="text" 
          placeholder="곡명, 아티스트를 검색하세요." 
          onChange={(e)=>{
            setSearchValue(e.target.value)
          }}></input>
          <BiSearchAlt2 
          id="search-icon"
          onClick={()=>{
            dispatch(searchMusic(searchValue))
            navigate('/search', {state: searchValue})
          }}
          />
          
          
        </div>
        <div className="user-box">
        {token ?
              <div className="login-state">
                <div className="user-upload" onClick={() => { navigate('upload') }}> 곡 업로드 </div>
                <UserImage className="user-image" userProfileUrl={userProfileUrl}></UserImage>
                <div className="user-name" onClick={() => { setToggleState(!toggleState) }}>{userName}</div>
                <FaCaretDown id="down-icon" onClick={() => { setToggleState(!toggleState) }}/>
              </div>
              :
              <div className="logout-state">

                <div className="user-login" onClick={() => { navigate('login') }}>로그인</div>
                <div className="user-slash"> / </div>
                <div className="user-signup" onClick={() => { navigate('signup') }}>회원가입</div>

              </div>}
        </div>
      </div>

      </NavBar>

      {toggleState ?
        <div className="toggle-wrap">
          <div className="user-toggle-box">
            <ul className="user-login-toggle">
              <li onClick={ClickMyPage}>마이 페이지</li>
              <li onClick={ClickLogout}>로그아웃</li>
            </ul>
          </div>
        </div>
        :
        null}

    </>

  )

}

let NavBar = styled.div`
display:flex;
justify-content: center;
width:100%;
height: 80px;
background-color:#1A1B1E;
color: #f0f0f0;

`


let UserImage = styled.div`
  background-image:url(${(props) => props.userProfileUrl});
  background-size:cover;
  background-position: 50% 50%;
`



export default Navbar;
import React, {useState} from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import {useDispatch } from "react-redux";

import { BiSearchAlt2 } from "react-icons/bi"
import { FaCaretDown } from "react-icons/fa"
import {searchMusic} from "../redux/modules/songSlice";

function Navbar() {
  const navigate = useNavigate();

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
              navigate('/live')
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
              <LoginState>
                <div className="user-upload" onClick={() => { navigate('upload') }}> 곡 업로드 </div>
                <UserImage className="user-image" userProfileUrl={userProfileUrl}></UserImage>
                <div className="user-name" onClick={() => { setToggleState(!toggleState) }}>{userName}</div>
                <FaCaretDown id="down-icon" onClick={() => { setToggleState(!toggleState) }}/>
              </LoginState>
              :
              <LogoutState>

                <div className="user-login" onClick={() => { navigate('login') }}>로그인</div>
                <div className="user-slash"> / </div>
                <div className="user-signup" onClick={() => { navigate('signup') }}>회원가입</div>

              </LogoutState>}
        </div>
      </div>

      </NavBar>

      {toggleState ?
        <ToggleWrap>
          <div className="user-toggle-box">
            <ul className="user-login-toggle">
              <li onClick={ClickMyPage}>마이 페이지</li>
              <li onClick={ClickLogout}>로그아웃</li>
            </ul>
          </div>
        </ToggleWrap>
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
background-color:#4E4E4E;
color: #fff;


.nav-wrap {
  display:flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width:1280px;

}

.logo {
  width:120px;
  font-size:30px;
  font-weight: bold;
  cursor: pointer;
}

.nav ul {
  list-style:none;
  margin:0;
  padding:0;
}

.nav ul li {
  width:50px;
  float:left;
  margin-right: 40px;
  cursor: pointer;
}

.search {
  position:relative;
}

.search input {
  width:500px;
  height:40px;
  border-radius:10px;
  border:none;
  padding: 0 50px 0 20px;
  outline:none;
}

#search-icon {
  font-size: 24px;
  position:absolute;
  right:20px;
  top:8px;
  color:#BCBCBC;
  cursor: pointer;
}

.user-box {
  width:390px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}



`

let LoginState = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  div {
    cursor: pointer;
  }

  .user-upload {
    margin-right: 40px;
  }

  .user-image {
  width: 40px;
  height: 40px; 
  background-color:#D9D9D9;
  border-radius:40px;
  margin-right: 12px;
  cursor: pointer;
}

#down-icon {
  font-size:16px;
  margin-left:5px;
  cursor: pointer;
}

`

let UserImage = styled.div`
  background-image:url(${(props) => props.userProfileUrl});
  background-size:cover;
  background-position: 50% 50%;
`

let ToggleWrap = styled.div`
position: absolute;
width:100%;
display: flex;
justify-content: center;

  .user-toggle-box {
  width:1280px;
  display: flex;
  justify-content: flex-end;
  }

  .user-login-toggle {
    width:140px;
    background-color: #7E7E7E;
    list-style: none;
    padding: 20px;
    margin-top: 10px;
    text-align: center;
    border-radius: 10px;
    color:#fff;
    z-index: 999;
  }

  .user-login-toggle li {
    margin-bottom: 20px;
    cursor: pointer;
  }

  .user-login-toggle li:last-child {
    margin-bottom:0;
  }



`

let LogoutState = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 100px;
  font-size: 16px;

  div {
    cursor: pointer;
  }

  .user-slash {
    margin:0 10px;
  }

  
`


export default Navbar;
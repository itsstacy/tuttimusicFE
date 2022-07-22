import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import { BiSearchAlt2 } from "react-icons/bi";
import { FaCaretDown } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { BsDashLg } from "react-icons/bs";
import { BsXLg } from "react-icons/bs";
import { VscArrowLeft } from "react-icons/vsc";



import { searchMusic } from "../redux/modules/songSlice";

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
    window.location.reload();
  }

  const ClickMyPage = () => {
    setToggleState(false);
    navigate("/mypage");
  }

  //search 
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState();


  //mobile search

  const [searchState, setSearchState] = useState(false);


  return (
    <>
      <NavBar toggle={toggleState} search={searchState}>
        <div className="nav-wrap">
          <div
            className="logo"
            onClick={() => {
              navigate('/')
            }}>
            tutti
          </div>
          <div className="nav">

            <ul>
              <li onClick={() => {
                navigate('/')
              }}>
                Home
              </li>
              <li onClick={() => {
                navigate('/musicfeed')
              }}>
                Feed
              </li>
              <li onClick={() => {
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
              onChange={(e) => {
                setSearchValue(e.target.value)
              }}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  dispatch(searchMusic(searchValue))
                  navigate('/search', { state: searchValue })
                }
              }}
            ></input>
            <BiSearchAlt2
              id="search-icon"
              onClick={() => {
                dispatch(searchMusic(searchValue))
                navigate('/search', { state: searchValue })
              }}
            />


          </div>
          <div className="user-box">
            {token ?
              <div className="login-state">
                <div className="user-upload" onClick={() => { navigate('upload') }}> 곡 업로드 </div>
                <UserImage className="user-image" userProfileUrl={userProfileUrl}></UserImage>
                <div className="user-name" onClick={() => { setToggleState(!toggleState) }}>{userName}</div>
                <FaCaretDown id="down-icon" onClick={() => { setToggleState(!toggleState) }} />
              </div>
              :
              <div className="logout-state">

                <div className="user-login" onClick={() => { navigate('login') }}>로그인</div>
                <div className="user-slash">  </div>
                <div className="user-signup" onClick={() => { navigate('signup') }}>회원가입</div>

              </div>}
          </div>
        </div>
        {/* 모바일 버전 nav */}
        <div className="nav-mobile-wrap">
          <div
            className="logo"
            onClick={() => {
              navigate('/')
            }}>
            tutti
          </div>
          <div className="nav-mobile-right">
            <BiSearchAlt2
              id="search-mobile-icon"
              onClick={() => { setSearchState(true) }}
            />


            <IoMenu
              id="menu-mobile-icon"
              onClick={() => { setToggleState(true) }} />


          </div>

          <div className="nav-mobile-search-wrap">

            <div className="nav-mobile-search">
              <div className="back-mobile-icon"
                onClick={() => { setSearchState(false) }}>
                <VscArrowLeft />
              </div>

              <div className="search">
                <input
                  type="text"
                  placeholder="곡명, 아티스트를 검색하세요."
                  onChange={(e) => {
                    setSearchValue(e.target.value)
                  }}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      dispatch(searchMusic(searchValue))
                      navigate('/search', { state: searchValue })
                    }
                  }}
                ></input>
                <BiSearchAlt2
                  id="search-icon"
                  onClick={() => {
                    dispatch(searchMusic(searchValue))
                    navigate('/search', { state: searchValue })
                    setSearchState(false)
                  }}
                />


              </div>
            </div>
          </div>

          <div className="nav-mobile">
            <div className="nav-mobile-toggle"></div>
            <ul>
              {token ? (
                <>
                  <li>
                    <div className="nav-mobile-user">
                      <UserImage className="user-image" userProfileUrl={userProfileUrl}></UserImage>
                      <div className="user-name">{userName}</div></div>
                    <div className="nav-mobile-close"
                      onClick={() => { setToggleState(false) }}><BsXLg /></div></li>
                  <li>
                    <span
                      onClick={ClickMyPage}>마이 페이지</span></li>
                  <li><span
                    onClick={() => {
                      navigate('upload')
                      setToggleState(false)
                    }}>곡 업로드</span></li>
                  <li><span
                    onClick={ClickLogout}>로그아웃</span></li>
                </>
              ) : (
                <>
                  <li>
                    <div className="nav-mobile-user">
                      <div className="user-image"></div>
                      <div className="user-name">로그인이 필요합니다.</div></div>
                    <div className="nav-mobile-close"
                      onClick={() => { setToggleState(false) }}><BsXLg /></div></li>
                  <li><span
                    onClick={() => {
                      navigate('/login')
                      setToggleState(false)
                    }}>로그인</span></li>
                  <li><span
                    onClick={() => {
                      navigate('/signup')
                      setToggleState(false)
                    }}>회원가입</span></li>
                </>
              )}

              <li id="dash-mobile-icon">
                <BsDashLg />
              </li>

              <li>
                <span
                  onClick={() => {
                    navigate('/')
                    setToggleState(false)
                  }}>
                  Home
                </span>
              </li>
              <li>
                <span
                  onClick={() => {
                    navigate('/musicfeed')
                    setToggleState(false)
                  }}>
                  Feed
                </span>
              </li>
              <li>
                <span
                  onClick={() => {
                    navigate('/facechatlist')
                    setToggleState(false)
                  }}>
                  LIVE
                </span>
              </li>
            </ul>
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

@media only screen and (max-width: 768px) {
  height: 70px;

  .nav-mobile {
    display: ${(props) => (props.toggle ? 'block' : 'none')};
  }

  .nav-mobile-search-wrap {
    display: ${(props) => (props.search ? 'block' : 'none')};
  }
  }

`


let UserImage = styled.div`
  background-image:url(${(props) => props.userProfileUrl});
  background-size:cover;
  background-position: 50% 50%;
`



export default Navbar;
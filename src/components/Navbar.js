import React from "react"
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { BiSearchAlt2 } from "react-icons/bi"
import { FaCaretDown } from "react-icons/fa"

function Navbar() {
  const navigate = useNavigate();
  

  return (
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
              navigate('/facechat')
            }}>
              FaceChat
            </li>
          </ul>
        </div>
        <div className="search">
          <input type="text" placeholder="곡명, 아티스트를 검색하세요." ></input>
          <BiSearchAlt2 id="search-icon"/>
          
          
        </div>
        <div className="user-box">
          <div className="user-image"></div>
          <div className="user-name">닉네임</div>
          <FaCaretDown id="down-icon"/>
        </div>

      </div>

    </NavBar>

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
  justify-content: space-between;
  align-items: center;
  width:1280px;

}

.logo {
  margin-right: 40px;
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
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 100px;
  
}

.user-image {
  width: 40px;
  height: 40px; 
  background-color:#D9D9D9;
  border-radius:50%;
  margin-right: 12px;
  cursor: pointer;
}

#down-icon {
  font-size:16px;
  margin-left:5px;
  cursor: pointer;
}


`


export default Navbar;
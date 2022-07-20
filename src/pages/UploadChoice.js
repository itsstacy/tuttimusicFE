import React from 'react';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";

import { FaMicrophone } from "react-icons/fa";
import { BsFillFileEarmarkPlayFill } from "react-icons/bs";




function UploadChoice() {

  const navigate = useNavigate();

  return (
    <ChoiceWrap>
      <div className="choice-title">업로드</div>
      <div className="choice-title-sub">업로드 유형을 선택해 주세요.</div> 
      <div className="choice-button-wrap">
      <button className="choice-button" onClick={() => { navigate("/upload/audio") }}><FaMicrophone id="choice-icon"/>오디오 업로드</button>
      <button className="choice-button" onClick={() => { navigate("/upload/video") }}><BsFillFileEarmarkPlayFill id="choice-icon"/>비디오 업로드</button>
      </div>
    </ChoiceWrap>
  )
}

let ChoiceWrap = styled.div`
width:1050px;
min-height: 80vh;
margin: 60px auto;
display: flex;
align-items: left;
flex-direction: column;

.choice-title {
  font-size:36px;
  color:#000;
  margin-bottom: 16px;
}

.choice-title-sub {
  font-size:16px;
  color: #7e7e7e;
}

.choice-button-wrap {
  width:100%;
  margin-top:110px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row; 
}

.choice-button {
  width:500px;
  height:230px;
  background-color:#E8E8E8;
  color:#000;
  border:none;
  border-radius:10px;
  font-size:20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

#choice-icon {
  font-size: 24px;
  margin-right: 8px;
}
`

export default UploadChoice;
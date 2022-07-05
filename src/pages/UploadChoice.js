import React from 'react';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";

function UploadChoice() {

  const navigate = useNavigate();

  return (
    <ChoiceWrap>
      <button className="choice-button" onClick={() => { navigate("/upload/audio") }}>음악 파일 업로드</button>
      <button className="choice-button" onClick={() => { navigate("/upload/video") }}>동영상 파일 업로드</button>
    </ChoiceWrap>
  )
}

let ChoiceWrap = styled.div`
width:1280px;
height: 680px;
margin: 0 auto;
display: flex;
justify-content: space-around;
align-items: center;
flex-direction: row;

.choice-button {
  width:200px;
  height:60px;
  background-color:#4E4E4E;
  color:#fff;
  border:none;
  border-radius:10px;
  font-size:16px;
}
`

export default UploadChoice;
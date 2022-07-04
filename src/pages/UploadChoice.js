import React from 'react';
import styled from 'styled-components';

import Upload from './Upload';
import UploadVideo from './UploadVideo';

function UploadChoice() {

  const [choiceState, setChoiceState] = React.useState(true);
  const [showFile, setShowFile] = React.useState(false);
  const [showVideo, setShowVideo] = React.useState(false);


  const ChoiceFile = () => {
    setChoiceState(false);
    setShowFile(true);
  }

  const ChoiceVideo = () => {
    setChoiceState(false);
    setShowVideo(true);
  }
  return (
    <>

      {choiceState ?
        <ChoiceWrap>
          <button className="choice-button" onClick={ChoiceFile}>음악 파일 업로드</button>
          <button className="choice-button" onClick={ChoiceVideo}>동영상 파일 업로드</button>
        </ChoiceWrap>
        :
        null
      }

      {showFile ?
        <Upload />
        :
        null
      }

      {showVideo ?
        <UploadVideo />
        :
        null
      }

    </>
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

export default UploadChoice
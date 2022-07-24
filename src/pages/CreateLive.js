import React, {useRef, useEffect,useState} from 'react';

import styled from 'styled-components';

import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import {SERVER_URL} from "../redux/modules/songSlice";

function CreateLive() {

  const navigate = useNavigate();

  const color_ref = useRef(null);
  const title_ref = useRef(null);
  const description_ref = useRef(null);

  const [previewImg, setPreviewImg] = useState(null);
  const [imgName, setImgName] = useState(null);
  const [imgFile, setImgFlie] = useState(null);

  const onLoadImage = (e) => {
    let render = new FileReader()
    setImgName(e.target.files[0].name);
    setImgFlie(e.target.files[0]);

    if(e.target.files[0]) {
      render.readAsDataURL(e.target.files[0])
    }

    render.onload = () => {
      const previewImgUrl = render.result;

      if(previewImgUrl) {
        setPreviewImg(previewImgUrl);
      }
    }

    
  }

  const [color, setColor] = useState("#545454");
  const [colorState, setColorState] = useState(false);
  const [colorRef, setColorRef] = useState("#545454");

  const ColorChange = () => {
    console.log("colorRef ===>", color_ref.current.value);
    console.log("color ===>", color);
    setColor(color_ref.current.value);
  }

  const [musicName, setMusicName] = useState(null);
  const [musicFile, setMusicFile] = useState(null);
  const onLoadMusic = (e) => {
    
    setMusicName(e.target.files[0].name);
    setMusicFile(e.target.files[0]);

  }


  const startLive = () => {

    if (title_ref.current.value === "") {
      return window.alert("라이브 제목을 채워 주세요.")
    } else if (description_ref.current.value === "") {
      return window.alert ("소개글을 채워 주세요.")
    } 
    
    const token = localStorage.getItem("token");

    const addRoomRequestDto = {
      roomTitle : title_ref.current.value,
      description : description_ref.current.value,
    }
    console.log(imgFile)
    const formData = new FormData();
    formData.append("addRoomRequestDto", new Blob([JSON.stringify(addRoomRequestDto)], {type: "application/json"}))
    formData.append("thumbNailImage", imgFile)
    
    axios.post(`${SERVER_URL}/chatRoom`, formData,{
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: token ? token : ""}
    })
    .then((response) => {
      console.log("res ===> ", response);
      // navigate(`live/${userName}`);
      navigate('/facechatlist');
      window.scrollTo(0, 0);
    })
    .catch((error) => {
      console.log("err ===> ", error);
      navigate('/facechatlist');
    });
  }

  return (
    <CreateLiveWrap>
      <div className="upload-wrap">
      <p className="upload-title">라이브 시작하기</p>
      <p className="upload-subtitle">당신의 음악을 라이브로 들려주세요!</p>
      <div className="upload-form">

        {/***** 곡명 *****/}

        <label className="upload-label">
          <span className="upload-label-span">라이브 제목</span>
          <input type="text" className="upload-input" placeholder="라이브 제목을 입력해 주세요." ref={title_ref}/>
        </label>

        {/***** 소개글 *****/}

        <label className="upload-label">
          <span className="upload-label-span">소개글</span>
          <textarea className="upload-input" placeholder="라이브에 대해 소개해 주세요." ref={description_ref}/>
        </label>


        {/***** 앨범 커버 *****/}

        <div className="upload-image-wrap">

        <label className="upload-label">
          <span className="upload-label-span">썸네일</span>
          </label>
          <div className="upload-image-box">
          <UploadImagePreview previewImg={previewImg}></UploadImagePreview>
          <label className="secondary upload-label-button" for="upload-image">이미지 업로드</label>
          <input type="file" id="upload-image" accept='image/*' onChange={onLoadImage} />
          </div>
          </div>

          <button 
          className="primary upload-button"
          onClick={()=>{
            startLive()
          }}>라이브 시작</button>

      </div>
      </div>

    </CreateLiveWrap>
  )
}



let CreateLiveWrap = styled.div`
display: flex;
justify-content: center;
align-items: center;
margin-bottom: 80px;

`

let UploadImagePreview = styled.div`
  width:480px;
  height:270px;
  background-color:#E8E8E8;
  border-radius: 10px;
  background-image:url(${(props) => props.previewImg});
  background-size:cover;
  background-position: 50% 50%;
  
  @media only screen and (max-width: 480px) {
  width: 60%;
  height: 100%;
  aspect-ratio: 16 / 9;
  }
`

export default CreateLive;
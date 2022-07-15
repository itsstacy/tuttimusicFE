import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import styled from 'styled-components';

import { HexColorPicker } from "react-colorful";

import { FaMusic } from "react-icons/fa"
import axios from 'axios';

import {SERVER_URL} from "../redux/modules/songSlice";


function Edit() {

  const navigate = useNavigate();
  const params = useParams();

  const { state } = useLocation();
  const detail = state;

  React.useEffect(() => {
    setColor(detail.color);
    if (detail.postType === "audio") {
      setType(true);
    } else if (detail.postType === "video") {
      setType(false);
    }
  },[])

  const [type, setType] = useState(true);


  const color_ref = useRef(null);
  const title_ref = useRef(null);
  const description_ref = useRef(null);

  const [selectGenre, setSelectGenre] = React.useState(detail.genre);

  const [previewImg, setPreviewImg] = React.useState(detail.albumImageUrl);
  const [color, setColor] = React.useState(null);
  const [colorState, setColorState] = React.useState(false);

  const ColorChange = () => {
    setColor(color_ref.current.value);
  }

  const [musicName, setMusicName] = React.useState(detail.musicTitle);

  const EditMusic = () => {

    if (title_ref.current.value === "") {
      return window.alert("곡명을 채워 주세요.")
    } else if (description_ref.current.value === "") {
      return window.alert ("소개글을 채워 주세요.")
    } 

    const token = localStorage.getItem("token");

    console.log("토큰", token)


    const editList = {
      title : title_ref.current.value,
      description : description_ref.current.value,
      color : color
    }

    console.log("현재 리스트", editList)


    axios.put(`${SERVER_URL}/feeds/${params.id}`, editList,{
      headers: {
        Authorization: token ? token : ""}
    })
    .then((response) => {
      console.log("res ===> ", response);
      alert("피드 수정을 완료했습니다.");

      if (detail.postType === "audio") {
        navigate(`/detail/${params.id}`);
      } else if (detail.postType === "video") {
        navigate(`/detail/video/${params.id}`);
      }
     
      window.scrollTo(0, 0);
    })
    .catch((error) => {
      console.log("err ===> ", error);
      alert("수정에 실패했습니다.");
    });
  }

  return (

    
    <UpLoad>
      <div className="upload-wrap">
      <p className="upload-title">업로드 수정</p>
      <p className="upload-subtitle">수정 시, 곡명과 소개글, 컬러 수정만 가능합니다.</p>
      <div className="upload-form">

        {/***** 곡명 *****/}

        <label className="upload-label">
          <span className="upload-label-span">곡명</span>
          <input type="text" className="upload-input" placeholder="곡명을 입력해 주세요." defaultValue={detail?.title} ref={title_ref}/>
        </label>

        {/***** 소개글 *****/}

        <label className="upload-label">
          <span className="upload-label-span">소개글</span>
          <textarea className="upload-input" placeholder="곡에 대해 소개해 주세요." defaultValue={detail?.description} ref={description_ref}/>
        </label>

        {/***** 장르 *****/}

        <label className="upload-label">
          <span className="upload-label-span">장르</span>

          <div className="upload-select-box">
              <div className="upload-selected">
                {/* <div className="selected" > */}
                {selectGenre}
                  
              </div>
            </div>

        </label>

        {/***** 앨범 커버 *****/}

        <div className="upload-image-wrap">

        <label className="upload-label">
          <span className="upload-label-span">
            {type ? "앨범 커버" : "썸네일"}
            </span>
          </label>
          <div className="upload-image-box">
          <UploadImagePreview previewImg={previewImg} type={type}></UploadImagePreview>
          </div>
          </div>
          
          
        

        {/***** 컬러 *****/}

        <div className="upload-color-wrap">

        <label className="upload-label">
          <span className="upload-label-span">컬러</span>
          <input type="text" className="upload-input" id="upload-input-color" onChange={ColorChange} ref={color_ref} placeholder="HEX 코드(#000000)를 입력하시거나 오른쪽 버튼을 눌러 색상을 골라주세요." defaultValue={color}/>
          <UploadColor color={color} onClick={() => setColorState(!colorState)}></UploadColor>
        </label>

        {colorState ? 
        
        <HexColorPicker 
        className="hex-color"
        color={color} 
        onChange={setColor}/>
        : null }

        </div>
        
        

        {/***** 파일 *****/}
        <div className="upload-music-wrap">

        <label className="upload-label">
          <span className="upload-label-span">파일</span>
          </label>
          <div className="upload-music-box">
          <label className="upload-label-button-music">
          <FaMusic id="upload-music-icon"/></label>
          <input type="text" className="upload-input" id="upload-input-music" placeholder="음악 파일을 선택해 주세요." value={musicName} readOnly/>
          </div>
          </div>

          <button className="primary upload-button" onClick={EditMusic}>수정 업로드</button>
        



      </div>
      </div>
      </UpLoad>
  )
}

let UpLoad = styled.div`
display: flex;
justify-content: center;
align-items: center;

  .hex-color {
    width: 200px;
    height: 200px;
    position:absolute;
    display: flex;
    z-index:22;
    bottom: 10px;
    right: -220px;
  }

`

let UploadImagePreview = styled.div`
  width: ${(props) => (props.type ? "290px" : "480px")};
  height:290px;
  background-color:#E8E8E8;
  border-radius: 10px;
  background-image:url(${(props) => props.previewImg});
  background-size:cover;
  background-position: 50% 50%;
`

let UploadColor = styled.div`
  width: 60px;
  height: 60px;
  background-color:${(props) => props.color};
  margin-left: 20px;
  border-radius: 10px;
`




export default Edit;
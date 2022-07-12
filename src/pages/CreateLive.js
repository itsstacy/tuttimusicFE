import React, {useRef} from 'react';

import styled from 'styled-components';

import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import {SERVER_URL} from "../redux/modules/songSlice";

function CreateLive() {

  const navigate = useNavigate();

  const color_ref = useRef(null);
  const title_ref = useRef(null);
  const description_ref = useRef(null);


  const [previewImg, setPreviewImg] = React.useState(null);
  const [imgName, setImgName] = React.useState(null);
  const [imgFile, setImgFlie] = React.useState(null);

  const [textHeight, setTextHeight] =React.useState(0);
  const imgName_ref = useRef(null);

  React.useEffect(() => {
    console.log(imgName_ref.current.value.length)
    if (imgName_ref.current.value.length <= 18) {
      console.log("18 길이" );
      setTextHeight(19);
    } else if (19 < imgName_ref.current.value.length && imgName_ref.current.value.length <= 36) {
      console.log("36 길이" );
      setTextHeight(34);
    } else if (37 < imgName_ref.current.value.length && imgName_ref.current.value.length <= 54) {
      console.log("54 길이" );
      setTextHeight(49);
    } else if (55 < imgName_ref.current.value.length && imgName_ref.current.value.length <= 72) {
      console.log("72 길이" );
      setTextHeight(64);
    } else if (73 < imgName_ref.current.value.length && imgName_ref.current.value.length <= 90) {
      console.log("90 길이" );
      setTextHeight(79);
    } else if (91 < imgName_ref.current.value.length && imgName_ref.current.value.length <= 108) {
      console.log("108 길이" );
      setTextHeight(94);
    } else if (109 < imgName_ref.current.value.length && imgName_ref.current.value.length <= 126) {
      console.log("126 길이" );
      setTextHeight(109);
    } else if (127 < imgName_ref.current.value.length && imgName_ref.current.value.length <= 144) {
      console.log("144 길이" );
      setTextHeight(124);
    } else if (145 < imgName_ref.current.value.length && imgName_ref.current.value.length <= 162) {
      console.log("162 길이" );
      setTextHeight(140);
    } else if (163 < imgName_ref.current.value.length && imgName_ref.current.value.length <= 190) {
      console.log("190 길이" );
      setTextHeight(155);
    } else if (191 < imgName_ref.current.value.length && imgName_ref.current.value.length <= 208) {
      console.log("208 길이" );
      setTextHeight(170);
    } else if (209 < imgName_ref.current.value.length && imgName_ref.current.value.length <= 226) {
      console.log("226 길이" );
      setTextHeight(185);
    } else if (227 < imgName_ref.current.value.length && imgName_ref.current.value.length <= 244) {
      console.log("255 길이" );
      setTextHeight(200);
    }
  })

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

  const [color, setColor] = React.useState("#545454");
  const [colorState, setColorState] = React.useState(false);
  const [colorRef, setColorRef] = React.useState("#545454");

  const ColorChange = () => {
    console.log("colorRef ===>", color_ref.current.value);
    console.log("color ===>", color);
    setColor(color_ref.current.value);
  }

  const [musicName, setMusicName] = React.useState(null);
  const [musicFile, setMusicFile] = React.useState(null);
  const onLoadMusic = (e) => {
    
    setMusicName(e.target.files[0].name);
    setMusicFile(e.target.files[0]);

  }





  const uploadMusic = () => {

    if (title_ref.current.value === "") {
      return window.alert("곡명을 채워 주세요.")
    } else if (description_ref.current.value === "") {
      return window.alert ("소개글을 채워 주세요.")
    } else if (musicName === null) {
      return window.alert ("파일을 첨부해 주세요.")
    }
    

    const token = localStorage.getItem("token");

    const feedRequestDto = {
      title : title_ref.current.value,
      musicTitle : musicName,
      description : description_ref.current.value,
      postType : "audio",
      color : color
    }

    const formData = new FormData();
    formData.append("feedRequestDto", new Blob([JSON.stringify(feedRequestDto)], {type: "application/json"}))
    formData.append("song", musicFile)
    formData.append("albumImage", imgFile)
    
    axios.post(`${SERVER_URL}/feeds/upload`, formData,{
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: token ? token : ""}
    })
    .then((response) => {
      console.log("res ===> ", response);
      alert("피드가 등록되었습니다.");
      navigate("/musicfeed")
      window.scrollTo(0, 0);
    })
    .catch((error) => {
      console.log("err ===> ", error);
      alert("피드 등록에 실패했습니다.")
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
          <label className="upload-label-button" for="upload-image">이미지 업로드</label>
          <UploadImageNameWrap className="upload-image-name-wrap" textHeight={textHeight}>
            <textarea id="upload-image-name" row="1" value={imgName} ref={imgName_ref} spellcheck="false" readOnly></textarea>


            </UploadImageNameWrap>
          <input type="file" id="upload-image" accept='image/*' onChange={onLoadImage} />
          </div>
          </div>
          
        




          <button className="upload-button">라이브 시작</button>
        



      </div>
      </div>

    </CreateLiveWrap>
  )
}



let CreateLiveWrap = styled.div`
display: flex;
justify-content: center;
align-items: center;

.upload-wrap {
  width:1280px;
}

.upload-title {
  margin:0;
  margin-top:50px;
  font-size: 36px;
  font-weight: bold;
  color:#000;
}

.upload-subtitle {
  margin:0;
  margin-top:16px;
  margin-bottom:60px;
  font-size:16px;
}

.upload-form {
  border-top:1px solid #E8E8E8;
  display: flex;
  flex-direction: column;
  /* justify-content: space-between;
  align-items: flex-start; */
  padding: 50px 105px; 
}

.upload-label {
  position:relative;
  margin-bottom: 70px;
  display: flex;
  flex-direction: row;
}

.upload-label-span {
  display: block;
  width: 220px;
  font-size:20px;
}

.upload-input {
width:850px;
height: 60px;
background-color:#E8E8E8;
border:none;
outline:none;
border-radius:10px;
padding: 0 30px;
font-size:18px;
}

.upload-input::placeholder {
  color: #a8a8a8;
}

.upload-label textarea {
  padding-top:15px;
  height: 160px;
  resize: none;
}

.upload-selected {
  width:850px;
  height: 60px;
  background-color:#E8E8E8;
  border:none;
  outline:none;
  border-radius:10px;
  padding: 0 30px;
  font-size:18px;
  line-height:60px;
  color: #a8a8a8;
}

input[type=radio] {
  display:none;
}

.upload-select-option {
  display: block;
  width:850px;
  height: 60px;
  background-color:#fff;
  border:none;
  outline:none;
  border-radius:10px;
  padding: 0 30px;
  font-size:18px;
  line-height:60px;
  color: #A8A8A8;
  cursor: pointer;
}

.upload-options-container {
  position: absolute;
  border: 1px solid rgb(200, 202, 210);
  border-top: none;
  background-color: #FFF;
  width: 850px;
  border-radius: 10px;
  overflow: hidden;
  z-index: 1;
  box-shadow: 0 5px 10px -3px grey;
  }

  .upload-image-wrap {
    display: flex;
    margin-bottom:70px;
  }

  .upload-image-box {
    width:1060px;
    display:flex;
    align-items: flex-end;
    
  }

  .upload-label-button {
    width:180px;
    height:60px;
    line-height: 60px;
    background-color:#7E7E7E;
    border-radius: 10px;
    font-size: 15px;
    color:#fff;
    text-align: center;
    margin-left:40px;
    cursor: pointer;
  }

  #upload-image {
    display:none;
  }

  .upload-image-name-wrap {
    width:310px;
    vertical-align: middle;
    display:flex;
    align-items:flex-end;

  }

  #upload-image-name {
    margin-left:10px;
    width:134px;
    height:100%;
    resize: none;
    border:none;
    outline: none;
    cursor: default;
    vertical-align: center;    
  }

  #upload-input-color {
    width: 770px;
  }

  .upload-color-wrap {
    position: relative;
  }

  .hex-color {
    width: 200px;
    height: 200px;
    position:absolute;
    display: flex;
    z-index:22;
    bottom: 10px;
    right: -220px;
  }

  .upload-music-wrap {
    display: flex;
    margin-bottom:70px;
  }

  #upload-music-icon {
    font-size:24px;
    color:#4E4E4E;
    position: absolute;
    z-index: 22;
    margin-top:18px;
    margin-left: 30px;
    cursor: pointer;
  }

  #upload-music {
    display: none;
  }

  #upload-input-music {
    padding: 0 70px;
  }

  .upload-button {
    width:200px;
    height: 60px;
    background-color:#4E4E4E;
    color:#fff;
    border:none;
    border-radius:10px;
    font-size:22px;
    margin:0 auto;
  }
`

let UploadImagePreview = styled.div`
  width:480px;
  height:270px;
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

let UploadImageNameWrap = styled.div`
height: ${(props) => props.textHeight}px;
`




export default CreateLive;
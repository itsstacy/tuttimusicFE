import React from 'react'
import styled from 'styled-components';

import { HexColorPicker } from "react-colorful";

import { FaMusic } from "react-icons/fa"



function Upload() {

  const color_ref = React.useRef(null);

  const [selectGenre, setSelectGenre] = React.useState("장르를 선택해 주세요.");
  const [genreState, setGenreState] = React.useState(false);
  
  const genreList = ["발라드", "R&B", "힙합", "댄스곡", "연주곡"]

  const genreOpenClose = () => {
    setGenreState(!genreState);

  }

  const GenreSelect = () => {
    return (
      <>
        <div className="upload-options-container">
          {genreList.map((item) => (
            <div className="upload-option">
              <input
                type="radio"
                className="radio"
                id={item}
                name={item}
                key={item}
              ></input>
              <label
                for={item}
                className="upload-select-option"
                onClick={(item) => {
                  setSelectGenre(item.target.innerText);
                  setGenreState(!genreState);
                }}
              >
                {item}
              </label>
            </div>
          ))}
        </div>
      </>
    );
  };

  const [previewImg, setPreviewImg] = React.useState(null);
  const [imgName, setImgName] = React.useState(null);

  const onLoadImage = (e) => {
    let render = new FileReader()
    setImgName(e.target.files[0].name);

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

  const onLoadMusic = (e) => {
    
    setMusicName(e.target.files[0].name);
 
  }

  return (

    
    <UpLoad>
      <div className="upload-wrap">
      <p className="upload-title">곡 업로드</p>
      <p className="upload-subtitle">당신의 음악을 세상에 들려주세요!</p>
      <div className="upload-form">

        {/***** 곡명 *****/}

        <label className="upload-label">
          <span className="upload-label-span">곡명</span>
          <input type="text" className="upload-input" placeholder="곡명을 입력해 주세요."/>
        </label>

        {/***** 소개글 *****/}

        <label className="upload-label">
          <span className="upload-label-span">소개글</span>
          <textarea className="upload-input" placeholder="곡에 대해 소개해 주세요."/>
        </label>

        {/***** 장르 *****/}

        <label className="upload-label">
          <span className="upload-label-span">장르</span>

          <div className="upload-select-box">
              <div className="upload-selected" onClick={genreOpenClose}>
                {/* <div className="selected" > */}
                {selectGenre}
                  
              </div>

              {genreState ? <GenreSelect /> : null}
            </div>

        </label>

        {/***** 앨범 커버 *****/}

        <div className="upload-image-wrap">

        <label className="upload-label">
          <span className="upload-label-span">앨범 커버</span>
          </label>
          <div className="upload-image-box">
          <UploadImagePreview previewImg={previewImg}></UploadImagePreview>
          <label className="upload-label-button" for="upload-image">이미지 업로드</label>
          <span id="upload-image-span">{imgName}</span>
          <input type="file" id="upload-image" accept='image/*' onChange={onLoadImage} />
          </div>
          </div>
          
          
        

        {/***** 컬러 *****/}

        <div className="upload-color-wrap">

        <label className="upload-label">
          <span className="upload-label-span">컬러</span>
          <input type="text" className="upload-input" id="upload-input-color" onChange={ColorChange} ref={color_ref} placeholder="HEX 코드(#000000)를 입력하시거나 오른쪽 버튼을 눌러 색상을 골라주세요."/>
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
          <label className="upload-label-button-music" for="upload-music">
          <FaMusic id="upload-music-icon"/></label>
          <input type="text" className="upload-input" id="upload-input-music" placeholder="파일을 선택해 주세요." value={musicName}/>
          <input type="file" id="upload-music" accept='audio/*' onChange={onLoadMusic}/>
          </div>
          </div>

          <button className="upload-button">업로드</button>
        



      </div>
      </div>
      </UpLoad>
  )
}

let UpLoad = styled.div`
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

  #upload-image-span {
    margin-left:10px;
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
  width:290px;
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




export default Upload;
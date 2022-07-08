import axios from 'axios';
import React, {useEffect, useState} from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

function MyEdit() {

  const navigate = useNavigate();

  //mypage의 담아져있던 데이터(userInfoDto 값을 state로!)를 받아와서 받아 온 state를 userInfo로 지정  
  const {state} = useLocation();
  const userInfo = state;
  console.log(userInfo);

  const [userInfoDto, setUserInfoDto] = useState();
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState(userInfo.profileImage);  

  //수정할 값들
  const [profileText, setProfileText] = useState("");
  const [insta, setInsta] = useState(null);
  const [youtube, setYoutube] = useState(null);

  const genreNames = ["발라드", "어쿠스틱", "R&B", "힙합", "댄스", "연주곡"]



const myinfoEdit = () => {
  const token = localStorage.getItem("token");

  const updateData = {
    profileText : profileText,
    instagramUrl : insta,
    youtubeUrl : youtube,
    genre : [null, null, null, null],
  }
  console.log(updateData)

  let formData = new FormData();
      formData.append("file", image)
      formData.append("updateData", new Blob([JSON.stringify(updateData)], {type: "application/json"}))

  axios
  .put("http://52.79.234.195/user/mypage", formData, {
    headers: {Authorization:token? token:""}
  })
  .then((response) => {
    console.log(response)
    alert("수정이 완료됐어요")
    navigate('/mypage')
  })
  .catch((error) => {
    console.log(error)
    alert("수정되지 않았습니다")
  })
}

  



  // 이미지 올리고 미리보기
  const fileChange = (e) => {
    let render = new FileReader()
    setImage(e.target.files[0])

    if (e.target.files[0]) {
      render.readAsDataURL(e.target.files[0])
    }

    render.onload = () => {
      const previewImgUrl = render.result

    if (previewImgUrl) {
      setPreview(previewImgUrl)
    }
    }
    console.log(e.target.files[0])   
}


  return (
    <div className='signup-container'>

      <div className='signup-title-box'>
        <p className='signup-title'>회원 정보 수정</p>
        <p className='signup-subtitle'>장르, 소개글, 인스타그램 주소와 유튜브 주소만 수정 가능합니다.</p>
      </div>

      <div className='signup-info-box'>
        <div className='signup-info'>

          {/* 닉네임  */}
          <div className='signup-pw-box'>
            
            <div className='signup-pw-title-box'>
              <p className='signup-pw-title'>닉네임</p>
            </div>

            <div className='signup-email-content'>
              <input className='signup-pw-input'
                type="text" 
                value={userInfo.artist}
                readOnly/>
            </div>

          </div>

          {/* 프로필 이미지  */}
          <div className='signup-profile-img-box'>

            <div className='profile-title-box'>
              <p className='profile-title'>프로필 이미지</p>
            </div>

            <div className='profile-img-form'>
              <img src={preview} className='profile-img-circle'/>
              <label className="profile-img-button" htmlFor="image">이미지 업로드</label>
              <input className='img-button' type="file" id="image" accept='image/*' onChange={fileChange} />
            </div>

          </div>

          {/* 선호 장르  */}
          <div className='signup-genre-box'>

            <div className='signup-genre-title-box'>
              <p className='signup-genre-title'>선호 장르</p>
            </div>

            <div className='genre-container'>
              <div className='genre-boxes'>
                <div className='genre-box'>
                  {
                    genreNames.map((name, index) => {
                      return (
                        <button onClick={()=>{console.log(name)}}
                          key = {name}
                          className='genre-category'>
                            {name}
                        </button>
                      )
                    })
                  }
                </div>
              </div>
            </div>

          </div>

          {/* 소개글  */}
          <div className='signup-pw-box'>

            <div className='signup-pw-title-box'>
              <p className='signup-pw-title'>소개글</p>
            </div>
            
            <input className='signup-pw-input'
              onChange={(e)=>{
                setProfileText(e.target.value)
                }}
              type="text"
              placeholder='소개글을 입력하세요.'
              defaultValue={userInfo.profileText}/>

          </div>

          {/* 인스타  */}
          <div className='signup-pw-box'>

            <div className='signup-pw-title-box'>
              <p className='signup-pw-title'>Instagram</p>
            </div>

            <input className='signup-pw-input'
              onChange={(e)=>{
                setInsta(e.target.value)
                }}
              type="text"
              placeholder='URL을 입력해주세요.'
              defaultValue={userInfo.instagramUrl}/>

          </div>

          {/* 유튜브  */}
          <div className='signup-pw-box'>

            <div className='signup-pw-title-box'>
              <p className='signup-pw-title'>Youtube</p>
            </div>

            <input className='signup-pw-input'
              onChange={(e)=>{
                setYoutube(e.target.value)
                }}
              type="text"
              placeholder='URL을 입력해주세요.'
              defaultValue={userInfo.youtubeUrl}/>

          </div>

        </div>

        
      </div>
        <button className='signup-button-box' onClick={myinfoEdit}>저장</button>
    </div>
  )
}

export default MyEdit;
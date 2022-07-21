import React, {useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import { BsDot } from "react-icons/bs"

import {SERVER_URL} from "../redux/modules/songSlice";

const SignUp = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [artist, setArtist] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");
    const [image, setImage] = useState("");
    const [profileText, setProfileText] = useState("");
    const [preview, setPreview] = useState(null);
    //초기값을 null로 해야 사각형이 안나옴!

    const [insta, setInsta] = useState(null);
    const [youtube, setYoutube] = useState(null);

    const genreNames = ["발라드", "어쿠스틱", "R&B", "힙합", "댄스", "연주곡"]
    




    //이메일 체크
    const checkEmail = (email) => {
        const regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
        if (regExp.test(email)) {
            return true;
        } else {
            return false;
        }
    }

    //비밀번호 체크 (4~20글자)
    const checkPw = (pw) => {
        const regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,20}$/;
        if (regExp.test(pw)) {
            return true;
        } else {
            return false;
        }
    }

    //  이미지 올리고 미리보기
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


    //이메일 확인
    const emailCheck = () => {
        if (email === "") {
            return window.alert("이메일을 입력하세요!");
        }

      //이메일 양식이 다를 때
        if (checkEmail(email) === false) {
            return window.alert("이메일 양식을 확인하세요!")
        }

        let emailList = {email : email}

        axios
            .post(`${SERVER_URL}/user/email`,emailList)
            .then((response) => {
                console.log(response)
                if(response)
                {window.alert("사용 가능한 이메일입니다!")}
            })
            .catch((error) => {
                console.log(error)
                window.alert("중복된 이메일입니다!")
                setEmail("")
            })
    }

    //닉네임(아티스트 이름) 확인
    const artistCheck = () => {
        if (artist === "") {
            return window.alert("닉네임을 입력하세요!")
        } else {
            axios
            .post(`${SERVER_URL}/user/artist`,{artist : artist})
            .then((response) => {
                console.log(response)
                if(response){window.alert("사용 가능한 닉네임입니다!")} 
            })
            .catch((error) => {
                console.log(error)
                window.alert("중복된 닉네임입니다!")
                setArtist("")
            })
        }

        
    }


    const signupCheck = () => {
        //하나라도 공백일 때
        if (
            email === "" ||
            artist === "" ||
            password === "" ||
            passwordCheck === "" 
        ) {
            return window.alert("모든 항목을 입력하세요!");    
        }

        const nullList = [null, null, null, null]

        if (genre.toString() === nullList.toString()) {
          return window.alert("장르를 최소 1개 선택해 주세요.")
          
        }

      //비밀번호 양식이 다를 때
        if (checkPw(password) === false || checkPw(passwordCheck) === false) {
            return window.alert("비밀번호는 8~20글자 영문+숫자 조합입니다!")
        }

      //비밀번호가 서로 다를 때
        if (password !== passwordCheck) {
            return window.alert("비밀번호가 서로 달라요!")
        }


        //signupdata로 하나로 만들기 + form데이터 형식으로 보내기
        let signupdata = {
            email : email,
            password : password,
            artist : artist,  
            genre : genre,
            profileText : profileText,
            instagramUrl : insta,
            youtubeUrl : youtube,
            genreSelected : clickGenre
        }
        console.log(signupdata)


        let formData = new FormData();
            formData.append("file", image)
            formData.append("signupData", new Blob([JSON.stringify(signupdata)], {type: "application/json"}))



        axios
            .post(`${SERVER_URL}/user/signup`, formData)
            .then((response) => {
                console.log(response)
                window.alert("가입이 완료되었어요!")
                navigate('/login')
            })
            .catch((error) => {
                console.log(error)
            })   
            
            
    
    }

    const [genre, setGenre] = useState([null, null, null, null]);
    const [clickGenre, setClickGenre] = useState([false, false, false, false, false, false]);
    
  const genrePick = (name, index) => {
    // indexOf 함수는 해당 배열에서 특정 값을 찾을 때 인덱스 숫자로 위치를 알려주고 없으면 -1을 반환
    // genre 배열에서 null값이 없어서 -1을 반환할 때 name(장르 이름)으로 가득 찬 상태이므로 알림창 띄우기
    if (genre.indexOf(null) === -1 &&  genre.indexOf(name) === -1) {
      return window.alert("장르는 최대 4개까지 선택 가능합니다.")
    } else if (genre.indexOf(name) === -1) {
      genre.pop();
      genre.unshift(name);
      console.log("genre", genre);
    } else {
      genre.splice(genre.indexOf(name), 1);
      genre.push(null);
      console.log("genre", genre);
    }

    // genre가 null값의 배열이므로 마지막 null을 지우고 맨 앞에 name(장르 이름)을 넣는 형태

    setClickGenre([
      ...clickGenre.slice(0, index),
      !clickGenre[index],
      ...clickGenre.slice(index+1),
    ]);
    console.log("clickGenre ==> ", clickGenre)

  }


    return (
        <div className='signup-container'>
            <div className='signup-title-box'>
                <p className='signup-title'>회원가입</p>
                <p className='signup-subtitle'>tutti 회원이 되어 주세요!</p>
            </div>
            <div className='signup-info-box'>
                <div className='signup-info'>

                    {/* 이메일 부분 */}
                    <div className='signup-email-box'>

                        <div className='signup-email-title-box'>
                            <p className='signup-email-title'>이메일<span id="signup-dot">*</span></p>
                        </div>
                        
                        <div className='signup-email-content'>
                            <input className='signup-email-input'
                                    onChange={(e)=>{
                                        setEmail(e.target.value)
                                    }}
                                    type="text" 
                                    placeholder="실제 사용 중인 이메일을 입력하세요"
                                    name="email"
                            />
                            <button className='secondary signup-button' onClick={(emailCheck)}>인증</button><br/>
                        </div>
                        
                    </div>
                    
                    
                    {/* 비밀번호 부분 */}
                    <div className='signup-pw-box'>

                        <div className='signup-pw-title-box'>
                            <p className='signup-pw-title'>비밀번호<span id="signup-dot">*</span></p>
                        </div>

                        <div className='signup-pw-content'>
                            <input className='signup-pw-input'
                                onChange={(e)=>{
                                    setPassword(e.target.value)
                                }}   
                                type="password" 
                                placeholder="비밀번호를 입력하세요"
                                name="password"
                                />
                            <div className='signup-pw-check'>
                                <p className='pw-check'>비밀번호 규칙 : 8~20글자 영문+숫자 조합</p>
                            </div>    
                                <br/>
                        </div>    
                    </div>

                    {/* 비밀번호 확인 부분*/}
                    <div className='signup-pw-box'>

                        <div className='signup-pw-title-box'>
                            <p className='signup-pw-title'>비밀번호 확인<span id="signup-dot">*</span></p>
                        </div>

                        <div className='signup-pw-content'>
                            <input className='signup-pw-input'
                                onChange={(e)=>{
                                    setPasswordCheck(e.target.value)
                                }}   
                                type="password" 
                                placeholder="비밀번호를 입력하세요"
                                name="password"
                                />
                        </div>    
                    </div>


                    {/* 닉네임 부분 */}
                    <div className='signup-email-box'>

                        <div className='signup-email-title-box'>
                            <p className='signup-email-title'>닉네임<span id="signup-dot">*</span></p>
                        </div>
                        
                        <div className='signup-email-content'>
                            <input className='signup-email-input'
                                    onChange={(e)=>{
                                        setArtist(e.target.value)
                                    }}
                                    type="text" 
                                    placeholder="닉네임을 입력하세요"
                                    name="email"
                            />
                            <button className='secondary signup-button' onClick={(artistCheck)}>중복 확인</button><br/>
                        </div>
                        
                    </div>
                    
                    {/* 이미지 업로드 부분 */}
                    <div className='signup-profile-img-box'>
                        <div className='profile-title-box'>
                            <p className='profile-title'>프로필 이미지<span id="signup-dot">*</span></p>
                        </div>
                        <div className='profile-img-form'>
                            <img src={preview} className='profile-img-circle'/>
                            <label className="secondary profile-img-button" htmlFor="image">이미지 업로드</label>
                            <input className='img-button' type="file" id="image" accept='image/*' onChange={fileChange} />

                        </div>
                    </div>

                    {/* 선호 장르 부분 */}
                    <div className='signup-genre-box'>
                        <div className='signup-genre-title-box'>
                            <p className='signup-genre-title'>선호 장르<span id="signup-dot">*</span></p>
                        </div>

                        <div className='genre-container'>
                            <div className='genre-boxes'>
                                <GenreBox className='genre-box' clickGenre={clickGenre}>
                                    {
                                        genreNames.map((name, index) => {
                                            return (
                                                <button 
                                                    onClick={()=>
                                                        genrePick(name, index)}
                                                    key = {name}
                                                    className={'genre-category genre'+ index}>
                                                        {name}
                                                </button>
                                            )
                                        }
                                        )
                                    }
                                </GenreBox>
                            </div>
                            <div className='genre-info'>
                                <p className='genre-info-comment'>최대 4개까지 선택 가능합니다.</p>
                            </div>
                        </div>
                    </div>
                    
                    {/* 소개글 부분 */}
                    <div className='signup-pw-box'>
                        <div className='signup-pw-title-box'>
                            <p className='signup-pw-title'>소개글<span id="signup-dot">*</span></p>
                        </div>
                        
                        <input className='signup-pw-input'
                                onChange={(e)=>{
                                    setProfileText(e.target.value)
                                }}   
                                type="text" 
                                placeholder="소개글을 입력하세요"
                                />
                    </div>
                    
                    {/* 인스타 주소 */}
                    <div className='signup-pw-box'>
                        <div className='signup-pw-title-box'>
                            <p className='signup-pw-title'>Instagram</p>
                        </div>
                        
                        <input className='signup-pw-input'
                                onChange={(e)=>{
                                    setInsta(e.target.value)
                                }}   
                                type="text" 
                                placeholder="URL을 입력하세요"
                                />
                    </div>

                    {/* 유튜브 주소 */}
                    <div className='signup-pw-box'>
                        <div className='signup-pw-title-box'>
                            <p className='signup-pw-title'>Youtube</p>
                        </div>
                        
                        <input className='signup-pw-input'
                                onChange={(e)=>{
                                    setYoutube(e.target.value)
                                }}   
                                type="text" 
                                placeholder="URL을 입력하세요"
                                />
                    </div>

                    
                </div>
        </div>
            <button className='primary signup-button-box' 
                onClick={(signupCheck)}>회원가입</button>
        </div>
    )
}   

const GenreBox = styled.div`
    .genre0{
        background-color:${(props) => (props.clickGenre[0] ? '#545454' : '#DADADA')};
        color:${(props) => (props.clickGenre[0] ? '#fff' : '#000')};
    }
    .genre1{
        background-color:${(props) => (props.clickGenre[1] ? '#545454' : '#DADADA')};
        color:${(props) => (props.clickGenre[1] ? '#fff' : '#000')};
    }
    .genre2{
        background-color:${(props) => (props.clickGenre[2] ? '#545454' : '#DADADA')};
        color:${(props) => (props.clickGenre[2] ? '#fff' : '#000')};
    }
    .genre3{
        background-color:${(props) => (props.clickGenre[3] ? '#545454' : '#DADADA')};
        color:${(props) => (props.clickGenre[3] ? '#fff' : '#000')};
    }
    .genre4{
        background-color:${(props) => (props.clickGenre[4] ? '#545454' : '#DADADA')};
        color:${(props) => (props.clickGenre[4] ? '#fff' : '#000')};
    }
    .genre5{
        background-color:${(props) => (props.clickGenre[5] ? '#545454' : '#DADADA')};
        color:${(props) => (props.clickGenre[5] ? '#fff' : '#000')};
    }
`

export default SignUp;
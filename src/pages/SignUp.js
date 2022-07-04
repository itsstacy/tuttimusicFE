import React, {useEffect, useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [artist, setArtist] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");
    const [image, setImage] = useState("");
    const [profileText, setProfileText] = useState("");

    const [insta, setInsta] = useState("");
    const [youtube, setYoutube] = useState("");
  
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

    //  이미지 올리기
    const fileChange = (e) => {
        console.log(e.target.files[0])
        if(e.target && e.target.files[0]) {
            setImage(e.target.files[0])
        }

        
    }


    // console.log(email, artist, password, passwordCheck)

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
            .post("http://52.79.234.195/user/email",emailList)
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
        }

        axios
            .post("http://52.79.234.195/user/artist",{artist : artist})
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

      //비밀번호 양식이 다를 때
        if (checkPw(password) === false || checkPw(passwordCheck) === false) {
            return window.alert("비밀번호는 8~20글자 영문+숫자 조합입니다!")
        }

      //비밀번호가 서로 다를 때
        if (password !== passwordCheck) {
            return window.alert("비밀번호가 서로 달라요!")
        }
        
        //장르 선택 시 해당 값을 보내줘야 함

        //sns 주소 입력 => 해당 값을 보내주고, 
        //sns 주소 미입력 => null 값을 보내줘야 함


        
        let signupdata = {
            email : email,
            password : password,
            artist : artist,  
            genre : [null, null, null, null],
            profileText : profileText,
            instagramUrl : null,
            youtubeUrl : null
        }
        console.log(signupdata)


        let formData = new FormData();
            formData.append("file", image)
            formData.append("signupData", new Blob([JSON.stringify(signupdata)], {type: "application/json"}))



        axios
            .post("http://52.79.234.195/user/signup", formData)
            .then((response) => {
                console.log(response)
                window.alert("가입이 완료되었어요!")
                navigate('/login')
            })
            .catch((error) => {
                console.log(error)
            })    
    
    }

    return (
        <div className='signup-container'>
            <div className='signup-title-box'>
                <p className='signup-title'>회원가입</p>
                <p className='signup-subtitle'>추가 설명</p>
            </div>
            <div className='signup-info-box'>
                <div className='signup-info'>

                    {/* 이메일 부분 */}
                    <div className='signup-email-box'>

                        <div className='signup-email-title-box'>
                            <p className='signup-email-title'>이메일</p>
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
                            <button className='signup-email-button' onClick={(emailCheck)}>인증</button><br/>
                        </div>
                        
                    </div>
                    
                    
                    {/* 비밀번호 부분 */}
                    <div className='signup-pw-box'>

                        <div className='signup-pw-title-box'>
                            <p className='signup-pw-title'>비밀번호</p>
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
                            <p className='signup-pw-title'>비밀번호 확인</p>
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
                            {/* <div className='signup-pw-check'>
                                <p className='pw-check'>비밀번호 규칙</p>
                            </div>     */}
                                <br/>
                        </div>    
                    </div>


                    {/* 닉네임 부분 */}
                    <div className='signup-email-box'>

                        <div className='signup-email-title-box'>
                            <p className='signup-email-title'>닉네임</p>
                        </div>
                        
                        <div className='signup-email-content'>
                            <input className='signup-email-input'
                                    onChange={(e)=>{
                                        setEmail(e.target.value)
                                    }}
                                    type="text" 
                                    placeholder="닉네임을 입력하세요"
                                    name="email"
                            />
                            <button className='signup-artist-button' onClick={(artistCheck)}>중복 확인</button><br/>
                        </div>
                        
                    </div>
                    
                    {/* 이미지 업롭드 부분 */}
                    <div className='signup-profile-img-box'>
                        <div className='profile-title-box'>
                            <p className='profile-title'>프로필 이미지</p>
                        </div>
                        <div className='profile-img-form'>
                            <div className='profile-img-circle' >
                                {/* 이미지 업로드 => 파일 미리보기 기능 */}
                            </div>
                            
                            <label className="profile-img-button" for="upload-image">이미지 업로드</label>
                            <input type="file" id="upload-image" accept='image/*' onChange={fileChange} />

                            {/* <input className='profile-img-button' type="file" name="image" onChange={fileChange}/> */}
                        </div>
                    </div>

                    {/* 선호 장르 부분 */}
                    <div className='signup-genre-box'>
                        <div className='signup-genre-title-box'>
                        <p className='signup-genre-title'>선호 장르</p>
                        </div>

                        <div className='genre-container'>
                            <div className='genre-boxes'>
                                <div className='genre-box'>
                                    <button className='genre-category'>
                                        발라드
                                    </button>
                                    <button className='genre-category'>
                                        어쿠스틱
                                    </button>
                                    <button className='genre-category'>
                                        알앤비
                                    </button>
                                </div>
                                <div className='genre-box'>
                                    <button className='genre-category'>
                                        힙합
                                    </button>
                                    <button className='genre-category'>
                                        댄스
                                    </button>
                                    <button className='genre-category'>
                                        연주곡
                                    </button>
                                </div>
                            </div>
                            <div className='genre-info'>
                                <p className='genre-info-comment'>최대 4개까지 선택 가능합니다.</p>
                            </div>
                        </div>
                    </div>
                    
                    {/* 소개글 부분 */}
                    <div className='signup-pw-box'>
                        <div className='signup-pw-title-box'>
                            <p className='signup-pw-title'>소개글</p>
                        </div>
                        
                        <input className='signup-pw-input'
                                onChange={(e)=>{
                                    setProfileText(e.target.value)
                                }}   
                                type="text" 
                                placeholder="소개글을 입력하세요"
                                />
                    </div>
                    {/* 소개글 : <input type="text" onChange={(e)=>{setProfileText(e.target.value)}}/><br/> */}
                    
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
            <button className='signup-button-box' 
                onClick={(signupCheck)}>회원가입</button>
        </div>
    )
}   

export default SignUp;
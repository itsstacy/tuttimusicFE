import React, {useState} from 'react'
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

      // //비밀번호가 공백일 때
      // if (password === "" || passwordCheck === "") {
      //     return window.alert("비밀번호를 입력하세요!")
      // }

      //비밀번호 양식이 다를 때
      if (checkPw(password) === false || checkPw(passwordCheck) === false) {
          return window.alert("비밀번호는 8~20글자 영문+숫자 조합입니다!")
      }

      //비밀번호가 서로 다를 때
      if (password !== passwordCheck) {
          return window.alert("비밀번호가 서로 달라요!")
      }
      
      console.log(email, artist, password, passwordCheck)
      

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
      <>
          <h3>회원가입</h3>
          <input 
              onChange={(e)=>{
                  setEmail(e.target.value)
              }}
              type="text" 
              placeholder="실제 사용 중인 이메일을 입력하세요"
              name="email"
              />
          <button onClick={(emailCheck)}>이메일 중복 확인</button><br/>
          <input 
              onChange={(e)=>{
                  setArtist(e.target.value)
              }}
              type="text" 
              placeholder="닉네임을 입력하세요"
              name="artist"
              />
          <button onClick={(artistCheck)}>닉네임 중복 확인</button><br/>
          <input
              onChange={(e)=>{
                  setPassword(e.target.value)
              }}   
              type="text" 
              placeholder="비밀번호를 입력하세요"
              name="password"
              /><br/>
          <input
              onChange={(e)=>{
                  setPasswordCheck(e.target.value)
              }}
              type="text" 
              placeholder="비밀번호를 다시 입력하세요"/><br/>
          {/* <inputCheck type="checkbox" name=""/>락/메탈
          <inputCheck type="checkbox" name=""/>알앤비
          <inputCheck type="checkbox" name=""/>발라드
          <inputCheck type="checkbox" name=""/>댄스
          <inputCheck type="checkbox" name=""/>재즈
          <inputCheck type="checkbox" name=""/>힙합
          <inputCheck type="checkbox" name=""/>인디 */}
          <br/>

          프로필 사진 : <input type="file" name="image" onChange={fileChange}/><br/>
          자기소개 : <input type="text" onChange={(e)=>{setProfileText(e.target.value)}}/><br/>
          인스타그램 주소 : <input type="text"/><br/>
          유튜브 주소 : <input type="text"/><br/>
          <button onClick={(signupCheck)}>회원가입</button>
      </>
  )
}

export default SignUp;
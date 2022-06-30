import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Login = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //이메일 체크
  const checkEmail = (email) => {
    const regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    if (regExp.test(email)) {
        return true;
    } else {
        return false;
    }
}

  const loginCheck = () => {
      if (email === "" && password === "") {
          return window.alert("모든 항목을 입력하세요!")
      }
      if (email === "") {
          return window.alert("아이디를 입력하세요!")
      }
      if (checkEmail(email) === false) {
          return window.alert("이메일 형식을 확인하세요!")
      }
      if (password === "") {
          return window.alert("비밀번호를 입력하세요!")
      }

      console.log(email, password)

      axios 
          .post("http://52.79.234.195/user/login", {
              email : email,
              password : password,
          })
          .then((response) => {
              console.log(response)
              const token = response.headers.authorization
              localStorage.setItem("token", token)
              navigate("/")
          })
          .catch((error) => {
              console.log(error)
          })
  }

  return (
      <div>
          <h3>로그인</h3>
          <input 
              onChange={(e)=>{
                  setEmail(e.target.value)
              }}
              placeholder="이메일을 입력하세요"/><br/>
          <input 
              onChange={(e)=>{
                  setPassword(e.target.value)
              }}
              placeholder="비밀번호를 입력하세요"/><br/>
          <button onClick={(loginCheck)}>로그인</button>
      </div>
  )
}



export default Login;
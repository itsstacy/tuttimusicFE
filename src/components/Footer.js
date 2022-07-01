import React from 'react'
import styled from 'styled-components';

function Footer() {
  return (
    <FOOTER>
    <div className="footer-wrap">
      <div className="footer-box">
      <div className="footer-logo">tutti</div>
      </div>
      <div className="footer-box">
      <div className="footer-about">
        <div className="footer-about-about">about</div>
        {/* <div className="footer-ul">
        <ul> 
          <li>FE</li>
          <li>권지은</li>
          <li>김현명</li>
          <li>이가연</li>
        </ul>
        <ul>
          <li>BE</li>
          <li>김도엽</li>
          <li>김민지</li>
          <li>김창규</li>
          <li>박세열</li>
        </ul>
        </div> */}
        </div>
      </div>

    </div>
    </FOOTER>
  )
}

let FOOTER = styled.div`
width:100%;
height: 200px;
background-color:#D9D9D9;
color: #4E4E4E;
display:flex;
justify-content: center;

.footer-wrap {
  width:100%;
  display:flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.footer-box {
  width:50%;
  display:flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.footer-logo {
  font-size:40px;
  font-weight: bold;
  margin:0 50px;
}

.footer-about {
  display:flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.footer-about-about {
  font-size:18px;
  margin:0 50px;
}

.footer-ul {
  display:flex;
  flex-direction:column;
  justify-content: center;
}

.footer-about ul {
  list-style:none;
  margin:0;
  padding:0;
  margin: 20px 0;
}

.footer-about ul li {
  float:left;
  margin-right: 30px;
  font-size:14px;
  cursor: pointer;
}

.footer-about ul li:first-child {
  font-weight:bold;
}
`

export default Footer;
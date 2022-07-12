import React from 'react';
import styled from 'styled-components';

function Live() {
  return (
    <LiveWrap>
      <div className="live-box">
      <div className="live-box-left">
        <div className="live-view">라이브 송출 화면 div </div>
        
        <div className="live-info">
        <div id="live-info-image"></div>
          <div className="live-info-user">
            <div id="live-info-user-name">닉네임</div>
            <div id="live-info-user-live">LIVE</div>
          </div>
          <div className="live-info-title">
            <div id="live-info-title-main">차차의 라이브</div>
            <div id="live-info-title-sub">안녕하세요 귀여운 차차입니다ㅎㅎ</div>
          </div>
        </div>
        </div>

        <div className="live-box-right">

        <div className="live-chat">
          <div id="live-chat-title">실시간 채팅</div>

          

          <div className="live-chat-list">

            <div className="live-chat-list-box">
              <div id="live-chat-user-image" className="live-chat-user-image-other"></div>
              <div className="live-chat-list-info-wrap">
                <div className="live-chat-list-info">
                  <div id="live-chat-list-name">닉네임</div>
                  <div id="live-chat-list-time">2시간 전</div>
                </div>
                <div id="live-chat-list-text">채팅 내용이 들어갑니다.</div>
              </div>

            </div>

            <div className="live-chat-box">
            <input type="text" id="live-chat-user-input" placeholder="채팅을 입력해 주세요."></input>
            <button id="live-chat-user-button">등록</button>
          </div>
          </div>

        </div>
        </div>
      </div>


    </LiveWrap>
  )
}

let LiveWrap = styled.div`
width:100%;
display:flex;
justify-content: center;

.live-box {
  width:1280px;
  display:flex;
  flex-direction: row;
}

.live-view {
  width:880px;
  height:495px;
  background-color:#D9D9D9;
  margin-bottom: 40px;
  text-align: center;
}

.live-info {
  display: flex;
  flex-direction: row;
  padding-bottom: 40px;
  margin-bottom: 30px;
}

#live-info-image {
  width:80px;
  height:80px;
  border-radius: 80px;
  background-color:#D9D9D9;
  margin-right:20px;
}

.live-info-user {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin-right: 180px;
}

#live-info-user-name {
  font-size: 18px;
}

#live-info-user-live {
  font-size: 14px;
  background-color:#7E7E7E;
  padding:6px 12px;
  color:#fff;
  border-radius: 10px;
  text-align: center;
}

.live-info-title {
  display:flex;
  flex-direction: column;
}

#live-info-title-main {
  font-size: 22px;
  margin-bottom: 20px;
}

#live-info-title-sub {
  font-size: 15px;
}

.live-chat {
  display: flex;
  flex-direction:column;
  width:380px;
  height:685px;
  margin-left:10px;
}

#live-chat-title {
  font-size: 20px;
  margin-bottom:40px;
}

.live-chat-box {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 50px;
  
}



#live-chat-user-input {
  width:240px;
  background-color: #E8E8E8;
  border:none;
  outline: none;
  padding: 15px 30px;
  border-radius: 10px;
  font-size: 15px;
}

#live-chat-user-button {
  width:120px;
  height: 60px;
  background-color: #545454;
  color:#fff;
  border:none;
  outline:none;
  border-radius: 10px;
  text-align: center;
  font-size: 15px;
}

.live-chat-list {
  display: flex;
  flex-direction: column;
}

.live-chat-list-box {
  display: flex;
  flex-direction: row;
  margin-bottom: 25px;
  height:485px;
}

.live-chat-user-image-other {
  width: 50px;
  height: 50px;
  border-radius: 50px;
  background-color:#D9D9D9;

}

.live-chat-list-info-wrap {
  margin-left: 10px;
}

.live-chat-list-info {
  display: flex;
  flex-direction: row;
  align-items: center;
}


#live-chat-list-name {
  font-size: 17px;
  margin-right: 10px;
}

#live-chat-list-time {
  font-size: 14px;
  color: #BCBCBC;
}

#live-chat-list-text {
  font-size: 15px;
  color:#434343;
  }
`

export default Live;
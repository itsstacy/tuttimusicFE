import React from 'react';

function Live() {
  return (
    <div className="live-wrap">
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


    </div>
  )
}


export default Live;
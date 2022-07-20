import React from 'react';
import {useNavigate} from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="not-wrap">
      <div className="not-title">페이지를 찾을 수 없습니다.</div>
      <div className="not-sub-title">존재하지 않거나, 사용할 수 없는 페이지입니다.</div>
      <div className="not-404">404</div>
      <button className="primary btn not-button" onClick={() => navigate('/')}>홈으로 돌아가기</button>
    
    </div>
  )
}

export default NotFound;
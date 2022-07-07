import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SERVER_URL } from "../redux/modules/songSlice";
import axios from 'axios';
import styled from 'styled-components';

function EditDelete(props) {

  const id = props.id;
  const detail = props.detail;
  const token = props.token;

  const navigate = useNavigate();

  const GoEdit = () => {
    navigate(`/edit/${id}`, {state: detail});
    window.scrollTo(0, 0);
  }

  //delete this post
  const GoDelete = () => { 

  if(window.confirm("삭제하시겠습니까?")) {
    axios.delete(`${SERVER_URL}/feeds/${id}`,{
      headers: {
        Authorization: token ? token : ""}
    })
    .then((response) => {
      console.log("res ===> ", response);
    })
    .catch((error) => {
      console.log("err ===> ", error);
    });
    alert("삭제되었습니다.");
    navigate("/musicfeed");
    window.scrollTo(0, 0);
  } 
  }
  return (
    <EditDeleteWrap>
    <div className="go-edit" onClick={GoEdit}>수정</div> | 
    <div className="go-delete" onClick={GoDelete}>삭제</div>
    </EditDeleteWrap>
  )
}

let EditDeleteWrap = styled.div`
display: flex;
flex-direction: row;
color: #D9D9D9;
cursor: default;

.go-edit {
  margin-right: 12px;
  color: #7E7E7E;
  cursor: pointer;
}

.go-delete {
  margin-left: 12px;
  color: #7E7E7E;
  cursor: pointer;
}
`

export default EditDelete;
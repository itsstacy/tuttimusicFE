import React, { useEffect, useState, useRef} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {getSongDetail,postComment, SERVER_URL, likeSong} from "../redux/modules/songSlice"
import {FaRegHeart, FaHeart} from "react-icons/fa";
import {MdDelete} from "react-icons/md"
import BeatLoader from "react-spinners/BeatLoader";
import {BsCheckCircle} from "react-icons/bs";
import {MdEdit} from "react-icons/md";
import moment from "moment";
import Waveform from '../elements/Waveform';
import axios from "axios";
import EditComment from "../elements/EditComment";

function Detail() {
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let params = useParams();

  // console.log(moment.utc("2019-12-04 12:00:24").local().startOf('seconds').fromNow())
  // console.log(moment("2022-07-01T16:08:54+09:00").startOf('hour').fromNow())
  const currentTime = moment().format()

  useEffect(()=>{
  const token = localStorage.getItem("token");
  setToken(token);
  setLoading(true);
  const propslist={
    token: token,
    id: params.id,
  }
  dispatch(getSongDetail(propslist));
  setTimeout(()=> {
    setLoading(false);
  },200)
  window.scrollTo(0,0);
},[])

  //get lists from songslice
  const detail = useSelector((state)=> state.Song.detail);
  const commentsList = useSelector((state)=> state.Song.comments);
  console.log(detail);
  console.log(commentsList);
  

  //get user info from local storage
  const userName = localStorage.getItem("userName");
  const userProfileUrl = localStorage.getItem("userProfileUrl");
  
  //add a comment
  const [myComment, setMyComment] = useState(null);
  
  console.log(myComment);

  const addNewComment = () => {
    dispatch(postComment({
    artist: userName,
    profileUrl: userProfileUrl,
    comment: myComment,
    token: token,
    feedid: detail.id,
    modifiedAt: currentTime,
    }));
    
  }


  //go to Edit
  const GoEdit = () => {
    navigate(`/edit/${params.id}`, {state: detail});
  }

  //delete this post
  const GoDelete = () => { 

  if(window.confirm("삭제하시겠습니까?")) {
    axios.delete(`${SERVER_URL}/feeds/${params.id}`,{
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
  } 
  }

  const ClickEmptyHeart =()=>{
    dispatch(likeSong({
      token: token,
      feedid: detail.id,
      likeCount: detail.likeCount,
      isLiked:detail.flag,
    }))
  }

  const ClickFilledHeart =()=>{
    dispatch(likeSong({
      token: token,
      feedid: detail.id,
      likeCount: detail.likeCount,
      isLiked:detail.flag,
    }))
  }
  
  return (
    <div className="detail-container">
{/* MUSIC DETAIL AREA */}      
      {loading? (
        <div className="spinner-wrap">
          <BeatLoader color={"grey"} loading={loading} size={10}/>
        </div>
      ):(
      <>
        <section className="music-detail">
        {userName === detail.artist ?  (
            <>
            {/***** 임시 버튼 *****/}
          <div className="go-edit" onClick={GoEdit}>수정</div>
          <div className="go-delete" onClick={GoDelete}>삭제</div>
          {/***** 임시 버튼 *****/}
          </>
          )
        
        : null}
        
          <div className="left-column">
            <img
            className="detail-album-art" 
            alt="better off alone"
            src={detail.albumImageUrl}
            />
            <div 
            className="detail-artist-profile"
            onClick={()=>{
              navigate(`/userpage/${detail.artist}`)
            }}>
              <img 
              className="detail-artist-img"
              alt={detail.artist}
              src={detail.profileUrl}
              />
              <p className="detail-artist">
              {detail.artist}
              </p>
            </div>
          </div>
          <div className="right-column">
            
            <Waveform 
              songUrl={detail.songUrl} 
              title={detail.title}
              loading={loading}/>
            
            <div className="flex-wrap">
              {detail.flag===false? 
              <FaRegHeart
              onClick={
                ClickEmptyHeart
              }/> 
              : <FaHeart
              onClick={
                ClickFilledHeart
              }
              />}
              <p className="detail-like">{detail.likeCount}</p>
            </div>
            <p className="detail-song-detail">
              {detail.description} <br/>
              곡을 소개해주세요. 곡을 소개하는 부분입니다.<br/>
              소개글이 길어지면 이렇게 ellipsis처리가 될거에요<br/>
              곡을 소개하는 부분입니다.<br/>
              곡을 소개하는 부분입니다.
            </p>
            <p className="detail-more-detail">
            더보기
            </p>
            
          </div>
        </section>
      </>

      )}
        <div className="divider"></div>
{/* COMMENT AREA */}
      {loading? (
        <div className="spinner-wrap">
          <BeatLoader color={"grey"} loading={loading} size={10}/>
        </div>
      ):(
        <section className="music-comment">
          <p className="detail-info-title">
          댓글 <span className="spangrey">{commentsList&&commentsList.length}</span>
          </p> 

          <div className="comment-input-wrap">
            <img 
            className="detail-artist-img-sm"
            alt={userName?userName: "noUser"}
            src={userProfileUrl? userProfileUrl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF_h6thkbe0oON25G45kdMJU4UDYyC-1hDLK7uFobW9vL0__oa"}
            />
            <input 
            className="comment-input"
            type="text"  
            placeholder="댓글을 입력해주세요."
            value={myComment}
            onChange={(e)=>{
             setMyComment(e.target.value)
           }}
            />
            <button 
            className="btn btn-primary"
            onClick={()=>{
              addNewComment();
              setMyComment("");
            }}>
            등록
            </button>
          </div>
          <div className="all-comments">
            {commentsList&&commentsList.map((comment,index)=>{
              return(
                <div className="comment-wrap">
                  <img 
                  className="detail-artist-img-sm"
                  alt={comment.artist}
                  src={comment.profileUrl}
                  />
                  <div className="column-wrap">
                    <EditComment comment={comment} token={token} feedid={detail.id} username={userName}/>
                    

                  </div>
                </div>
              )
            })}
            
          </div>
        </section>  
      )}
      
    </div>
  )
}

export default Detail;
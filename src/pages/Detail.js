import React, { useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {getSongDetail} from "../redux/modules/songSlice"

import {FaRegHeart, FaHeart, FaPlayCircle} from "react-icons/fa";
import {BiPlus} from "react-icons/bi"

import ClipLoader from "react-spinners/ClipLoader";

function Detail() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let params = useParams();

    useEffect(()=>{
    const token = localStorage.getItem("token");
    console.log(token);
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

  const detail = useSelector((state)=> state.Song.detail);
  const comments = useSelector((state)=> state.Song.comments);
  console.log(loading);
  console.log(detail);
  console.log(comments)

  return (
    <div className="detail-container">
      {loading? (
        <div className="spinner-wrap">
          <ClipLoader color={"grey"} loading={loading} size={35}/>
        </div>
      ):(
      <>
        <section className="music-detail">
          <div className="left-column">
            <img
            className="detail-album-art" 
            alt="better off alone"
            src={detail.albumImageUrl}
            />
            <div className="detail-artist-profile">
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
            <div className="detail-info-wrap">
              <div className="flex-wrap">
                <FaPlayCircle/>
                <p className="detail-info-title">{detail.title}</p>
              </div> 
              <button className="add-playlist btn">
              <span><BiPlus/></span> 플레이리스트 추가
              </button>
            </div>
            <div className="detail-wavefom">
            </div>
            <div className="flex-wrap">
              {detail.flag===false? <FaRegHeart/> : <FaHeart/>}
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

      {loading? (
        <div className="spinner-wrap">
          <ClipLoader color={"grey"} loading={loading} size={35}/>
        </div>
      ):(
        <section className="music-comment">
          <p className="detail-info-title">
          댓글 <span className="spangrey">3</span>
          </p> 

          <div className="comment-input-wrap">
            <img 
            className="detail-artist-img-sm"
            alt='Rxbyn'
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF_h6thkbe0oON25G45kdMJU4UDYyC-1hDLK7uFobW9vL0__oa"
            />
            <input 
            className="comment-input"
            type="text"  
            placeholder="댓글을 입력해주세요."
            />
            <button className="btn btn-primary">
            등록
            </button>
          </div>
          <div className="all-comments">
            <div className="comment-wrap">
              <img 
              className="detail-artist-img-sm"
              alt='Rxbyn'
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF_h6thkbe0oON25G45kdMJU4UDYyC-1hDLK7uFobW9vL0__oa"
              />
              <div className="row-wrap">
                <p className="comment-writer">
                닉네임<span className="spantime">2시간 전</span>
                </p>
                <p className="comment-text">
                댓글 내용이 들어갑니다. 곡이 너무 좋아요 ~!
                </p>
              </div>
            </div>
            <div className="comment-wrap">
              <img 
              className="detail-artist-img-sm"
              alt='Rxbyn'
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF_h6thkbe0oON25G45kdMJU4UDYyC-1hDLK7uFobW9vL0__oa"
              />
              <div className="row-wrap">
                <p className="comment-writer">
                닉네임<span className="spantime">2시간 전</span>
                </p>
                <p className="comment-text">
                댓글 내용이 들어갑니다. 곡이 너무 좋아요 ~!
                </p>
              </div>
            </div>
            <div className="comment-wrap">
              <img 
              className="detail-artist-img-sm"
              alt='Rxbyn'
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF_h6thkbe0oON25G45kdMJU4UDYyC-1hDLK7uFobW9vL0__oa"
              />
              <div className="row-wrap">
                <p className="comment-writer">
                닉네임<span className="spantime">2시간 전</span>
                </p>
                <p className="comment-text">
                댓글 내용이 들어갑니다. 곡이 너무 좋아요 ~!
                </p>
              </div>
            </div>
          </div>
        </section>  
      )}
      
    </div>
  )
}

export default Detail;
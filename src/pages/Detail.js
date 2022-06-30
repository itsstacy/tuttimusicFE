import React from 'react';
import {FaRegHeart, FaHeart, FaPlayCircle} from "react-icons/fa";
import {BiPlus} from "react-icons/bi"

function Detail() {
  return (
    <div className="detail-container">
      <section className="music-detail">
        <div className="left-column">
          <img
          className="detail-album-art" 
          alt="better off alone"
          src="https://usercontent.jamendo.com/?type=album&id=472284&width=300&trackid=1921816"
          />
          <div className="detail-artist-profile">
            <img 
            className="detail-artist-img"
            alt='Rxbyn'
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF_h6thkbe0oON25G45kdMJU4UDYyC-1hDLK7uFobW9vL0__oa"
            />
            <p className="detail-artist">
            Rxbyn
            </p>
          </div>
        </div>
        <div className="right-column">
          <div className="detail-info-wrap">
            <p className="detail-info-title">
            <span><FaPlayCircle/></span> 곡명
            </p> 
            <button className="add-playlist btn">
            <span><BiPlus/></span> 플레이리스트 추가
            </button>
          </div>
          <div className="detail-wavefom">
          </div>
          <p className="detail-like">
          <span><FaRegHeart/></span> 175  
          </p>
          <p className="detail-song-detail">
          곡을 소개하는 부분입니다. <br/>
          곡을 소개해주세요. 곡을 소개하는 부분입니다.<br/>
          곡을 소개하는 부분입니다. 곡을 소개하는 부분입니다. 곡을 소개하는 부분입니다.<br/>
          곡을 소개하는 부분입니다.<br/>
          곡을 소개하는 부분입니다.
          </p>
          <p className="detail-more-detail">
          더보기
          </p>
          
        </div>
      </section>
      <div className="divider"></div>
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
    </div>
  )
}

export default Detail;
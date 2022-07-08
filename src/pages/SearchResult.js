import React from 'react'
import { useSelector } from "react-redux";
import {useLocation} from 'react-router-dom';
import { useNavigate } from "react-router-dom";

function SearchResult() {
  const navigate = useNavigate();
  const location = useLocation();
  const keyword= location.state

    const artistList = useSelector((state)=> state.Song.result_artist)
    const titleList = useSelector((state)=> state.Song.result_title)
    console.log(titleList)
    console.log(artistList) 


  return (
    <div className="musicfeed-container">
      <p className="search-head"><span className="bold">
        '{keyword}'</span>에 대한 검색 결과입니다.
      </p>
      <p className="result-name">
        곡명
      </p>
      <p className="result-sub-name">
        곡명으로 검색
      </p>
      {titleList&&titleList.length > 0 ?
      <>
        <section className="feed-list">
          {titleList.map((song,index)=>{
          return(
          <div 
          className="feed-card"
          onClick={()=>{
            navigate('/detail/'+song.id)
          }}>
            <img
            alt={song.title}
            className="main-album-art" 
            src={song.albumImageUrl}
            />
            <div className="main-card-text">
              <p className="main-card-title">
              {song.title}
              </p>
              <p className="main-card-artist">
              {song.userArtist}
              </p>
            </div>
          </div>
          )
          })
          }
        </section> 
        
      </>
      :
      <>
        <section className="feed-list">
        <p className="result-none">
          매칭하는 곡명이 없어요.
        </p>
        </section>
      </>
      }

      <p className="result-sub-name">
        아티스트명으로 검색
      </p>
      {artistList&&artistList.length > 0 ?
        <>
          <section className="feed-list">
            {artistList.map((song,index)=>{
            return(
            <div 
            className="feed-card"
            onClick={()=>{
              navigate('/detail/'+song.id)
            }}>
              <img
              alt={song.title}
              className="main-album-art" 
              src={song.albumImageUrl}
              />
              <div className="main-card-text">
                <p className="main-card-title">
                {song.title}
                </p>
                <p className="main-card-artist">
                {song.userArtist}
                </p>
              </div>
            </div>
            )
            })
            }
          </section> 
        </>
        :
        <>
          <section className="feed-list">
          <p className="result-none">
            매칭하는 아티스트가 없어요.
          </p>
          </section>
        </>
        }

      <p className="result-name">
        영상
      </p>
      <p className="result-sub-name">
        곡명으로 검색
      </p>
      {titleList&&titleList.length > 0 ?
      <>
        <section className="feed-list">
          {titleList.map((song,index)=>{
          return(
          <div 
          className="feed-card"
          onClick={()=>{
            navigate('/detail/'+song.id)
          }}>
            <img
            alt={song.title}
            className="main-album-art" 
            src={song.albumImageUrl}
            />
            <div className="main-card-text">
              <p className="main-card-title">
              {song.title}
              </p>
              <p className="main-card-artist">
              {song.userArtist}
              </p>
            </div>
          </div>
          )
          })
          }
        </section> 
        
      </>
      :
      <>
        <section className="feed-list">
        <p className="result-none">
          매칭하는 곡명이 없어요.
        </p>
        </section>
      </>
      }

      <p className="result-sub-name">
        아티스트명으로 검색
      </p>
      {artistList&&artistList.length > 0 ?
        <>
          <section className="feed-list">
            {artistList.map((song,index)=>{
            return(
            <div 
            className="feed-card"
            onClick={()=>{
              navigate('/detail/'+song.id)
            }}>
              <img
              alt={song.title}
              className="main-album-art" 
              src={song.albumImageUrl}
              />
              <div className="main-card-text">
                <p className="main-card-title">
                {song.title}
                </p>
                <p className="main-card-artist">
                {song.userArtist}
                </p>
              </div>
            </div>
            )
            })
            }
          </section> 
        </>
        :
        <>
          <section className="feed-list">
          <p className="result-none">
            매칭하는 아티스트가 없어요.
          </p>
          </section>
        </>
        }
    </div>
  )
}

export default SearchResult;
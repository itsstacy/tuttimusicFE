import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import {useLocation} from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function SearchResult() {
  const navigate = useNavigate();
  const location = useLocation();
  const keyword= location.state
  const [data, setData] =useState(null);
  const [type, setType] =useState(null);
  const [subtype, setSubtype] =useState(null);
  
  const token = localStorage.getItem("token");

  useEffect(()=>{
    setData(null);
  },[keyword])

    const musicArtist = useSelector((state)=> state.Song.result_musicArtist)
    const musicTitle = useSelector((state)=> state.Song.result_musicTitle)
    const videoArtist = useSelector((state)=> state.Song.result_videoArtist)
    const videoTitle = useSelector((state)=> state.Song.result_videoTitle)

    const list1= musicTitle?.filter((item, index) => {
        return index <6;
      })
    const list2= musicArtist?.filter((item, index) => {
        return index <6;
      })
    const list3= videoTitle?.filter((item, index) => {
        return index <4;
      })
    const list4= videoArtist?.filter((item, index) => {
        return index <4;
      })

    const moreResultsClick =(props)=> {
      console.log(props)
      axios
      .get(`https://seyeolpersonnal.shop/search/more?category=${props}&keyword=${keyword}`, {
        headers: {Authorization:token? token:""}
      })
      .then((response)=>{
        setData(response.data.results)
        console.log(response.data.results)
      })
      .catch((error)=>{
        console.log(error)
      })
    }

  return (
    
    <div className="musicfeed-container">
      {data?
      <>
        <p className="search-head"><span className="bold">
        '{keyword}'</span>에 대한 {type}: {subtype}으로 검색한 결과입니다.
        </p>
        
        <p 
        className="more-results right-text"
        onClick={()=>{
          setData(null);
        }}
        >
          전체 검색 결과로 돌아가기
        </p>
      

        {type === "곡"?
          <section className="feed-list">
            {data.map((song,index)=>{
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
                {song.artist}
                </p>
              </div>
            </div>
            )
            })
            }
        </section>
        :
        <section className="feed-list">
            {data.map((song,index)=>{
            return(
            <div 
            className="video-card"
            onClick={()=>{
              navigate('/detail/'+song.id)
            }}>
              <img
              alt={song.title}
              className="main-thumbnail" 
              src={song.albumImageUrl}
              />
              <div className="main-card-text">
                <p className="main-card-title">
                {song.title}
                </p>
                <p className="main-card-artist">
                {song.artist}
                </p>
              </div>
            </div>
            )
            })
            }
          </section>
        }
      </>
      :
      <>
      <p className="search-head"><span className="bold">
        '{keyword}'</span>에 대한 검색 결과입니다.
      </p>
      <p className="result-name">
        곡
      </p>
      <div className="search-flex">
        <p className="result-sub-name">
          곡명으로 검색
        </p>
        {musicTitle&&musicTitle.length > 6 ?
        <p 
        className="more-results"
        onClick={()=>{
          moreResultsClick("musicTitle")
          setType("곡")
          setSubtype("곡명")
        }}
        >
          더보기
        </p>
        : null}
      </div> 
      {musicTitle&&musicTitle.length > 0 ?
      <>
        <section className="feed-list">
          
          {list1.map((song,index)=>{
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
              {song.artist}
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

      <div className="search-flex">
        <p className="result-sub-name">
          아티스트명으로 검색
        </p>
        {musicArtist&&musicArtist.length > 6 ?
        <p 
        className="more-results"
        onClick={()=>{
          moreResultsClick("musicArtist")
          setType("곡")
          setSubtype("아티스트명")
        }}
        >
          더보기
        </p>
        : null}
      </div> 
      {musicArtist&&musicArtist.length > 0 ?
        <>
          <section className="feed-list">
            {list2.map((song,index)=>{
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
                {song.artist}
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
      <div className="search-flex">
        <p className="result-sub-name">
          곡명으로 검색
        </p>
        {videoTitle&&videoTitle.length > 6 ?
        <p 
        className="more-results"
        onClick={()=>{
          moreResultsClick("videoTitle")
          setType("영상")
          setSubtype("곡명")
        }}
        >
          더보기
        </p>
        : null}
      </div> 
      {videoTitle&&videoTitle.length > 0 ?
      <>
        <section className="feed-list">
          {list3.map((song,index)=>{
          return(
          <div 
          className="video-card"
          onClick={()=>{
            navigate('/detail/'+song.id)
          }}>
            <img
            alt={song.title}
            className="main-thumbnail" 
            src={song.albumImageUrl}
            />
            <div className="main-card-text">
              <p className="main-card-title">
              {song.title}
              </p>
              <p className="main-card-artist">
              {song.artist}
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

    <div className="search-flex">
        <p className="result-sub-name">
          아티스트명으로 검색
        </p>
        {videoArtist&&videoArtist.length > 6 ?
        <p 
        className="more-results"
        onClick={()=>{
          moreResultsClick("videoArtist")
          setType("영상")
          setSubtype("아티스트명")
        }}
        >
          더보기
        </p>
        : null}
      </div> 
      {videoArtist&&videoArtist.length > 0 ?
        <>
          <section className="feed-list">
            {list4.map((song,index)=>{
            return(
            <div 
            className="video-card"
            onClick={()=>{
              navigate('/detail/'+song.id)
            }}>
              <img
              alt={song.title}
              className="main-thumbnail" 
              src={song.albumImageUrl}
              />
              <div className="main-card-text">
                <p className="main-card-title">
                {song.title}
                </p>
                <p className="main-card-artist">
                {song.artist}
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
      </>
      }
    </div>
  )
}

export default SearchResult;
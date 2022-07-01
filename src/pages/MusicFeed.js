import React, { useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {getMusicFeed} from "../redux/modules/songSlice"

import BeatLoader from "react-spinners/BeatLoader";


function MusicFeed() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(()=>{
    const token = localStorage.getItem("token");
    setLoading(true);
    dispatch(getMusicFeed(token));
    setTimeout(()=> {
      setLoading(false);
    },100)
    window.scrollTo(0,0);
  },[])

  const allList = useSelector((state) => state.Song.allList);
  console.log(allList);

  return (
    <div className="musicfeed-container">
      <section className="feed-category">
        <p className="genre-text">
          장르
        </p>
        <div className="categories">
          <div className="category">
            발라드
          </div>
          <div className="category">
            어쿠스틱
          </div>
          <div className="category">
            알앤비
          </div>
          <div className="category">
            힙합
          </div>
          <div className="category">
            댄스
          </div>
          <div className="category">
            연주곡
          </div>
        </div>

      </section>

      <section className="feed-list">

        {loading? (
          <div className="spinner-wrap">
          <BeatLoader color={"grey"} loading={loading} size={10}/>
        </div>
        ):(
          <>{allList&&allList.map((song,index)=>{
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
            })}
          </>
        )}
       
      </section>
    
    </div>
  )
}

export default MusicFeed;
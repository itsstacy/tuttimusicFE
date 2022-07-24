import React, { useCallback, useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {getMusicFeed} from "../redux/modules/songSlice";

import BeatLoader from "react-spinners/BeatLoader";

import { useInView } from 'react-intersection-observer';



function MusicFeed() {
  const [loading, setLoading] = useState(true);
  const [_type, setType] = useState("audio");
  const [_genre, setGenre] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");


  const [ref, inView] = useInView();

  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(24)
  const [isLoding, setIsLoding] = useState(false);
  

  useEffect(()=>{
    setLimit(24)
    setLoading(true);
    
    const data= {
      token:token,
      type: _type,
      genre: _genre?_genre:"",
      page:page,
      limit:24,
    }
    console.log(data);
    dispatch(getMusicFeed(data));
    setTimeout(()=> {
      setLoading(false);
    },100)
    window.scrollTo(0,0);
  },[_type,_genre])


  const allList = useSelector((state) => state.Song.allList);
  console.log(allList)
  const [totalList, setTotalList] = useState(null)

  useEffect(() => {
    if (allList) {
      setTotalList(allList);
    }
    if (inView && !isLoding) {
      // setPage(page + 1)
      setLimit((prev)=> prev + 18)
      console.log(limit)
      const data= {
        token:token,
        type: _type,
        genre: _genre?_genre:"",
        page:page,
        limit:limit,
      }
      dispatch(getMusicFeed(data))
      console.log(page)
      // setTotalList(totalList, allList)
      console.log("추가된 리스트", totalList)
    }
  }, [inView])



  //    const ClickType =(props)=>{
  //     setGenre(null);
  //     setTotalList(null)
    // if (props ==="오디오"){
    //   setType("audio");
    // } 
    // if (props ==="영상"){
    //   setType("video");
    // } 

    
  //   console.log(_type);
  //     const data2= {
  //       token: token,
  //       type: props,
  //       genre: "",
  //       page:1,
  //       limit:12,
  //     }
  //     dispatch(getMusicFeed(data2))
  //   }

  // const ClickGenre =(props)=>{
  //   const data3= {
  //     token: token,
  //     type: _type,
  //     genre: props,
  //     page:1,
  //     limit:12,
  //   }
  //   dispatch(getMusicFeed(data3))
  // }

  const typeList =[
    {type: "오디오", eng: "audio"},
    {type: "영상", eng: "video"},
  ]
  
  const genreList = [
    {genre: "발라드",
    postGenre: "발라드"},
    {genre: "어쿠스틱",
    postGenre: "어쿠스틱"},
    {genre: "R&B",
    postGenre: "R%26B"},
    {genre: "힙합",
    postGenre: "힙합"},
    {genre: "댄스",
    postGenre: "댄스"},
    {genre: "연주곡",
    postGenre: "연주곡"},
  ]

  const [typeBtn, setTypeBtn] = useState(0);
  const [genreBtn, setGenreBtn] = useState(false);

  return (
    <div className="musicfeed-container">
      <section className="feed-category">
        <p className="genre-text">
          유형
        </p>
        <div className="categories">
          {typeList.map((type,index)=>{
            return (
            <div 
            value={index}
            className={`category ${index === typeBtn ? `click-category` : ''}`}
            onClick={()=>{
              setType(type.eng)
              // ClickType(type.eng)
              setGenre(null)
              setPage(1)
              setTypeBtn(index)
              setGenreBtn(null)
            }}>
            {type.type}
          </div>
            )
          })}
        </div>
      </section>
      <section className="feed-category">
        <p className="genre-text">
          장르
        </p>
        <div className="categories">
          {genreList.map((genre,index)=>{
            return (
            <div 
            value={index}
            className={`category ${index === genreBtn ? `click-category` : ''}`}
            onClick={()=>{
              setGenre(genre.postGenre)
              setPage(1)
              // ClickGenre(genre.postGenre)
              setGenreBtn(index)
            }}>
            {genre.genre}
          </div>
            )
          })}
        </div>

      </section>

      <section className="feed-list">

        {loading? (
          <div className="spinner-wrap">
          <BeatLoader color={"grey"} loading={loading} size={10}/>
        </div>
        ):_type === "audio" ?

        (
          <>{allList&&allList.map((song,index)=>{
              return(
                <div 
                className="feed-card"
                onClick={()=>{
                  navigate('/detail/'+song.id)
                }}>
                  <div className="musicfeed-album-box">
                  <img
                  alt={song.title}
                  className="main-album-art musicfeed-album-art" 
                  src={song.albumImageUrl}
                  />
                  </div>
                  <div className="main-card-text musicfeed-card-text">
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
        )
        :
        (
          <>{allList&&allList.map((song,index)=>{
              return(
                <div 
                className="video-card musicfeed-video-card"
                onClick={()=>{
                  navigate('/detail/video/'+song.id)
                }}>
                  <div className="musicfeed-thumbnail-box">
                  <img
                  alt={song.title}
                  className="main-thumbnail musicfeed-thumbnail" 
                  src={song.albumImageUrl}
                  />
                  </div>
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
        )
      
      }
      <div ref={ref}></div>
      </section>
    
    </div>
  )
}

export default MusicFeed;
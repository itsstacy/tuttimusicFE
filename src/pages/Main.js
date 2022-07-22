import React, { useEffect, useState} from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { useNavigate } from "react-router-dom";

import {getMainLists} from "../redux/modules/songSlice"

import Slider from "react-slick";
import "../styles/slick.css";
import "../styles/slick-theme.css";

import BeatLoader from "react-spinners/BeatLoader";


function Main() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(()=>{
    const token= localStorage.getItem("token");
    dispatch(getMainLists(token));
    setTimeout(()=> {
      setLoading(false);
    },200)
    window.scrollTo(0,0);

  },[])

  const [genreList, latestList,likeList, videoList] = useSelector((state) => [
    state.Song.genreList,
    state.Song.latestList,
    state.Song.likeList,
    state.Song.videoList
  ])

  console.log(genreList);
  console.log(latestList);
  console.log(videoList);
  
  // slider
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "transparent" }}
        onClick={onClick}
      />
    );
  }
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "transparent" }}
        onClick={onClick}
      />
    );
  }

  // slider settings
  let settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows: true,
    // variableWidth: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    // autoplay: true,
    // autoplaySpeed: 3500,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          dots: false,
          infinite: true,
          speed: 500,
          slidesToShow: 3,
          slidesToScroll: 1,
          arrows: true,
          nextArrow: <SampleNextArrow />,
          prevArrow: <SamplePrevArrow />,
        }
      }
    ]
  };

  // slider settings ->video
  let settings2 = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    // variableWidth: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    // autoplay: true,
    // autoplaySpeed: 3500,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          dots: false,
          infinite: true,
          speed: 500,
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: true,
          nextArrow: <SampleNextArrow />,
          prevArrow: <SamplePrevArrow />,
        }
      }
    ]
  };


  return (
    <div className="main-container">
      <section className="main-top">
        <div className="main-top-header">
        </div>
      </section>
      <section className="main-content">
        <div className="main-list">
          <p className="main-list-title">
            최근 출시한 음악
          </p>
          {loading? (
            <div className="spinner-wrap">
              <BeatLoader color={"grey"} loading={loading} size={10}/>
            </div>
          ):(
            <Slider {...settings}>     
            {latestList&&latestList.map((song,index) =>{
              return(
                <div 
                className="main-card"
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
              </Slider>
              )}
          
        </div>
        <div className="main-list">
          <p className="main-list-title">
            좋아요 많이 받은 음악
          </p>
          {loading? (
            <div className="spinner-wrap">
              <BeatLoader color={"grey"} loading={loading} size={10}/>
            </div>
          ):(
            <Slider {...settings}>     
            {likeList&&likeList.map((song,index) =>{
              return(
                <div 
                className="main-card"
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
              </Slider>
              )}          
        </div>
        <div className="main-list">

          <div className="main-list-header">
          <p className="main-list-title">
            장르 음악
          </p>
          <p className="main-list-subtitle">
            {/* {loading ? null : genreList[0].genre} */}
            {genreList&&genreList ? genreList[0].genre : null}
          </p>
          </div>
          {loading? (
            <div className="spinner-wrap">
              <BeatLoader color={"grey"} loading={loading} size={10}/>
            </div>
          ): genreList&&genreList.length < 6?
          (
            <div className="row-wrap-left">
            {genreList&&genreList.map((song,index) =>{
              return(
                <div 
                className="main-card"
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
            </div>
          ):(

            <Slider {...settings}>     
            {genreList&&genreList.map((song,index) =>{
              return(
                <div 
                className="main-card"
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
              </Slider>
              )}
        </div>
        <div className="main-list">
          <p className="main-list-title">
            영상
          </p>
          {loading? (
            <div className="spinner-wrap">
              <BeatLoader color={"grey"} loading={loading} size={10}/>
            </div>
          ): videoList&&videoList.length < 4?
          (
          <div className="row-wrap-left">
            {videoList.map((song,index) =>{
              return(
                
                  <div 
                  className="video-card"
                  onClick={()=>{
                    navigate('/detail/video/'+song.id)
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
          </div>           
          ):
          (
            <Slider {...settings2}>     
            {loading ===false&&videoList&&videoList.map((song,index) =>{
              return(
                <div 
                className="video-card"
                onClick={()=>{
                  navigate('/detail/video/'+song.id)
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
                })}               
              </Slider>
              )}
        </div>
        
      </section>
    </div>
  )
}

export default Main;
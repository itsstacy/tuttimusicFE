import React from 'react';

import Slider from "react-slick";
import "../styles/slick.css";
import "../styles/slick-theme.css";

function Main() {

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

  let settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows: true,
    // variableWidth: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
    // autoplay: true,
    // autoplaySpeed: 3500,
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
          <Slider {...settings}>        
            <div className="main-card">
              <img
              className="main-album-art" 
              src="https://usercontent.jamendo.com/?type=album&id=472284&width=300&trackid=1921816"
              />
              <div className="main-card-text">
                <p className="main-card-title">
                better off alone
                </p>
                <p className="main-card-artist">
                RXBYN
                </p>
              </div>
            </div>
            <div className="main-card">
              <img
              className="main-album-art" 
              src="https://usercontent.jamendo.com/?type=album&id=472284&width=300&trackid=1921816"
              />
              <div className="main-card-text">
                <p className="main-card-title">
                better off alone
                </p>
                <p className="main-card-artist">
                RXBYN
                </p>
              </div>
            </div>
            <div className="main-card">
              <img
              className="main-album-art" 
              src="https://usercontent.jamendo.com/?type=album&id=472284&width=300&trackid=1921816"
              />
              <div className="main-card-text">
                <p className="main-card-title">
                better off alone
                </p>
                <p className="main-card-artist">
                RXBYN
                </p>
              </div>
            </div>
            <div className="main-card">
              <img
              className="main-album-art" 
              src="https://usercontent.jamendo.com/?type=album&id=472284&width=300&trackid=1921816"
              />
              <div className="main-card-text">
                <p className="main-card-title">
                better off alone
                </p>
                <p className="main-card-artist">
                RXBYN
                </p>
              </div>
            </div><div className="main-card">
              <img
              className="main-album-art" 
              src="https://usercontent.jamendo.com/?type=album&id=472284&width=300&trackid=1921816"
              />
              <div className="main-card-text">
                <p className="main-card-title">
                better off alone
                </p>
                <p className="main-card-artist">
                RXBYN
                </p>
              </div>
            </div>

            <div className="main-card">
              <img
              className="main-album-art" 
              src="https://usercontent.jamendo.com/?type=album&id=472284&width=300&trackid=1921816"
              />
              <div className="main-card-text">
                <p className="main-card-title">
                better off alone
                </p>
                <p className="main-card-artist">
                RXBYN
                </p>
              </div>
            </div>
            <div className="main-card">
              <img
              className="main-album-art" 
              src="https://usercontent.jamendo.com/?type=album&id=472284&width=300&trackid=1921816"
              />
              <div className="main-card-text">
                <p className="main-card-title">
                better off alone
                </p>
                <p className="main-card-artist">
                RXBYN
                </p>
              </div>
            </div>
           
          </Slider>
        </div>
        <div className="main-list">
          <p className="main-list-title">
            좋아요 많이 받은 음악
          </p>
          <Slider {...settings}>        
            <div className="main-card">
              <img
              className="main-album-art" 
              src="https://usercontent.jamendo.com/?type=album&id=472284&width=300&trackid=1921816"
              />
              <div className="main-card-text">
                <p className="main-card-title">
                better off alone
                </p>
                <p className="main-card-artist">
                RXBYN
                </p>
              </div>
            </div>
            <div className="main-card">
              <img
              className="main-album-art" 
              src="https://usercontent.jamendo.com/?type=album&id=472284&width=300&trackid=1921816"
              />
              <div className="main-card-text">
                <p className="main-card-title">
                better off alone
                </p>
                <p className="main-card-artist">
                RXBYN
                </p>
              </div>
            </div>
            <div className="main-card">
              <img
              className="main-album-art" 
              src="https://usercontent.jamendo.com/?type=album&id=472284&width=300&trackid=1921816"
              />
              <div className="main-card-text">
                <p className="main-card-title">
                better off alone
                </p>
                <p className="main-card-artist">
                RXBYN
                </p>
              </div>
            </div>
            <div className="main-card">
              <img
              className="main-album-art" 
              src="https://usercontent.jamendo.com/?type=album&id=472284&width=300&trackid=1921816"
              />
              <div className="main-card-text">
                <p className="main-card-title">
                better off alone
                </p>
                <p className="main-card-artist">
                RXBYN
                </p>
              </div>
            </div><div className="main-card">
              <img
              className="main-album-art" 
              src="https://usercontent.jamendo.com/?type=album&id=472284&width=300&trackid=1921816"
              />
              <div className="main-card-text">
                <p className="main-card-title">
                better off alone
                </p>
                <p className="main-card-artist">
                RXBYN
                </p>
              </div>
            </div>

            <div className="main-card">
              <img
              className="main-album-art" 
              src="https://usercontent.jamendo.com/?type=album&id=472284&width=300&trackid=1921816"
              />
              <div className="main-card-text">
                <p className="main-card-title">
                better off alone
                </p>
                <p className="main-card-artist">
                RXBYN
                </p>
              </div>
            </div>
            <div className="main-card">
              <img
              className="main-album-art" 
              src="https://usercontent.jamendo.com/?type=album&id=472284&width=300&trackid=1921816"
              />
              <div className="main-card-text">
                <p className="main-card-title">
                better off alone
                </p>
                <p className="main-card-artist">
                RXBYN
                </p>
              </div>
            </div>
           
          </Slider>
        </div>
        <div className="main-list">
          <p className="main-list-title">
            장르 음악
          </p>
          <Slider {...settings}>        
            <div className="main-card">
              <img
              className="main-album-art" 
              src="https://usercontent.jamendo.com/?type=album&id=472284&width=300&trackid=1921816"
              />
              <div className="main-card-text">
                <p className="main-card-title">
                better off alone
                </p>
                <p className="main-card-artist">
                RXBYN
                </p>
              </div>
            </div>
            <div className="main-card">
              <img
              className="main-album-art" 
              src="https://usercontent.jamendo.com/?type=album&id=472284&width=300&trackid=1921816"
              />
              <div className="main-card-text">
                <p className="main-card-title">
                better off alone
                </p>
                <p className="main-card-artist">
                RXBYN
                </p>
              </div>
            </div>
            <div className="main-card">
              <img
              className="main-album-art" 
              src="https://usercontent.jamendo.com/?type=album&id=472284&width=300&trackid=1921816"
              />
              <div className="main-card-text">
                <p className="main-card-title">
                better off alone
                </p>
                <p className="main-card-artist">
                RXBYN
                </p>
              </div>
            </div>
            <div className="main-card">
              <img
              className="main-album-art" 
              src="https://usercontent.jamendo.com/?type=album&id=472284&width=300&trackid=1921816"
              />
              <div className="main-card-text">
                <p className="main-card-title">
                better off alone
                </p>
                <p className="main-card-artist">
                RXBYN
                </p>
              </div>
            </div><div className="main-card">
              <img
              className="main-album-art" 
              src="https://usercontent.jamendo.com/?type=album&id=472284&width=300&trackid=1921816"
              />
              <div className="main-card-text">
                <p className="main-card-title">
                better off alone
                </p>
                <p className="main-card-artist">
                RXBYN
                </p>
              </div>
            </div>

            <div className="main-card">
              <img
              className="main-album-art" 
              src="https://usercontent.jamendo.com/?type=album&id=472284&width=300&trackid=1921816"
              />
              <div className="main-card-text">
                <p className="main-card-title">
                better off alone
                </p>
                <p className="main-card-artist">
                RXBYN
                </p>
              </div>
            </div>
            <div className="main-card">
              <img
              className="main-album-art" 
              src="https://usercontent.jamendo.com/?type=album&id=472284&width=300&trackid=1921816"
              />
              <div className="main-card-text">
                <p className="main-card-title">
                better off alone
                </p>
                <p className="main-card-artist">
                RXBYN
                </p>
              </div>
            </div>
           
          </Slider>
        </div>
        
      </section>
    </div>
  )
}

export default Main;
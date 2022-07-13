import React, { useEffect, useState } from 'react';

import BeatLoader from "react-spinners/BeatLoader";

function Tab1(props) {

  const [loading, setLoading] = useState(true);
  const likeList = props.likeList;
  const followingList = props.followingList;
  const uploadList = props.uploadList;
  const likeVideoList = props.likeVideoList;
  const uploadVideoList = props.uploadVideoList;

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 500)

    window.scrollTo(0, 0);
  }, [])


  return (
    <>
      {likeList&&likeList[0] === undefined ? null : (
        <div className='body-like'>
          <p className='body-font'>관심 음악</p>
          {/* 로딩 중 스피너 나오는 부분 */}
          {loading ? (
            <div className="spinner-wrap">
              <BeatLoader color={"grey"} loading={loading} size={10} />
            </div>
          ) : (
            <div className='body-like-list'>
              {
                likeList && likeList.map((song, Index) => {
                  return (
                    <div className='main-card'>
                      <img
                        src={song.albumImageUrl}
                        className='main-album-art'
                        alt={song.title} />
                      <div className="main-card-text">
                        <p className="main-card-title">
                          {song.title}
                        </p>
                        <p className="main-card-artist">
                          {song.artist}
                        </p>
                      </div>
                    </div>
                  );
                })
              }
            </div>
          )}
        </div>
      )}


      {likeVideoList&&likeVideoList[0] === undefined ? null : (
        <div className='body-like'>
          <p className='body-font'>관심 영상</p>
          {/* 로딩 중 스피너 나오는 부분 */}
          {loading ? (
            <div className="spinner-wrap">
              <BeatLoader color={"grey"} loading={loading} size={10} />
            </div>
          ) : (
            <div className='body-like-list'>
              {
                likeVideoList && likeVideoList.map((song, Index) => {
                  return (
                    <div className='mypage-video-card'>
                      <img
                        src={song.albumImageUrl}
                        className='mypage-main-thumbnail'
                        alt={song.title} />
                      <div className="main-card-text">
                        <p className="main-card-title">
                          {song.title}
                        </p>
                        <p className="main-card-artist">
                          {song.artist}
                        </p>
                      </div>
                    </div>
                  );
                })
              }
            </div>
          )}
        </div>
      )}


      {followingList&&followingList[0] === undefined ? null : (
        <div className='body-following'>
          <p className='body-font'>팔로잉</p>
          {loading ? (
            <div className="spinner-wrap">
              <BeatLoader color={"grey"} loading={loading} size={10} />
            </div>
          ) : (
            <div className='body-like-list'>
              {
                followingList && followingList.map((song, index) => {
                  return (
                    <div className='body-following-card'>
                      <img
                        src={song.profileImage}
                        className='body-circle'
                        alt={song.artist} />
                      <p className='body-title'>{song.artist}</p>
                    </div>
                  )
                })
              }
            </div>
          )}

        </div>
      )}


      {uploadList&&uploadList[0] === undefined ? null : (
        <div className='body-like'>
          <p className='body-font'>업로드한 음악</p>
          {loading ? (
            <div className="spinner-wrap">
              <BeatLoader color={"grey"} loading={loading} size={10} />
            </div>
          ) : (
            <div className='body-like-list'>
              {
                uploadList && uploadList.map((song, index) => {
                  return (
                    <div className='main-card'>
                      <img
                        src={song.albumImageUrl}
                        className='main-album-art'
                        alt={song.title} />
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
          )}

        </div>
      )}

      {uploadVideoList&&uploadVideoList[0] === undefined ? null : (
        <div className='body-like'>
          <p className='body-font'>업로드한 영상</p>
          {loading ? (
            <div className="spinner-wrap">
              <BeatLoader color={"grey"} loading={loading} size={10} />
            </div>
          ) : (
            <div className='body-like-list'>
              {
                uploadVideoList && uploadVideoList.map((song, index) => {
                  return (
                    <div className='mypage-video-card'>
                      <img
                        src={song.albumImageUrl}
                        className='mypage-main-thumbnail'
                        alt={song.title} />
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
          )}

        </div>
      )}


    </>
  )
}

export default Tab1;


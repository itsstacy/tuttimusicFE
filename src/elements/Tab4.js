import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { slidesOnLeft } from 'react-slick/lib/utils/innerSliderUtils';

import BeatLoader from "react-spinners/BeatLoader";


function Tab4() {

    const [list, setList] = useState([]);

    const token = localStorage.getItem("token");

    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        setLoading(true);

        axios
        .get("http://52.79.234.195/user/mypage/follows", {
            headers: {Authorization:token? token:""}
        })
        .then((response)=>{
            setList(response.data.data)
            console.log(response.data.data)
        })
        .catch((error)=>{
            console.log(error)
        })
    
        setTimeout(()=> {
            setLoading(false);
        },500)
        window.scrollTo(0,0);
    },[])

    console.log(list)

    return( 
        <>
        {loading===true?
        <div className="spinner-wrap">
            <BeatLoader color={"grey"} loading={loading} size={10}/>
        </div>  
        :list&&list.length === 0 ? 
        <p className='notice-text'>팔로잉하는 아티스트가 없어요 😭</p>
        : 
        list&&list.map((song, Index)=>{
            return(
                <div className='main-card'>
                    <img 
                    src={song.albumImageUrl} 
                    className='main-album-art'
                    alt={song.title}/>
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
        </>
        )
}

export default Tab4;
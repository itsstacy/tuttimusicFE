import React from "react";



const LikeList = (props) => {
    console.log(props)
    return( 
        <>
        {
            props.likeList&&props.likeList.map((song, Index)=>{
                return(
                    <div className='body-card'>
                        <img src={song.albumImageUrl} className='body-card-img'/>
                        <p className='body-title'>{song.title}</p>
                        <p className='body-artist'>{song.artist}</p>
                    </div>
                    );
                })
        } 
        </>
        )
}



export default LikeList;

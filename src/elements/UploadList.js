import React from "react";

const UploadList = (props) => {
    return( 
        <>
        {
            props.uploadList.map((song, index)=>{
                return(
                    <div className='body-card'>
                        <img src={song.albumImageUrl} className='body-card-img'/>
                        <p className='body-title'>{song.title}</p>
                        <p className='body-artist'>{song.artist}</p>
                    </div> 
                )
            })
        }
        </>
        
    )
}

export default UploadList;
import React from "react"

const FollowingList = (props) => {
    console.log(props.followingList)
    return(
        <>
        {
            props.followingList.map((song, index)=>{
                return(
                    <div className='body-following-card'>
                        <img src={song.profileImage} className='body-circle'/>
                        <p className='body-title'>{song.artist}</p>            
                    </div>
                )
            })
        }

        </>
    )
}


export default FollowingList
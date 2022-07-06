import axios from 'axios';
import React, { useEffect, useState } from 'react'

import BeatLoader from "react-spinners/BeatLoader";

function FollowingListTab() {

    const [followingList, setFollowingList] = useState([])

    const token = localStorage.getItem("token");

    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        setLoading(true);

        axios
        .get("http://52.79.234.195/user/mypage/follows", {
            headers: {Authorization:token? token:""}
        })
        .then((response)=>{
            setFollowingList(response.data.data)
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

    return (
    <div>FollowingListTab</div>
    )
}

export default FollowingListTab
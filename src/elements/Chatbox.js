import React, { useEffect, useState } from 'react'
import {over} from 'stompjs';
import SockJS from 'sockjs-client';
import moment from "moment";

var stompClient = null;
const Chatbox = (props) => {
    console.log(props)
    const currentTime = moment().format();
    const [privateChats, setPrivateChats] = useState(new Map());     
    const [publicChats, setPublicChats] = useState([]); 
    const [tab,setTab] =useState("CHATROOM");
    const [userData, setUserData] = useState({
        master: '',
        username: '',
        receivername: '',
        connected: false,
        message: ''
    });

    console.log(publicChats)
    useEffect(()=>{
        connect()
    },[])

    useEffect(() => {
        // setId("nugget")      
        console.log(userData);
    }, [userData]);

    // 유저가 방을 빠져 나올때 connected: false 처리해주기

    // const registerUser=()=>{
    //     connect();
    // }
    // https://15.164.102.62/wss
    const connect =()=>{
        let Sock = new SockJS('http://13.124.152.65/ws');
        stompClient = over(Sock);
        stompClient.connect({},onConnected, onError);
    }

    const onConnected = () => {
        setUserData({...userData,"connected": true, "master": props.streamer, "username": props.subscriber });
        console.log(userData);
        stompClient.subscribe('/chatroom/public'+props.streamer, onMessageReceived);
        userJoin();
    }

    const userJoin=()=>{
        var chatMessage = {
        master: props.streamer,
        senderName: userData.username,
        status:"JOIN"
        };
        stompClient.send("/app/message/"+props.streamer, {}, JSON.stringify(chatMessage));
    }

    const onMessageReceived = (payload)=>{
        var payloadData = JSON.parse(payload.body);
        console.log(payloadData)
        console.log(payloadData.status)
        console.log(privateChats)
        switch(payloadData.status){
            case "JOIN":
                // IF SENDER NAME IS NOT IN PRIVATE CHAT KEY, ADD SENDER NAME AS A KEY
                if(!privateChats.get(payloadData.senderName)){
                    privateChats.set(payloadData.senderName,[]);
                    setPrivateChats(new Map(privateChats));
                }
                break;
            case "MESSAGE":
                publicChats.push(payloadData);
                setPublicChats([...publicChats]);
                break;
        }
    }

    const onError = (err) => {
        console.log(err);
        
    }

    const handleMessage =(event)=>{
        const {value}=event.target;
        setUserData({...userData,"message": value});
    }

    // WHEN PRESS SEND, STATUS CHANGES TO "MESSAGE" 
    // AND PASS ON MESSAGE AND SENDER INFO IN JSON FORM
    // AFTER SENDING MESSAGE TO SERVER, INITIALIZE "MESSAGE" VALUE 
    // TO CLEAR THE INPUT BOX AND GET READY FOR THE NEXT MESSAGE
    const sendValue=()=>{
            if (stompClient) {
            var chatMessage = {
                date: currentTime,
                senderName: userData.username,
                message: userData.message,
                status:"MESSAGE",
                profileImage: "https://media.npr.org/assets/img/2016/03/29/ap_090911089838_sq-3271237f28995f6530d9634ff27228cae88e3440.jpg"
                };
                console.log(chatMessage);
                stompClient.send("/app/message/"+props.streamer, {}, JSON.stringify(chatMessage));
                setUserData({...userData,"message": ""});
            }
    }


    return (
    <div className="container">
        
        {userData.connected?
        <div className="chat-box">

            
            <div className="member-list">
                <ul>
                    <li 
                    onClick={()=>{setTab("CHATROOM")}} 
                    className={`member ${tab==="CHATROOM" && "active"}`}
                    >Chatroom: {props.streamer}
                    </li>                    
                </ul>
            </div>
 
            {/* CHATROOM */}
            {tab==="CHATROOM" && <div className="chat-content">
                <ul className="chat-messages">
                    {publicChats.map((chat,index)=>(
                        <li className={`message ${chat.senderName === userData.username && "self"}`} key={index}>
                            {chat.senderName !== userData.username && 
                            <>
                            <img className='profile-img' src={chat.profileImage} alt={chat.senderName}/>
                            <div className="avatar">{chat.senderName}</div>
                            </>
                            }
                            <div className="message-data">{chat.message}</div>
                            {chat.senderName === userData.username && 
                            <>
                            <img className='profile-img' src={chat.profileImage} alt={chat.senderName}/>
                            <div className="avatar self">{chat.senderName}
                            </div>
                            </>
                            }
                        </li>
                    ))}
                </ul>

                <div className="send-message">
                    <input type="text" className="input-message" placeholder="enter the message" value={userData.message} onChange={handleMessage} /> 
                    <button type="button" className="send-button" onClick={sendValue}>send</button>
                </div>
            </div>}

        </div>
        :
        <div className="register">
            <p>not connected!</p>            
        </div>}
    </div>
    )
}

export default Chatbox;

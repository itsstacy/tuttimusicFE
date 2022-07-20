import React, { useEffect, useState } from 'react'
import {over} from 'stompjs';
import SockJS from 'sockjs-client';
import moment from "moment";
import BeatLoader from "react-spinners/BeatLoader";
import {IoPaperPlane} from "react-icons/io5";
import { IconContext } from "react-icons";

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
        message: ''    });


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
    // http://13.124.152.65/ws

    const connect =()=>{
        let Sock = new SockJS('https://seyeolpersonnal.shop/wss');
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
                profileImage: props.userProfileUrl,
                };
                console.log(chatMessage);
                stompClient.send("/app/message/"+props.streamer, {}, JSON.stringify(chatMessage));
                setUserData({...userData,"message": ""});
            }
    }


    return (
    <div>
        
        {userData.connected?
        <div>
 
            {/* CHATROOM */}
            {tab==="CHATROOM" && <div className="chat-content">
            <div id="live-chat-title">실시간 채팅</div>
                <div className="live-chat-list">
                    <p className="welcome-message">welcome to {props.streamer}'s live music! 😊🎵 </p>
                    <ul className="chat-messages">
                        {publicChats.map((chat,index)=>(
                            <li className={`message ${chat.senderName === userData.username && "self"}`} key={index}>                               
                                    {chat.senderName !== userData.username && 
                                    <div className='message-flex-wrap'>
                                        <div className="message-header">
                                            <img 
                                            className='chat-profile' 
                                            src={chat.profileImage} 
                                            alt={chat.senderName} />
                                            <div className="chat-name">{chat.senderName}</div>
                                            {/* <div className="live-chat-list-time">2시간 전</div> */}
                                        </div>
                                        <div className="message-data">{chat.message}</div>
                                    </div>
                                    }
                                    
                                    {chat.senderName === userData.username && 
                                    <div className='message-flex-wrap self'>
                                        <div className="message-header">
                                            <img 
                                            className='chat-profile' 
                                            src={chat.profileImage} 
                                            alt={chat.senderName}/>
                                            <div className="chat-name self">{chat.senderName}</div>
                                            <div className="live-chat-list-time">2시간 전</div>
                                        </div>
                                        <div className="message-data">{chat.message}</div>
                                    </div>
                                    }
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="live-chat-box">
                    <input type="text" className="live-chat-user-input" placeholder="enter the message" value={userData.message} onChange={handleMessage} 
                    onKeyPress = {(e)=>{
                        if (e.key === 'Enter') {
                            sendValue()
                        }
                    }}
                    /> 
                    <button type="button" className="live-chat-user-button" onClick={sendValue}>
                    <IconContext.Provider value={{ className: "send"  }}>
                        <IoPaperPlane/>
                    </IconContext.Provider>
                    </button>
                </div>
            </div>}

        </div>
        :
        <div className="spinner-wrap">
        <BeatLoader color={"grey"} loading={true} size={10}/>
        </div>
        }
    </div>
    )
}

export default Chatbox;

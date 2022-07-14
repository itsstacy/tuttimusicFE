import React, { useEffect, useState } from 'react'
import {over} from 'stompjs';
import SockJS from 'sockjs-client';
import moment from "moment";
import {useParams } from "react-router-dom";

var stompClient = null;
const Chatbox = () => {
    const params = useParams();
    const chatmaster = params.id
    const user = localStorage.getItem("user");
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
        registerUser()
    },[])

    useEffect(() => {
        // setId("nugget")      
        console.log(userData);
    }, [userData]);

    // 유저가 방을 빠져 나올때 connected: false 처리해주기

    const registerUser=()=>{
        connect();
    }
    
    const connect =()=>{
        let Sock = new SockJS('https://15.164.102.62/wss');
        stompClient = over(Sock);
        stompClient.connect({},onConnected, onError);
    }

    const onConnected = () => {
        setUserData({...userData,"connected": true, "master": chatmaster, "username": user });
        console.log(userData);
        stompClient.subscribe('/chatroom/public'+chatmaster, onMessageReceived);
        stompClient.subscribe('/user/'+userData.username+'/private', onPrivateMessage);
        userJoin();
    }

    const userJoin=()=>{
          var chatMessage = {
            master: chatmaster,
            senderName: userData.username,
            status:"JOIN"
          };
          stompClient.send("/app/message/"+chatmaster, {}, JSON.stringify(chatMessage));
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
    
    const onPrivateMessage = (payload)=>{
        
        var payloadData = JSON.parse(payload.body);
        console.log(payloadData);
        console.log(privateChats)
        // IF SENDER NAME ALREADY IN PRIVATE CHAT KEY, ADD THE PAYLOAD DATA
        // KEY: "SENDERNAME", VALUE: ARRAY OF MESSAGES
        if(privateChats.get(payloadData.senderName)){
            privateChats.get(payloadData.senderName).push(payloadData);
            setPrivateChats(new Map(privateChats));
        }else{
            // IF SENDER NAME IS NOT IN PRIVATE CHAT KEY, ADD NEW KEY AND ADD THE PAYLOAD AS VALUE
            let list =[];
            list.push(payloadData);
            privateChats.set(payloadData.senderName,list);
            setPrivateChats(new Map(privateChats));
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
                stompClient.send("/app/message/"+chatmaster, {}, JSON.stringify(chatMessage));
                setUserData({...userData,"message": ""});
            }
    }

    const sendPrivateValue=()=>{
        if (stompClient) {
        var chatMessage = {
            senderName: userData.username,
            receiverName:tab,
            message: userData.message,
            status:"MESSAGE",
            profileImage: "https://media.npr.org/assets/img/2016/03/29/ap_090911089838_sq-3271237f28995f6530d9634ff27228cae88e3440.jpg"
            };
            
            if(userData.username !== tab){
            privateChats.get(tab).push(chatMessage);
            setPrivateChats(new Map(privateChats));
            }
            stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
            setUserData({...userData,"message": ""});
        }
    }

    // const handleUsername=(event)=>{
    //     const {value}=event.target;
    //     setUserData({...userData,"username": value});
    // }

    return (
    <div className="container">
        
        {userData.connected?
        <div className="chat-box">

            {/* PRIBATE CHATROOM LIST */}
            <div className="member-list">
                <ul>
                    <li 
                    onClick={()=>{setTab("CHATROOM")}} 
                    className={`member ${tab==="CHATROOM" && "active"}`}
                    >Chatroom: {chatmaster}
                    </li>
                    {[...privateChats.keys()].map((name,index)=>(
                        <li onClick={()=>{setTab(name)}} className={`member ${tab===name && "active"}`} key={index}>{name}</li>
                    ))}
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

            {/* PRIVATE CHATROOM */}            
            {tab!=="CHATROOM" && <div className="chat-content">
                <ul className="chat-messages">
                    {[...privateChats.get(tab)].map((chat,index)=>(
                        <li className={`message ${chat.senderName === userData.username && "self"}`} key={index}>
                            {chat.senderName !== userData.username && <div className="avatar">{chat.senderName}</div>}
                            <div className="message-data">{chat.message}</div>
                            {chat.senderName === userData.username && <div className="avatar self">{chat.senderName}</div>}
                        </li>
                    ))}
                </ul>

                <div className="send-message">
                    <input type="text" className="input-message" placeholder="enter the message" value={userData.message} onChange={handleMessage} /> 
                    <button type="button" className="send-button" onClick={sendPrivateValue}>send</button>
                </div>
            </div>}
        </div>
        :
        <div className="register">
            <p>not connected!</p>
            {/* <input
            id="user-name"
            placeholder="Enter your name"
            name="userName"
            value={userData.username}
            onChange={handleUsername}
            margin="normal"
            />
            <button 
            type="button" 
            onClick={()=>{
                registerUser()
                }}>
            connect1
            </button> 
            <button type="button" onClick={registerUser}>
                connect2
            </button>  */}
        </div>}
    </div>
    )
}

export default Chatbox;

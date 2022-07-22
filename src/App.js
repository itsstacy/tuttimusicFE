import './styles/App.css';
import './styles/Mq_mobile.css';

import React, {useState} from "react";
import { Routes, Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Detail from "./pages/Detail";
import DetailVideo from './pages/DetailVideo';
import Edit from "./pages/Edit";
import Live from "./pages/Live";
import CreateLive from './pages/CreateLive';
import Login from "./pages/Login";
import Main from "./pages/Main";
import MusicFeed from "./pages/MusicFeed";
import MyEdit from "./pages/MyEdit";
import MyPage from "./pages/MyPage";
import SearchResult from "./pages/SearchResult";
import SignUp from './pages/SignUp';
import UploadChoice from './pages/UploadChoice';
import Upload from './pages/Upload';
import UploadVideo from './pages/UploadVideo';
import UserPage from './pages/UserPage';
import FaceChatList from './pages/FaceChatList';
import NotFound from './pages/NotFound';


function App() {

  const [token, setToken] = useState(localStorage.getItem("token"));
  const [artist, setArtist] = useState(localStorage.getItem("userName"));

  // React.useEffect(() => {
  //   setToken(localStorage.getItem("token"));
  //   setArtist(localStorage.getItem("userName"));
  //   console.log("토큰 값 들어갔냐?" , token);
  //   console.log("아티스트 값 들어갔냐?" , artist);
  // },[])

  const [listening, setListening] = useState(false);
  const [data, setData] = useState([]);
  const [value, setValue] = useState(null);

  const [meventSource, msetEventSource] = useState(undefined);

  let eventSource = undefined;

  const date = new Date();

  // React.useEffect(() => {

  //   console.log("매번 실행되는지");
  //   console.log("listening", listening);

  //   if (token) {
  //     console.log("토큰이 있을 때 new Event");
        
  //       eventSource = new EventSource(`https://seyeolpersonnal.shop/subscribe/${artist}`); //구독
  
  //       msetEventSource(eventSource);
  //       console.log("eventSource", eventSource);
  //       console.log("eventSource 시간 ==> ", date);
  
  //       eventSource.onopen = event => {
  //         console.log("connection opened");
  //         console.log("connection opened 시간 ==> ", date);
  //       };
  
  //       eventSource.onmessage = event => {
  //         console.log("result", event.data);
  //         console.log("result 시간 ==> ", date);
  //         setData(old => [...old, event.data]);
  //         setValue(event.data);
  //         console.log("value ==>" , value.content);
  //       };
  
  //       eventSource.onerror = event => {
  //         console.log(event.target.readyState);
  //         if (event.target.readyState === EventSource.CLOSED) {
  //           console.log("eventsource closed (" + event.target.readyState + ")");
  //         }
  //         eventSource.close();
  //       };


  //   }

  //   return () => {
  //     eventSource.close();
  //     console.log("eventsource closed");
  //   };
  // }, []);


  React.useEffect(() => {

    console.log("매번 실행되는지");
    console.log("listening", listening);

    if (token) {
      console.log("토큰이 있을 때 new Event");
        
        eventSource = new EventSource(`https://seyeolpersonnal.shop/subscribe/${artist}`); //구독
  
        msetEventSource(eventSource);
        console.log("eventSource", eventSource);
        console.log("eventSource 시간 ==> ", date);

        eventSource.addEventListener('open', function(e) {
          console.log("connection opened");
          console.log("connection opened 시간 ==> ", date);
        })

        eventSource.addEventListener('message', function(e) {
          console.log("result", e.data);
          console.log("result 시간 ==> ", date);
          setData(old => [...old, e.data]);
          setValue(e.data);
          console.log("value ==>" , value.content);
        })
      
        eventSource.addEventListener('Live', function (e){
          let liveData = JSON.parse(e.data);
          console.log(liveData);
        }) 

        eventSource.addEventListener('error', function(e) {
          console.log(e.target.readyState);
          if (e.target.readyState === EventSource.CLOSED) {
            console.log("eventsource closed (" + e.target.readyState + ")");
          }
          eventSource.close();
        })
  
    }

    return () => {
      eventSource.close();
      console.log("eventsource closed");
    };
  }, []);

  React.useEffect(() => {
    console.log("data: ", data);
  }, [data]);

    

  return (
    <div className="App">
      <Navbar/>
        <div className="background">
          <Routes>
            <Route path="/" element={<Main />}></Route>
            <Route path="/signup" element={token ? <NotFound /> : <SignUp />}></Route>
            <Route path="/login" element={token ? <NotFound /> : <Login />}></Route>
            <Route path="/detail/:id" element={<Detail />}></Route>
            <Route path="/detail/video/:id" element={<DetailVideo />}></Route>
            <Route path="/musicfeed" element={<MusicFeed />}></Route>
            <Route path="/mypage" element={token ? <MyPage /> : <NotFound />}></Route>
            <Route path="/userpage/:artist" element={<UserPage />}></Route>
            <Route path="/myedit" element={<MyEdit />}></Route>
            <Route path="/upload" element={token ? <UploadChoice /> : <NotFound />}></Route>
            <Route path="/upload/audio" element={token ? <Upload /> : <NotFound />}></Route>
            <Route path="/upload/video" element={token ? <UploadVideo /> : <NotFound />}></Route>
            <Route path="/edit/:id" element={token ? <Edit /> : <NotFound />}></Route>
            <Route path="/live/:artist" element={<Live />}></Route>
            <Route path="/createlive" element={token ? <CreateLive /> : <NotFound />}></Route>
            <Route path="/search" element={<SearchResult />}></Route>
            <Route path="/facechatlist" element={<FaceChatList/>}></Route>
          </Routes>
        </div>
      <Footer/>
    </div>
  );
}

export default App;

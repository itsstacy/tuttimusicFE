import './styles/App.css';

import React from "react";
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

  const [token, setToken] = React.useState(null);

  React.useEffect(() => {
    setToken(localStorage.getItem("token"));
  },[])


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

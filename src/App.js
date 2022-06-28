import './App.css';

import React from "react";
import { Routes, Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Detail from "./pages/Detail";
import Edit from "./pages/Edit";
import FaceChat from "./pages/FaceChat";
import Login from "./pages/Login";
import Main from "./pages/Main";
import MusicFeed from "./pages/MusicFeed";
import MyEdit from "./pages/MyEdit";
import MyPage from "./pages/MyPage";
import SearchResult from "./pages/SearchResult";
import SignUp from './pages/SignUp';
import Upload from './pages/Upload';
import UploadVideo from './pages/UploadVideo';
import UserPage from './pages/UserPage';

function App() {
  return (
    <div className="App">
      <Navbar/>
        <div className="background">
          <Routes>
            <Route path="/" element={<Main />}></Route>
            <Route path="/signup" element={<SignUp />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/detail/:id" element={<Detail />}></Route>
            <Route path="/musicfeed" element={<MusicFeed />}></Route>
            <Route path="/mypage" element={<MyPage />}></Route>
            <Route path="/userpage/:id" element={<UserPage />}></Route>
            <Route path="/myedit" element={<MyEdit />}></Route>
            <Route path="/upload" element={<Upload />}></Route>
            <Route path="/uploadvideo" element={<UploadVideo />}></Route>
            <Route path="/edit/:id" element={<Edit />}></Route>
            <Route path="/facechat" element={<FaceChat />}></Route>
            <Route path="/search" element={<SearchResult />}></Route>
          </Routes>
        </div>
      <Footer/>
    </div>
  );
}

export default App;

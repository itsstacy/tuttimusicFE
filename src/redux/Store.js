import {configureStore} from "@reduxjs/toolkit";
import SongSlice from "./modules/songSlice";
import VideoSlice from "./modules/videoSlice";
import UserSlice from "./modules/userSlice";


const store = configureStore({
  reducer:{
      Song: SongSlice,
      Video: VideoSlice,
      User: UserSlice
  },
});

export default store;
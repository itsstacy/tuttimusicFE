import {configureStore} from "@reduxjs/toolkit";
import SongSlice from "./modules/songSlice";
import VideoSlice from "./modules/videoSlice";
import UserSlice from "./modules/userSlice";
import PlayerSlice from "./modules/playerSlice";


const store = configureStore({
  reducer:{
      Song: SongSlice,
      Video: VideoSlice,
      User: UserSlice,
      Player: PlayerSlice,
  },
});

export default store;
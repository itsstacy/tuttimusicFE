import { createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";

const SERVER_URL = "";

const PlayerSlice = createSlice({
  name: "player",
  initialState: {
    display: false,
    currentSong: null,
    isPlaying: false,
    volume: 0.5,
    currentTime: 0,
  },

  reducers: {
    
    showPlayer: (state,action) => {
      const new_list = {...current(state), display: true};
      state.player = new_list;
    },
    
    addASong: (state,action) => {
      console.log(current(state.player));
      const new_list2 = {...current(state.player), currentSong:action.payload};
      state.player = new_list2;
    },

    playerPlay: (state,action) => {
      const new_list = {...current(state.player), isPlaying:!action.payload};
      state.player = new_list;
    },

    playerVolume: (state,action) => {
      const new_list = {...current(state.player), volume:action.payload};
      state.player = new_list;
    },

    playerTime: (state,action) => {
      const new_list = {...current(state.player), currentTime:action.payload};
      state.player = new_list;
    },


  },
  extraReducers: {
    // middlewares

  }



})

export const {playerPlay, addASong, playerVolume, playerTime, showPlayer} = PlayerSlice.actions;
export default PlayerSlice.reducer;
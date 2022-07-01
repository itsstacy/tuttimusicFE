import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";

const SERVER_URL = "http://52.79.234.195";

//GET MAIN POST (HOME TAB)
export const getMainLists = createAsyncThunk("GET/getMainLists", async (token)=>{
  console.log(token);
  return axios
  .get(`${SERVER_URL}/`,{
    headers: {Authorization:token? token:""}
  })
  .then((response)=> response.data.data);
})

//GET MUSICFEED (FEED TAB)
export const getMusicFeed = createAsyncThunk("GET/getMusicFeed", async ()=>{
  return axios
  .get(`${SERVER_URL}/feeds`,{})
  .then((response)=> response.data.data);
})

//GET SONG DETAIL
export const getSongDetail = createAsyncThunk("GET/getSongDetail", async (id)=>{
  console.log(id.id);
  return axios
  .get(`${SERVER_URL}/feeds/`+id.id,{})
  .then((response)=> response.data.data);
})

const SongSlice = createSlice({
  name: "Song",
  initialState: {

    list: [{}],

  },

  reducers: {

  },
  extraReducers: {
    // middlewares
    [getMainLists.fulfilled]: (state, action) => {
      console.log("GET FULFILLED");
      console.log(action.payload);
      state.genreList = [...action.payload.genreList];
      state.latestList = [...action.payload.latestList];
      state.likeList = [...action.payload.likeList];
    },
    [getMainLists.rejected]: (state, action) => {
      console.log("GET REJECTED");
    },
    [getMusicFeed.fulfilled]: (state, action) => {
      console.log("GET FULFILLED");
      console.log(action.payload);
      state.allList = [...action.payload];
    },
    [getMusicFeed.rejected]: (state, action) => {
      console.log("GET REJECTED");
    },
    [getSongDetail.fulfilled]: (state, action) => {
      console.log("GET FULFILLED");
      state.detail = action.payload.feed;
      state.comments = [...action.payload.comment];
    },
    [getSongDetail.rejected]: (state, action) => {
      console.log("GET REJECTED");
    },

  }
})

export default SongSlice.reducer;
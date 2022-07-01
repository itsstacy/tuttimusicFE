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
export const getMusicFeed = createAsyncThunk("GET/getMusicFeed", async (token)=>{
  console.log(token);
  return axios
  .get(`${SERVER_URL}/feeds`,{
    headers: {Authorization:token? token:""}
  })
  .then((response)=> response.data.data);
})

//GET SONG DETAIL
export const getSongDetail = createAsyncThunk("GET/getSongDetail", async (props)=>{
  console.log(props);
  return axios
  .get(`${SERVER_URL}/feeds/`+props.id,{
    headers: {Authorization:props.token? props.token:""}
  })
  .then((response)=> response.data.data);
})

//POST A COMMENT
export const postComment = createAsyncThunk("POST/postComment", async (props) => {
  console.log(props.comment);
  const commentData = {
    artist: props.artist,
    profileUrl: props.profileUrl,
    comment: props.comment,
    id: props.feedid
    // timestamp: "방금전",
  }
  const data = {
    comment: props.comment
  }
  await axios
  .post(`${SERVER_URL}/feeds/`+props.feedid,data,{
    headers: {Authorization:props.token? props.token:""}
  })
  .then((response) => response.data.data);

  return commentData;
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
    [postComment.fulfilled]: (state, action) => {
      console.log("POST FULFILLED");
      console.log(action.payload);
      console.log(current(state.comments))
      // state.detail = action.payload.feed;
      state.comments = [...current(state.comments),action.payload];
      console.log(state.comments);
    },
    [postComment.rejected]: (state, action) => {
      console.log("POST REJECTED");
    },

  }
})

export default SongSlice.reducer;
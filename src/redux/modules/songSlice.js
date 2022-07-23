import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";

export const SERVER_URL = "https://seyeolpersonnal.shop";

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
export const getMusicFeed = createAsyncThunk("GET/getMusicFeed", async (props)=>{
  console.log(props)
  return axios
  .get(`${SERVER_URL}/feeds?postType=${props.type}&genre=${props.genre}&page=${props.page}&limit=${props.limit}`,{
    headers: {Authorization:props.token? props.token:""}
  })
  .then((response)=> response.data.data.content);
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
    id: props.feedid,
    modifiedAt:props.modifiedAt,
  }
  const data = {
    comment: props.comment,
    modifiedAt:props.modifiedAt,
  }
  await axios
  .post(`${SERVER_URL}/feeds/`+props.feedid,data,{
    headers: {Authorization:props.token? props.token:""}
  })
  .then((response) => {
    console.log("댓글 작성 시 리스폰스 ==> ",response);
  });

  return commentData;
}) 

//EDIT A COMMNET
export const editAComment = createAsyncThunk("PUT/editComment", async (props) => {
  console.log(props)
  const editedComment = {
    feedid: props.feedid,
    comment: props.comment,
    commentid: props.commentid,
    modifiedAt: props.modifiedAt,
    token: props.token,
  }
  const data = {
    comment: props.comment,
    modifiedAt: props.modifiedAt,
  }
  await axios
  .put(`${SERVER_URL}/feeds/`+props.feedid+`/`+props.commentid,data, {
    headers: {Authorization:props.token? props.token:""}
  })
  .then((response) => response.data.data)

  return editedComment;
})

//DELETE A COMMENT
export const deleteComment = createAsyncThunk("DELETE/deleteComment", async (props) => {
  console.log(props)
  const deletedComment ={
    feedid: props.feedid,
    commentid: props.commentid,
  }

  await axios
  .delete(`${SERVER_URL}/feeds/`+props.feedid+`/`+props.commentid, {
    headers: {Authorization:props.token? props.token:""}
  })
  .then((response) => response.data.data)

  return deletedComment;
})


//LIKE ACTION
export const likeSong = createAsyncThunk("POST/likeSong", async (props) => {
  console.log(props)
  await axios
  .post(`${SERVER_URL}/like/`+props.feedid,{},{
    headers: {Authorization:props.token? props.token:""}
  })
  .then((response) => response.data.data);

  return props;
})

//SEARCH MUSIC
export const searchMusic = createAsyncThunk("GET/searchMusic", async (props)=>{
  console.log(props);
  return await axios
  .get(`${SERVER_URL}/search?keyword=${props}`, {
    headers: {Authorization:props.token? props.token:""}
  })
  .then((response) => response.data)
})

//FOLLOW
export const followAnArtist = createAsyncThunk("POST/followAnArtist", async (props)=>{
  await axios
  .post(`${SERVER_URL}/follow?artist=${props.artist}`,{}, {
    headers: {Authorization:props.token? props.token:""}
  })
  .then((response) => response.data.data);
  return props;
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
      state.videoList = [...action.payload.videoList];
    },
    [getMainLists.rejected]: (state, action) => {
      console.log("GET REJECTED");
    },
    [getMusicFeed.fulfilled]: (state, action) => {
      console.log("GET MUSIC FEED FULFILLED");
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
    [editAComment.fulfilled]: (state, action) => {
      console.log("EDIT FULFILLED");
      console.log(action.payload);
      console.log(current(state.comments))
      const new_list = current(state.comments).map((comment,index) => {
        if (comment.id === action.payload.commentid){
          return {...comment, comment: action.payload.comment}
        } else{
          return comment;
        }
      })
      console.log(new_list);
      state.comments = new_list;
    },
    [editAComment.rejected]: (state, action) =>{
      console.log("EDIT REJECTED");
    },
    [deleteComment.fulfilled]: (state, action) => {
      console.log("DELETE FULFILLED");
      console.log(action.payload);
      console.log(current(state.comments))
      const new_list = current(state.comments).filter(
        (comment) => comment.id !== action.payload.commentid
      );
      console.log(new_list);
      state.comments = new_list;
    },
    [deleteComment.rejected]: (state, action) =>{
      console.log("DELETE REJECTED");
    },
    [likeSong.fulfilled]: (state, action) => {
      console.log("POST FULFILLED");
      console.log(action.payload);
      console.log(current(state.detail))
      if (action.payload.isLiked === false) {
        const new_detail = {...current(state.detail), likeCount:action.payload.likeCount+1, flag:true }
        console.log(new_detail)
        state.detail = new_detail;
      } else {
        const new_detail = {...current(state.detail), likeCount:action.payload.likeCount-1, flag:false }
        console.log(new_detail)
        state.detail = new_detail;
      }      
    },
    [likeSong.rejected]: (state, action) => {
      console.log("POST REJECTED");
    },
    [searchMusic.fulfilled]: (state, action) => {
      console.log("GET FULFILLED");
      console.log(action.payload);
      // if (action.payload.musicArtist.length > 6) {
      //   action.payload.musicArtist.pop();
      // }
      // if (action.payload.musicTitle.length > 6) {
      //   action.payload.musicArtist.pop();
      // }
      // if (action.payload.videoArtist.length > 6) {
      //   action.payload.musicArtist.pop();
      // }
      // if (action.payload.videoTitle.length > 6) {
      //   action.payload.musicArtist.pop();
      // }
      
      state.result_musicArtist = action.payload.musicArtist;
      state.result_musicTitle = action.payload.musicTitle;
      state.result_videoArtist = action.payload.videoArtist;
      state.result_videoTitle = action.payload.videoTitle;

      

    },
    [searchMusic.rejected]: (state, action) => {
      console.log("GET REJECTED");
    },
    [followAnArtist.fulfilled]: (state, action) =>{
      console.log("POST FULFILLED");
      console.log(action.payload);
      console.log(current(state))
    },
    [followAnArtist.rejected]: (state, action) =>{
      console.log("POST REJECTED");
    }

  }
})

export default SongSlice.reducer;
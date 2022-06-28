import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";

const SERVER_URL = "";

const SongSlice = createSlice({
  name: "Song",
  initialState: {

    list: [{}],

  },

  reducers: {

  },
  extraReducers: {
    // middlewares

  }



})

export default SongSlice.reducer;
import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";

const SERVER_URL = "";

const UserSlice = createSlice({
  name: "User",
  initialState: {

    list: [{}],

  },

  reducers: {

  },
  extraReducers: {
    // middlewares

  }



})

export default UserSlice.reducer;
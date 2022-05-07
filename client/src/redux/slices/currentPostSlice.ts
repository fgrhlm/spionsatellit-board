import { createSlice } from "@reduxjs/toolkit";
import IPost from "../../interfaces/IPost";
import { FindPost } from "../thunks";

export interface PostState {
  status: string,
  post: IPost
}

const initialState: PostState = {
  status: "idle",
  post: {
    _id: "",
    title: "",
    body: "",
    comments: [],
    _v: 0
  }
}

const currentPostSlice = createSlice({
  name: "currentPost",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(FindPost.pending, (state, action: any) => {
        state.status = "loading";
      })
      .addCase(FindPost.fulfilled, (state, action: any) => {
        state.status = "success";
        state.post = action.payload;
      })
  }
})

export default currentPostSlice.reducer;
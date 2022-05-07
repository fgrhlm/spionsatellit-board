import { createSlice } from "@reduxjs/toolkit";
import IPost from "../../interfaces/IPost";
import { FindPosts } from "../thunks";

export interface IFeedState {
  status: string,
  feedType: string,
  posts: IPost[],
  offset: number
}

const initialState: IFeedState = {
  status: "idle",
  feedType: "new",
  posts: [],
  offset: 0
}

const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    incrementOffset: (state) => {
      state.offset++;
    },
    decrementOffset(state){
      state.offset = state.offset > 0 ? state.offset-1 : 0;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(FindPosts.pending, (state, action: any) => {
        state.status = "loading";
      })
      .addCase(FindPosts.fulfilled, (state, action: any) => {
        state.status = "success";
        state.posts = action.payload;
      })
  }
})

export const { incrementOffset, decrementOffset } = feedSlice.actions

export default feedSlice.reducer;
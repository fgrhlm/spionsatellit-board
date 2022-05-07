import { createSlice } from "@reduxjs/toolkit";
import IComment from "../../interfaces/IComment";
import { SubmitComment } from "../thunks";

export interface CommentFormState {
  status: string,
  comment: IComment
}

const initialState: CommentFormState = {
  status: "idle",
  comment: {
    _id: "",
    body: "",
  } 
}

const commentFormSlice = createSlice({
  name: "commentForm",
  initialState,
  reducers: {
    setStatus: (state, action: any) => {
      state.status = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(SubmitComment.pending, (state, action: any) => {
        state.status = "loading";
      })
      .addCase(SubmitComment.fulfilled, (state, action: any) => {
        state.status = "success";
        state.comment = action.payload;
      })
  }
})

export const { setStatus } = commentFormSlice.actions;

export default commentFormSlice.reducer;
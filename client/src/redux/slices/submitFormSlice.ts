import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SubmitPost } from "../thunks";

export interface SubmitFormState {
  status: string,
}

const initialState: SubmitFormState = {
  status: "idle",
}

const submitFormSlice = createSlice({
  name: "submitForm",
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(SubmitPost.pending, (state, action: any) => {
        state.status = "loading";
      })
      .addCase(SubmitPost.fulfilled, (state, action: any) => {
        state.status = "success";
      })
  }
})

export const { setStatus } = submitFormSlice.actions;

export default submitFormSlice.reducer;
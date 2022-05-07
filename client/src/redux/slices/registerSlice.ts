import { createSlice } from "@reduxjs/toolkit";

import { Register } from "../thunks";

export interface RegisterState {
  status: string,
}

const initialState: RegisterState = {
  status: "idle",
}

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(Register.pending, (state, action: any) => {
        state.status = "pending";
      })
      .addCase(Register.fulfilled, (state, action: any) => {
        state.status = "fulfilled";
      })
      .addCase(Register.rejected, (state, action: any) => {
        state.status = "rejected";
      })
  }
})

export default registerSlice.reducer;
import Cookies from "js-cookie";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Login } from "../thunks";

export interface LoginState {
  status: string,
  loggedIn: boolean,
  token: string
}

const initialState: LoginState = {
  status: "idle",
  loggedIn: false,
  token: ""
}

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.loggedIn = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(Login.pending, (state, action: any) => {
        state.status = "pending";
      })
      .addCase(Login.fulfilled, (state, action: any) => {
        state.status = "fulfilled";
        if(action.payload.token){
          state.loggedIn = true;
          state.token = action.payload.token;
          Cookies.set("token", action.payload.token)
        }
      })
      .addCase(Login.rejected, (state, action: any) => {
        state.status = "rejected";
      })
  }
})

export const { setLoggedIn, setToken } = loginSlice.actions;

export default loginSlice.reducer;
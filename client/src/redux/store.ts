import { configureStore } from "@reduxjs/toolkit";

import feedReducer from "./slices/feedSlice";
import currentPostReducer from "./slices/currentPostSlice";
import commentFormReducer from "./slices/commentFormSlice";
import submitFormReducer from "./slices/commentFormSlice";
import registerReducer from "./slices/registerSlice";
import loginReducer from "./slices/loginSlice";

const store = configureStore({
  reducer: {
    feed: feedReducer,
    currentPost: currentPostReducer,
    commentForm: commentFormReducer,
    submitForm: submitFormReducer,
    register: registerReducer,
    login: loginReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;
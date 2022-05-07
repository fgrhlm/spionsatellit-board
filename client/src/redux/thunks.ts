import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ICommentRequest } from "../interfaces/ICommentRequest";
import { IPostRequest } from "../interfaces/IPostRequest";

export const FindPosts = createAsyncThunk("posts/find",
  async (offset: number) => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/posts?page=${offset}`);
   
    return response.data;
  }
)

export const FindPost = createAsyncThunk("posts/find",
  async (id: string) => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/posts/${id}`);
   
    return response.data;
  }
)

export const FindComment = createAsyncThunk("comments/find",
  async (id: string) => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/comments/${id}`);
   
    return response.data;
  }
)

export const SubmitComment = createAsyncThunk("comments/post",
  async (comment: ICommentRequest) => {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/posts/${comment.parentId}`,{
      "body": comment.body
    });

    return response.data;
  }
)

export const SubmitPost = createAsyncThunk("comments/post",
  async (post: IPostRequest) => {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/posts`,{
      "title": post.title,
      "body": post.body
    });

    return response.data;
  }
)

export const Register = createAsyncThunk("auth/register",
  async (user: any) => {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`,{
      "username": user.username,
      "password": user.password,
      "invite": user.invite
    });

    return response.data;
  }
)

export const Login = createAsyncThunk("auth/login",
  async (user: any) => {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`,{
      "username": user.username,
      "password": user.password,
    });

    return response.data;
  }
)
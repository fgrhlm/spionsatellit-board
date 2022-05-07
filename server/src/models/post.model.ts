import mongoose from "mongoose";

const { Schema } = mongoose;

const commentSchema = new Schema({
  body: String  
})

const postSchema = new Schema({
  title: String,
  body: String,
  comments: [commentSchema],
  createdAt: { type: Date, default: Date.now}
})

const Post = mongoose.model("Post", postSchema);
const Comment =  mongoose.model("Comment", commentSchema);

export { Post, Comment }
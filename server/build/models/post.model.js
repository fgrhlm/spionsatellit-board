"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = exports.Post = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const commentSchema = new Schema({
    body: String
});
const postSchema = new Schema({
    title: String,
    body: String,
    comments: [commentSchema],
    createdAt: { type: Date, default: Date.now }
});
const Post = mongoose_1.default.model("Post", postSchema);
exports.Post = Post;
const Comment = mongoose_1.default.model("Comment", commentSchema);
exports.Comment = Comment;

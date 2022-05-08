"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const posts_controller_1 = __importDefault(require("../controllers/posts.controller"));
const PostsRouter = (0, express_1.Router)();
PostsRouter.get("/", posts_controller_1.default.findAll);
PostsRouter.get("/:id", posts_controller_1.default.findOne);
PostsRouter.post("/", posts_controller_1.default.create);
PostsRouter.post("/:id", posts_controller_1.default.createComment);
exports.default = PostsRouter;

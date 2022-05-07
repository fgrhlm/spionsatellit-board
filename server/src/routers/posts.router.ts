import { Router } from "express";
import PostsController from "../controllers/posts.controller";

const PostsRouter: Router = Router();

PostsRouter.get("/", PostsController.findAll);
PostsRouter.get("/:id", PostsController.findOne);
PostsRouter.post("/", PostsController.create);
PostsRouter.post("/:id", PostsController.createComment);

export default PostsRouter;
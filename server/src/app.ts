import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import checkAuth from "./middleware/auth.middleware";

import PostsRouter from "./routers/posts.router";
import AuthRouter from "./routers/auth.router";

const app: express.Application = express();

// Middleware
app.use(helmet())
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/posts",checkAuth, PostsRouter)
app.use("/auth", AuthRouter)

export default app;
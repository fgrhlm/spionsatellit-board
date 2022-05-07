import { Router } from "express";
import AuthController from "../controllers/auth.controller";

const AuthRouter: Router = Router();

AuthRouter.post("/login", AuthController.authenticate);
AuthRouter.post("/register", AuthController.register);

export default AuthRouter;
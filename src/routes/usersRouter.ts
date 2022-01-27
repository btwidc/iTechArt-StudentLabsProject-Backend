import { Router } from "express";
const usersRouter = Router();
import usersController from "../controllers/userController";
import authorizationMiddleware from "../middleware/authorizationMiddleware";

usersRouter.post("/registration", usersController.registration);
usersRouter.post("/login", usersController.login);
usersRouter.get("/auth", authorizationMiddleware, usersController.checkAuth);

export default usersRouter;

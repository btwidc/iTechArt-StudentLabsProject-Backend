import { Router } from "express";
const usersRouter = Router();
import usersController from "../controllers/userController";

usersRouter.post("/registration", usersController.registration);
usersRouter.post("/login", usersController.login);
usersRouter.get("/auth", usersController.checkAuth);

export default usersRouter;

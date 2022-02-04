import { Router } from "express";
import usersController from "../controllers/userController";

const { body } = require("express-validator");
const authorizationMiddleware = require("../middleware/authorizationMiddleware");

const usersRouter = Router();

usersRouter.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 6, max: 32 }),
  usersController.registration
);
usersRouter.post("/login", usersController.login);
usersRouter.get("/refresh", authorizationMiddleware, usersController.refresh);
usersRouter.get("/test", authorizationMiddleware, usersController.test);

export default usersRouter;

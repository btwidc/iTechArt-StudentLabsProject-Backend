import { Router } from "express";

const usersRouter = Router();

usersRouter.post("/registration");
usersRouter.post("/login");
usersRouter.get("/auth", (req, res) => {
  res.status(200).json({ message: "Fine" });
});

export default usersRouter;

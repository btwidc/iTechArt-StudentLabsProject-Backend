"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usersRouter = express_1.Router();
usersRouter.post("/registration");
usersRouter.post("/login");
usersRouter.get("/auth", (req, res) => {
    res.status(200).json({ message: "Fine" });
});
exports.default = usersRouter;
//# sourceMappingURL=usersRouter.js.map
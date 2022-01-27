"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usersRouter = express_1.Router();
const userController_1 = __importDefault(require("../controllers/userController"));
const authorizationMiddleware_1 = __importDefault(require("../middleware/authorizationMiddleware"));
usersRouter.post("/registration", userController_1.default.registration);
usersRouter.post("/login", userController_1.default.login);
usersRouter.get("/auth", authorizationMiddleware_1.default, userController_1.default.checkAuth);
exports.default = usersRouter;
//# sourceMappingURL=usersRouter.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = __importDefault(require("../controllers/userController"));
const { body } = require("express-validator");
const authorizationMiddleware = require("../middleware/authorizationMiddleware");
const usersRouter = express_1.Router();
usersRouter.post("/registration", body("email").isEmail(), body("password").isLength({ min: 6, max: 32 }), userController_1.default.registration);
usersRouter.post("/login", userController_1.default.login);
usersRouter.get("/refresh", authorizationMiddleware, userController_1.default.refresh);
usersRouter.get("/test", authorizationMiddleware, userController_1.default.test);
exports.default = usersRouter;
//# sourceMappingURL=usersRouter.js.map
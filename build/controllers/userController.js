"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const userService = require("../services/userService");
const { validationResult } = require("express-validator");
const ApiError = require("../errors/ApiError");
class UserController {
    registration(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return next(ApiError.BadRequest("Validation error", errors.array()));
                }
                const { email, password, role } = req.body;
                const userData = yield userService.registration(email, password, "HR");
                return res.json(userData);
            }
            catch (e) {
                next(e);
            }
        });
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const userData = yield userService.login(email, password);
                return res.json(userData);
            }
            catch (e) {
                next(e);
            }
        });
    }
    // async logout(req, res, next) {
    //   try {
    //     const { refreshToken } = req.cookies;
    //     const token = await userService.logout(refreshToken);
    //     res.clearCookie("refreshToken");
    //     return res.json(token);
    //   } catch (e) {
    //     next(e);
    //   }
    // }
    refresh(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { refreshToken } = req.cookies;
                const userData = yield userService.refresh(refreshToken);
                return res.json(userData);
            }
            catch (e) {
                next(e);
            }
        });
    }
}
const usersController = new UserController();
exports.default = usersController;
//# sourceMappingURL=userController.js.map
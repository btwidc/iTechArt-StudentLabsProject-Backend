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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ApiError_1 = __importDefault(require("../errors/ApiError"));
const bcrypt_nodejs_1 = __importDefault(require("bcrypt-nodejs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const { User } = require("../models/models");
const generateJwt = (id, email, role) => {
    return jsonwebtoken_1.default.sign({
        id,
        email,
        role,
    }, process.env.SECRET_KEY, { expiresIn: "24h" });
};
class UserController {
    registration(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password, role } = req.body;
            if (!email || !password) {
                return next(ApiError_1.default.badRequest("Incorrect email or password"));
            }
            const checkUser = yield User.findOne({ where: { email } });
            if (checkUser) {
                return next(ApiError_1.default.badRequest("User with this email already exists"));
            }
            const salt = bcrypt_nodejs_1.default.genSaltSync(10);
            const hashPassword = yield bcrypt_nodejs_1.default.hashSync(password, salt);
            const user = yield User.create({ email, password: hashPassword, role });
            const token = generateJwt(user.id, user.email, user.role);
            return res.json({ token });
        });
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const user = yield User.findOne({ where: { email } });
            if (!user) {
                return next(ApiError_1.default.badRequest("User is not exists"));
            }
            let comparePassword = bcrypt_nodejs_1.default.compareSync(password, user.password);
            if (!comparePassword) {
                return next(ApiError_1.default.badRequest("Incorrect password"));
            }
            const token = generateJwt(user.id, user.email, user.role);
            return res.json({ token });
        });
    }
    checkAuth(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = generateJwt(req.user.id, req.user.email, req.user.role);
            return res.json({ token });
        });
    }
}
const usersController = new UserController();
exports.default = usersController;
//# sourceMappingURL=userController.js.map
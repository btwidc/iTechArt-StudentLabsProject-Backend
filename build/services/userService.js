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
const tokenService = require("../services/tokenService");
const bcrypt_nodejs_1 = __importDefault(require("bcrypt-nodejs"));
const { User } = require("../models/models");
const UserDto = require("../dtos/UserDto");
const ApiError = require("../errors/ApiError");
class UserService {
    registration(email, password, role) {
        return __awaiter(this, void 0, void 0, function* () {
            const candidate = yield User.findOne({ where: { email } });
            if (candidate) {
                throw ApiError.BadRequest(`User with email ${email} already exists`);
            }
            const salt = bcrypt_nodejs_1.default.genSaltSync(10);
            const hashPassword = yield bcrypt_nodejs_1.default.hashSync(password, salt);
            const user = yield User.create({ email, password: hashPassword, role });
            const userDto = new UserDto(user);
            const tokens = tokenService.generateTokens(Object.assign({}, userDto));
            yield tokenService.saveToken(userDto.id, tokens.refreshToken);
            return Object.assign(Object.assign({}, tokens), { user: userDto });
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User.findOne({ where: { email } });
            if (!user) {
                throw ApiError.NotFoundUserError();
            }
            const isPasswordEquals = yield bcrypt_nodejs_1.default.compareSync(password, user.password);
            if (!isPasswordEquals) {
                throw ApiError.BadRequest("Invalid password");
            }
            const userDto = new UserDto(user);
            const tokens = tokenService.generateTokens(Object.assign({}, userDto));
            yield tokenService.saveToken(userDto.id, tokens.refreshToken);
            return Object.assign(Object.assign({}, tokens), { user: userDto });
        });
    }
    logout(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield tokenService.removeToken(refreshToken);
        });
    }
    refresh(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!refreshToken) {
                throw ApiError.UnauthorizedError();
            }
            const userData = tokenService.validateRefreshToken(refreshToken);
            const tokenFromDb = yield tokenService.findToken(refreshToken);
            if (!userData || !tokenFromDb) {
                throw ApiError.UnauthorizedError();
            }
            const user = yield User.findOne({ where: { id: userData.id } });
            const userDto = new UserDto(user);
            const newAccessToken = tokenService.generateAccessToken(Object.assign({}, userDto));
            yield tokenService.saveToken(userDto.id, newAccessToken);
            return { newAccessToken, user: userDto };
        });
    }
}
module.exports = new UserService();
//# sourceMappingURL=userService.js.map
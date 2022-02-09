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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const { Token } = require("../models/models");
class TokenService {
    generateTokens(payload) {
        const accessToken = jsonwebtoken_1.default.sign(payload, process.env.JWT_ACCESS_SECRET, {
            expiresIn: "30s",
        });
        const refreshToken = jsonwebtoken_1.default.sign(payload, process.env.JWT_REFRESH_SECRET, {
            expiresIn: "2m",
        });
        return { accessToken, refreshToken };
    }
    generateAccessToken(payload) {
        return jsonwebtoken_1.default.sign(payload, process.env.JWT_ACCESS_SECRET, {
            expiresIn: "30s",
        });
    }
    validateAccessToken(token) {
        try {
            return jsonwebtoken_1.default.verify(token, process.env.JWT_ACCESS_SECRET);
        }
        catch (e) {
            return null;
        }
    }
    validateRefreshToken(token) {
        try {
            return jsonwebtoken_1.default.verify(token, process.env.JWT_REFRESH_SECRET);
        }
        catch (e) {
            return null;
        }
    }
    saveToken(userId, refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokenData = yield Token.findOne({ where: { userId } });
            if (tokenData) {
                tokenData.refreshToken = refreshToken;
                return tokenData.save();
            }
            return yield Token.create({ userId, refreshToken });
        });
    }
    removeToken(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Token.destroy({ where: { refreshToken: refreshToken } });
        });
    }
    findToken(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Token.findOne({ where: { refreshToken: refreshToken } });
        });
    }
}
module.exports = new TokenService();
//# sourceMappingURL=tokenService.js.map
import jwt from "jsonwebtoken";

const { Token } = require("../models/models");

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "30s",
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "2m",
    });
    return { accessToken, refreshToken };
  }

  generateAccessToken(payload) {
    return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "30s",
    });
  }

  validateAccessToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    } catch (e) {
      return null;
    }
  }

  async saveToken(userId: number, refreshToken) {
    const tokenData = await Token.findOne({ where: { userId } });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    return await Token.create({ userId, refreshToken });
  }

  async removeToken(refreshToken: string) {
    return await Token.destroy({ where: { refreshToken: refreshToken } });
  }

  async findToken(refreshToken: string) {
    return await Token.findOne({ where: { refreshToken: refreshToken } });
  }
}

module.exports = new TokenService();

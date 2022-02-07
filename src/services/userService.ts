const tokenService = require("../services/tokenService");

import bcrypt from "bcrypt-nodejs";

const { User } = require("../models/models");
const UserDto = require("../dtos/UserDto");
const ApiError = require("../errors/ApiError");

class UserService {
  async registration(email: string, password: string, role: string) {
    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      throw ApiError.BadRequest(`User with email ${email} already exists`);
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hashSync(password, salt);

    const user = await User.create({ email, password: hashPassword, role });
    const userDto = new UserDto(user);

    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async login(email: string, password: string) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw ApiError.NotFoundUserError();
    }

    const isPasswordEquals = await bcrypt.compareSync(password, user.password);
    if (!isPasswordEquals) {
      throw ApiError.BadRequest("Invalid password");
    }

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async logout(refreshToken: string) {
    return await tokenService.removeToken(refreshToken);
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    console.log(userData);
    const tokenFromDb = await tokenService.findToken(refreshToken);
    console.log(tokenFromDb);
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }
    const user = await User.findOne({ where: { id: userData.id } });
    const userDto = new UserDto(user);
    const newAccessToken = tokenService.generateAccessToken({ ...userDto });
    return { newAccessToken, user: userDto };
  }
}

module.exports = new UserService();

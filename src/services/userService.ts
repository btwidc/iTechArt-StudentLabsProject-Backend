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

  async refresh(email: string) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw ApiError.NotFoundUserError();
    }
    const userDto = new UserDto(user);
    return tokenService.generateAccessToken({ ...userDto });
    // const userById = await Token.update({refreshToken: },{where: {userId: id}});
    // if (!userById) {
    //   throw ApiError.UnauthorizedError();
    // }
    //
    // const userData = tokenService.validateRefreshToken();
    //
    // const user = await User.findOne({ where: { id: userData.id } });
    // const userDto = new UserDto(user);
    //
    // const tokens = tokenService.generateTokens({ ...userDto });
    // await tokenService.saveToken(userDto.id, tokens.refreshToken);
    //
    // return { ...tokens, user: userDto };
  }
}

module.exports = new UserService();

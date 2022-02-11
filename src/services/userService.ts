import tokenService from "../services/tokenService";
import bcrypt from "bcrypt-nodejs";

import User from "../models/User";
import UserDto from "../dtos/UserDto";
import ApiError from "../errors/ApiError";
import AuthResponseType from "../types/AuthResponseType";
import RefreshResponse from "../types/RefreshResponse";

class UserService {
  public async registration(
    email: string,
    password: string,
    role: string,
  ): Promise<AuthResponseType> {
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

  public async login(
    email: string,
    password: string,
  ): Promise<AuthResponseType> {
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

  public async logout(refreshToken: string): Promise<number> {
    return await tokenService.removeToken(refreshToken);
  }

  public async refresh(refreshToken: string): Promise<RefreshResponse> {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }
    if (!(userData instanceof ApiError)) {
      const user = await User.findOne({ where: { id: userData.id } });
      const userDto = new UserDto(user);
      const newAccessToken = tokenService.generateAccessToken({ ...userDto });
      return { newAccessToken, user: userDto };
    }
  }
}

export default new UserService();

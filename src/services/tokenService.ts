import jwt from 'jsonwebtoken';

import Token from '../models/Token';
import TokensResponse from '../types/TokensResponse';
import ApiError from '../errors/ApiError';
import ValidateResponse from '../types/ValidateResponse';

class TokenService {
  public generateTokens(payload): TokensResponse {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: '30m',
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: '30d',
    });
    const tokens = { accessToken, refreshToken };
    return { ...tokens };
  }

  public generateAccessToken(payload): string {
    return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: '30m',
    });
  }

  public validateAccessToken(token: string): ValidateResponse | ApiError {
    try {
      return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    } catch (e) {
      return ApiError.UnauthorizedError();
    }
  }

  public validateRefreshToken(token: string): ValidateResponse | ApiError {
    try {
      return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    } catch (e) {
      return ApiError.UnauthorizedError();
    }
  }

  public async saveToken(
    userId: number,
    refreshToken: string,
  ): Promise<typeof Token> {
    const tokenData = await Token.findOne({ where: { userId } });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    return await Token.create({ userId, refreshToken });
  }

  public async removeToken(refreshToken: string): Promise<number> {
    return await Token.destroy({ where: { refreshToken } });
  }

  public async findToken(refreshToken: string): Promise<typeof Token | null> {
    return await Token.findOne({ where: { refreshToken } });
  }
}

export default new TokenService();

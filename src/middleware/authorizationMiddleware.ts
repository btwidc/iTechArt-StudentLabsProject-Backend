import apiError from '../errors/ApiError';
import tokenService from '../services/tokenService';
import { Response, NextFunction, Request } from 'express';
import ApiError from '../errors/ApiError';

const AuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return next(apiError.UnauthorizedError());
        }

        const accessToken = authorizationHeader.split(' ')[1];
        if (!accessToken) {
            return next(apiError.UnauthorizedError());
        }

        const decodedUserData = tokenService.validateAccessToken(accessToken);
        if (!decodedUserData) {
            return next(apiError.UnauthorizedError());
        }
        if (!(decodedUserData instanceof ApiError)) {
            req.user = decodedUserData;
            next();
        }
    } catch (e) {
        return next(apiError.UnauthorizedError());
    }
};

export default AuthMiddleware;

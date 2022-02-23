import userService from '../services/userService';
import profileService from '../services/profileService';

import { validationResult } from 'express-validator';
import ApiError from '../errors/ApiError';
import AuthResponseType from '../types/AuthResponseType';
import UserProfileInfo from '../types/UserProfileInfo';
import { NextFunction, Request, Response } from 'express';

class UserController {
    public async registration(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Promise<AuthResponseType> | Promise<void>> {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(
                    ApiError.BadRequest('Validation error', errors.array()),
                );
            }

            const { email, password, role } = req.body;
            const userData: AuthResponseType = await userService.registration(
                email,
                password,
                'HR',
            );

            res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    public async login(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Promise<AuthResponseType> | Promise<void>> {
        try {
            const { email, password } = req.body;
            const userData = await userService.login(email, password);

            res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    public async logout(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Promise<string> | Promise<void>> {
        try {
            const refreshToken = req.body.refreshToken;
            await userService.logout(refreshToken);
            res.json('Successfully logout');
        } catch (e) {
            next(e);
        }
    }

    public async refresh(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Promise<string> | Promise<void>> {
        try {
            const refreshToken = req.body.refreshToken;
            const token = await userService.refresh(refreshToken);
            res.json(token.newAccessToken);
        } catch (e) {
            next(e);
        }
    }

    public async addUserProfileInfo(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Promise<UserProfileInfo> | Promise<void>> {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(
                    ApiError.BadRequest('Validation error', errors.array()),
                );
            }

            const {
                name,
                surname,
                email,
                skype,
                ageExperience,
                department,
                summary,
            } = req.body;

            const userProfileData = await profileService.addUserProfileInfo(
                name,
                surname,
                email,
                skype,
                ageExperience,
                department,
                summary,
            );

            res.json(userProfileData);
        } catch (e) {
            next(e);
        }
    }

    public async getUserProfileInfo(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Promise<UserProfileInfo> | Promise<void>> {
        try {
            const id = req.user.id;
            const userProfileData = await profileService.getUserProfileInfo(id);

            res.json(userProfileData);
        } catch (e) {
            next(e);
        }
    }
}

const usersController = new UserController();

export default usersController;

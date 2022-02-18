import userService from '../services/userService';
import profileService from '../services/profileService';

import { validationResult } from 'express-validator';
import ApiError from '../errors/ApiError';
import AuthResponseType from '../types/AuthResponseType';
import UserProfileInfo from '../types/UserProfileInfo';

class UserController {
    public async registration(req, res, next): Promise<AuthResponseType> {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(
                    ApiError.BadRequest('Validation error', errors.array()),
                );
            }

            const { email, password, role } = req.body;
            const userData = await userService.registration(
                email,
                password,
                'HR',
            );

            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    public async login(req, res, next): Promise<AuthResponseType> {
        try {
            const { email, password } = req.body;
            const userData = await userService.login(email, password);

            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    public async logout(req, res, next): Promise<string> {
        try {
            const refreshToken = req.body.refreshToken;
            await userService.logout(refreshToken);
            return res.json('Successfully logout');
        } catch (e) {
            next(e);
        }
    }

    public async refresh(req, res, next): Promise<string> {
        try {
            const refreshToken = req.body.refreshToken;
            const token = await userService.refresh(refreshToken);
            return res.json(token.newAccessToken);
        } catch (e) {
            next(e);
        }
    }

    public async addUserProfileInfo(req, res, next): Promise<UserProfileInfo> {
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

            return res.json(userProfileData);
        } catch (e) {
            next(e);
        }
    }

    public async getUserProfileInfo(req, res, next): Promise<UserProfileInfo> {
        try {
            const id = req.user.id;
            const userProfileData = await profileService.getUserProfileInfo(id);

            return res.json(userProfileData);
        } catch (e) {
            next(e);
        }
    }
}

const usersController = new UserController();

export default usersController;

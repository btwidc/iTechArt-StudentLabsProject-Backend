import userService from '../services/userService';
import profileService from '../services/profileService';

import { validationResult } from 'express-validator';
import ApiError from '../errors/ApiError';
import AuthResponseType from '../types/AuthResponseType';
import UserProfileInfo from '../types/UserProfileInfo';
import { NextFunction, Request, Response } from 'express';
import RefreshResponse from '../types/RefreshResponse';
import CategoryInfo from '../types/CategoryInfo';
import categoriesService from '../services/categoriesService';

class UserController {
  public async registration(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<AuthResponseType | void> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Validation error', errors.array()));
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
  ): Promise<AuthResponseType | void> {
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
  ): Promise<string | void> {
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
  ): Promise<RefreshResponse | void> {
    try {
      const refreshToken = req.body.refreshToken;
      const refreshResponse = await userService.refresh(refreshToken);
      res.json(refreshResponse);
    } catch (e) {
      next(e);
    }
  }

  public async addUserProfileInfo(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<UserProfileInfo | void> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Validation error', errors.array()));
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
  ): Promise<UserProfileInfo | void> {
    try {
      const id = req.params.id;
      const userProfileData = await profileService.getUserProfileInfo(id);

      res.json(userProfileData);
    } catch (e) {
      next(e);
    }
  }

  public async getUsersProfilesList(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Array<UserProfileInfo> | void> {
    try {
      const profilesList = await profileService.getProfilesList();

      res.json(profilesList);
    } catch (e) {
      next(e);
    }
  }
}

const usersController = new UserController();

export default usersController;

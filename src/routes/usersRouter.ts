import { Router } from 'express';
import usersController from '../controllers/userController';

import { body } from 'express-validator';
import authorizationMiddleware from '../middleware/authorizationMiddleware';

const usersRouter = Router();

usersRouter.post(
    '/registration',
    body('email').isEmail(),
    body('password').isLength({ min: 6, max: 32 }),
    usersController.registration,
);
usersRouter.post('/login', usersController.login);
usersRouter.post('/logout', usersController.logout);
usersRouter.post('/refresh', usersController.refresh);

usersRouter.get(
    '/profile/:id',
    authorizationMiddleware,
    usersController.getUserProfileInfo,
);
usersRouter.post(
    '/profile',
    body('name').isString(),
    body('surname').isString(),
    body('email').isEmail(),
    body('ageExperience').isNumeric().isLength({ max: 2 }),
    body('department').isString(),
    body('summary').isString(),
    usersController.addUserProfileInfo,
);

export default usersRouter;

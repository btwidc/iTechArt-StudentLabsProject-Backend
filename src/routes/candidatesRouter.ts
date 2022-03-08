import { Router } from 'express';
import candidatesController from '../controllers/candidatesController';

import { body } from 'express-validator';
import authorizationMiddleware from '../middleware/authorizationMiddleware';

const candidatesRouter = Router();

candidatesRouter.get(
  '/info/:id',
  authorizationMiddleware,
  candidatesController.getCandidateInfo,
);
candidatesRouter.post(
  '/add',
  authorizationMiddleware,
  body('name').isString(),
  body('surname').isString(),
  body('email').isEmail(),
  body('skype').isString(),
  body('phone').isMobilePhone('be-BY'),
  body('education').isString(),
  body('technology').isString(),
  candidatesController.addCandidateInfo,
);

export default candidatesRouter;
import { Router } from 'express';
import categoriesController from '../controllers/categoriesController';

import { body } from 'express-validator';
import authorizationMiddleware from '../middleware/authorizationMiddleware';

const categoriesRouter = Router();

categoriesRouter.get(
  '/list',
  authorizationMiddleware,
  categoriesController.getCategoriesList,
);
categoriesRouter.post(
  '/add',
  authorizationMiddleware,
  body('name').isString(),
  categoriesController.addCategory,
);
categoriesRouter.delete(
  '/delete/:id',
  authorizationMiddleware,
  categoriesController.deleteCategory,
);

export default categoriesRouter;

import categoriesService from '../services/categoriesService';

import { validationResult } from 'express-validator';
import ApiError from '../errors/ApiError';

import { NextFunction, Request, Response } from 'express';
import CategoryResponse from '../types/CategoryResponse';

class CategoriesController {
  public async getCategoriesList(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Array<CategoryResponse> | void> {
    try {
      const categoriesList = await categoriesService.getCategoriesList();

      res.json(categoriesList);
    } catch (e) {
      next(e);
    }
  }

  public async addCategory(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<CategoryResponse | void> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Validation error', errors.array()));
      }

      const { name } = req.body;

      const category = await categoriesService.addCategory(name);

      res.json(category);
    } catch (e) {
      next(e);
    }
  }

  public async deleteCategory(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<number | void> {
    try {
      const categoryId = Number.parseInt(req.params.id);
      const deleteCategoryInfo = await categoriesService.deleteCategory(
        categoryId,
      );

      res.json(deleteCategoryInfo);
    } catch (e) {
      next(e);
    }
  }
}

const categoriesController = new CategoriesController();

export default categoriesController;

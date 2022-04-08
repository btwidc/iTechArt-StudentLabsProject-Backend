import Category from '../models/Category';
import CategoryDto from '../dtos/CategoryDto';

import ApiError from '../errors/ApiError';

class CategoriesService {
  public async getCategoriesList(): Promise<CategoryDto[]> {
    const categories = await Category.findAll();

    if (!categories) {
      throw ApiError.BadRequest(`Can't get categories list`);
    }

    return categories;
  }

  public async addCategory(name: string): Promise<CategoryDto> {
    const category = await Category.findOne({ where: { name } });

    if (category) {
      throw ApiError.BadRequest(`Category with name ${name} already exists`);
    }

    const newCategory = await Category.create({
      name,
    });

    return new CategoryDto(newCategory);
  }

  public async deleteCategory(id: number): Promise<number> {
    const deleteCategoryInfo = await Category.destroy({ where: { id } });
    if (!deleteCategoryInfo) {
      throw ApiError.BadRequest('Category does not exist');
    }

    return deleteCategoryInfo;
  }
}

export default new CategoriesService();

import { Category } from "../models/Category";
import { CategoriesRepository } from "../repositories/CategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}


class CreateCategoryService {
  constructor(private categoryRepository: CategoriesRepository) {}

  execute({ name, description }: IRequest): void {
    const categoryAlreadyExists = this.categoryRepository.findByName(name);
    if (categoryAlreadyExists) {
      throw new Error("Category already exists!");
    }

    this.categoryRepository.create({ name, description });
  }
}
export { CreateCategoryService };

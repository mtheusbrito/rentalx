import { Category } from "../../models/Category";
import { CategoriesRepository } from "../../repositories/CategoriesRepository";

class ListCategoriesUseCase {
  constructor(private categoriesRepository: CategoriesRepository) {}

  execute(): Category[] {
    return this.categoriesRepository.list();
  }
}
export { ListCategoriesUseCase };

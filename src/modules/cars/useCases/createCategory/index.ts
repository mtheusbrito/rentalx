import { CategoriesRepository } from "../../repositories/CategoriesRepository";
import { CreateCategoryControler } from "./CreateCategoryController";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

const categoryRepository = CategoriesRepository.getInstance();
const createCategoryUseCAse = new CreateCategoryUseCase(categoryRepository);

const createCategoryControler = new CreateCategoryControler(
  createCategoryUseCAse
);

export { createCategoryControler };

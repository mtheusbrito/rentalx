import { Request, Response, Router } from "express";

import { CategoriesRepository } from "../modules/cars/repositories/CategoriesRepository";
import { createCategoryControler } from "../modules/cars/useCases/createCategory";

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post("/", (request: Request, response: Response) => {
  return createCategoryControler.handle(request, response);
});

categoriesRoutes.get("/", (request: Request, response: Response) => {
  return response.status(200).json(categoriesRepository.list());
});
export { categoriesRoutes };

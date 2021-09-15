import { Request, Response, Router } from "express";
import multer from "multer";

import { createCategoryControler } from "../modules/cars/useCases/createCategory";
import { importCategoryController } from "../modules/cars/useCases/importCategory";
import { listCategoriesController } from "../modules/cars/useCases/listCategories";

const categoriesRoutes = Router();
const updload = multer({
  dest: "./tmp",
});

categoriesRoutes.post("/", (request: Request, response: Response) => {
  return createCategoryControler.handle(request, response);
});

categoriesRoutes.get("/", (request: Request, response: Response) => {
  return listCategoriesController.handle(request, response);
});

categoriesRoutes.post(
  "/import",
  updload.single("file"),
  (request: Request, response: Response) => {
    return importCategoryController.handle(request, response);
  }
);

export { categoriesRoutes };
